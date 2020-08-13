import Head from 'next/head'
import { useState } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import SudokuGrid from '../components/SudokuGrid.js'
import ToggleMode from '../components/ToggleMode.js'
import Controls from '../components/Controls.js'

const pxToVw = (size, width = 1024) => `${(size / width) * 100}vw`;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  
  @media only screen and (max-width: 320px) {
    html {
      font-size: 10px;
    }
  }

  @media only screen and (min-width: 320px) {
    html {
      font-size: ${pxToVw(12, 520)};
    }
  }

  @media only screen and (min-width: 720px) {
    html {
      font-size: ${pxToVw(16, 872)};
    }
  }

  @media only screen and (min-width: 1024px) {
    html {
      font-size: ${pxToVw(10)};
    }
  }

  @media only screen and (min-width: 2160px) {
    html {
      font-size: ${pxToVw(9)};
    }
  }
`

const Container = styled.div`
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.5s ease, background-color 0.5s ease;
  ${props => (props.lightMode ?
    `background-color: #fafafa;
    color: #101010;`
    :
    `background-color: #171717;
    color: silver;`)};
`

const TopBar = styled.div`
  height: 5rem;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: end;
`

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`

const Main = styled.main`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SudokuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  width: 100%;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`

const Title = styled.h1`
    font-size: 3rem;
    margin: 0;
    margin-bottom: 4rem;
    font-family: 'Lemon', cursive;
`

const lightTheme = {
  primaryBorderColor: 'grey',
  secondaryBorderColor: 'lightgrey',
  cellColor: '#fcfcf9',
  selectedCellColor: '#ddd',
  givenDigitColor: 'black',
  digitColor: '#36d',
  wrongDigitColor: '#d44',
  togglePrimaryColor: '#eee',
  toggleSecondaryColor: '#ccc',
  buttonColor: 'black',
  buttonBackgroundColor: '#eee',
  buttonHoverColor: '#ddd'
}

const darkTheme = {
  primaryBorderColor: '#f5f5f5',
  secondaryBorderColor: 'grey',
  cellColor: '#444',
  selectedCellColor: '#333',
  givenDigitColor: 'white',
  digitColor: '#58f',
  wrongDigitColor: '#d44',
  togglePrimaryColor: '#ccc',
  toggleSecondaryColor: '#eee',
  buttonColor: '#fafafa',
  buttonBackgroundColor: '#555',
  buttonHoverColor: '#777'
}

export default function Sudoku() {

  const [lightMode, setLightMode] = useState(true);

  const defaultCell = { content: '', given: false };
  const defaultRow = Array(9).fill(defaultCell);
  const defaultGrid = Array(9).fill(defaultRow);
  const [grid, setGrid] = useState(defaultGrid);

  const [selectedCell, setSelectedCell] = useState([null, null]);

  return (
    <Container lightMode={lightMode}>
      <Head>
        <title>Sudoku</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Lemon&display=swap" rel="stylesheet" />
        <link href="//db.onlinewebfonts.com/c/055d8bd397b68d5d121796f56b904640?family=Digital" rel="stylesheet" type="text/css" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={lightMode? lightTheme : darkTheme}>
        <TopBar>
          <ToggleContainer>
            <ToggleMode lightMode={lightMode} setLightMode={setLightMode} />
          </ToggleContainer>
        </TopBar>
        <Main>
          <Title>Sudoku</Title>
          <SudokuContainer>
            <SudokuGrid grid={grid} setGrid={setGrid} selectedCell={selectedCell} setSelectedCell={setSelectedCell} />
            <Controls grid={grid} setGrid={setGrid} selectedCell={selectedCell} />
          </SudokuContainer>
        </Main>
      </ThemeProvider >
    </Container>
  )
}
