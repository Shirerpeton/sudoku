import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SudokuToolCollection from 'sudokutoolcollection';
import Time from './Time.js'

const sudoku = SudokuToolCollection();

const ControlsContainer = styled.div`
    margin-left: 1rem;
    min-width: 12rem;
    width: 12rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    @media only screen and (max-width: 1024px) {
        margin-left: 0;
        margin-top: 1rem;
        width: 27rem;
    }
`

const NumPad = styled.div`
    width: 12rem;
    height: 12rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media only screen and (max-width: 1024px) {
        width: 27rem;
        height: 3rem;
    }
`

const Button = styled.button`
    text-align: center;
    text-align-last:center;
    appearance: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: color 0.5s ease, background-color  0.5s ease;
    color: ${props => props.theme.buttonColor};
    border: 2px solid ${props => props.theme.primeBorderColor};
    font-weight: bold;
    background-color: ${props => props.theme.buttonBackgroundColor};
    &:hover{
        background-color: ${props => props.theme.buttonHoverColor};
        transition: background-color 0.1s ease;
    }
`

const NumButton = styled(Button)`
    width: 4rem;
    height: 4rem;
    font-size: 1.5rem;
    font-weight: normal;
    @media only screen and (max-width: 1024px) {
        width: 3rem;
        height: 3rem;
    }
`

const WideButton = styled(Button)`
    width: 100%;
    height: 2.5rem;
    margin-top: 0.5rem;
    @media only screen and (max-width: 720px) {
        height: 3rem;
    }
`

const HalfButton = styled(Button)`
    width: 50%;
    height: 2.5rem;
    margin-top: 0.5rem;
    @media only screen and (max-width: 720px) {
        height: 3rem;
    }
`

const Container = styled.div`
    width: 100%;
`

const SelectDiv = styled.div`
    position: relative;
    &:after{
        transition: color 0.5s ease, background-color  0.5s ease;
        color: ${props => props.theme.buttonColor};
        content: '>';
        right: 0.5rem;
        top: 1.25rem;
        transform: rotate(90deg);
        font: monospace;
        position: absolute;
        cursor: pointer;
        pointer-events: none;
        font-family: "Consolas", monospace;
    }
`

const AccessLabel = styled.label`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`

export default function Controls(props) {
    const handleClick = (key) => {
        return (() => {
            if ((/^(?:[1-9]|)$/.test(key)) && (props.selectedCell[0] !== null) && (!props.grid[props.selectedCell[0]][props.selectedCell[1]].given))
                props.setGrid(prevGrid => ([...prevGrid.slice(0, props.selectedCell[0]), [...prevGrid[props.selectedCell[0]].slice(0, props.selectedCell[1]),
                { content: key, given: false },
                ...prevGrid[props.selectedCell[0]].slice(props.selectedCell[1] + 1)], ...prevGrid.slice(props.selectedCell[0] + 1)]));
        });
    }

    const handleKeypress = ({ key }) => {
        if (key === 'Delete') {
            (handleClick(''))();
            return;
        }
        (handleClick(key))();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeypress);
        return () => {
            window.removeEventListener('keydown', handleKeypress);
        };
    });

    const [difficulty, setDifficulty] = useState('easy');

    const stringToGrid = (str) => {
        return sudoku.conversions.stringToGrid(str).map(row => row.map(elem => elem === '.' ? { content: '', given: false } : { content: elem, given: true }));;
    };

    const gridToString = (grid) => {
        return sudoku.conversions.gridToString(grid.map(row => row.map(elem => elem.content === '' ? '.' : elem.content)));
    }

    const originalGridToString = (grid) => {
        return sudoku.conversions.gridToString(grid.map(row => row.map(elem => elem.given ? elem.content : '.')));
    }

    const [time, setTime] = useState(0);
    const [solved, setSolved] = useState(false);
    const solvedRef = useRef(solved);
    solvedRef.current = solved;

    const newGame = () => {
        const newGrid = stringToGrid(sudoku.generator.generate(difficulty));
        props.setGrid(newGrid);
        setTime(0);
        setSolved(false);
    }

    const check = () => {
        const strGrid = gridToString(props.grid);
        const solution = sudoku.solver.solve(strGrid);
        if (solution === strGrid) {
            props.setGrid(prevGrid => prevGrid.map(row => row.map(elem => ({ content: elem.content, given: true }))));
            setSolved(true);
        } else {
            const realSolution = stringToGrid(sudoku.solver.solve(originalGridToString(props.grid)));
            props.setGrid(prevGrid =>
                prevGrid.map((row, rowId) =>
                    row.map((elem, elemId) =>
                        ({ content: elem.content, given: elem.given, ...(((elem.content === '') || (elem.content == (realSolution[rowId][elemId].content))) ? null : { wrong: true }) })
                    )
                )
            );
        }
    }

    useEffect(() => {
        newGame();
        const interval = setInterval(() => { if (!solvedRef.current) setTime(prevTime => prevTime + 1); }, 1000);
        return (() => {
            clearInterval(interval);
        });
    }, []);

    const range = [...Array(9).keys()].map(n => n + 1);
    return (
        <ControlsContainer>
            <Container>
                <NumPad>
                    {range.map((elem, id) => <NumButton key={id} onClick={handleClick(elem)}>{elem}</NumButton>)}
                </NumPad>
                <HalfButton onClick={handleClick('')}>Erase</HalfButton>
                <HalfButton onClick={check}>Check</HalfButton>
            </Container>
            <Container>
                <Time time={time} />
            </Container>
            <Container>
                <WideButton onClick={newGame}>New game</WideButton>
                <SelectDiv>
                    <WideButton id='difficultySelector' as='select' name='difficulty' value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                        <option value='very-hard'>Very Hard</option>
                        <option value='insane'>Insane</option>
                        <option value='inhuman'>Inhuman</option>
                    </WideButton>
                    <AccessLabel htmlFor='difficultySelector'>Difficulty</AccessLabel>
                </SelectDiv>
            </Container>
        </ControlsContainer>
    );
}