import styled from 'styled-components';

const Grid = styled.table`
  width: 27rem;
  height: 27rem;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border: 2px solid ${props => props.theme.primaryBorderColor};
  background-color: ${props => props.theme.cellColor};
  transition: color 0.5s ease, background-color  0.5s ease;
`

const Row = styled.tr`
  margin: 0;
  padding: 0;
  border-top: ${props => (props.borderTop) ?
    '2px solid ' + props.theme.primaryBorderColor
    :
    'none'};
  transition: color 0.5s ease, background-color  0.5s ease;
`

const Cell = styled.td`
  margin: 0;
  padding: 0;
  border: 1px solid ${props => props.theme.secondaryBorderColor};
  min-width: 3rem;
  min-height: 3rem;
  width: 3rem;
  height: 3rem;
  text-align: center;
  transition: color 0.5s ease, background-color 0.5s ease;
  font-size: 2rem;
  cursor: pointer;
  ${props => {
    let css = '';
    if (props.borderLeft)
      css += 'border-left: 2px solid ' + props.theme.primaryBorderColor + ';';
    if (props.selected)
      css += 'background-color: ' + props.theme.selectedCellColor + ';';
    if (props.given)
      css += 'color: ' + props.theme.givenDigitColor + ';';
    else 
      css += 'color: ' + props.theme.digitColor + ';';
    if (props.wrong)
      css += 'color: ' + props.theme.wrongDigitColor + ';';
    return css;
  }};
  &:hover{
    background-color: ${props => props.theme.selectedCellColor};
    transition: background-color 0.1s ease;
  }
`

export default function SudokuGrid(props) {
  return (
    <Grid>
      <tbody>
        {props.grid.map((row, rowId) =>
          (<Row key={rowId} borderTop={rowId === 3 || rowId === 6}>
            {row.map((cell, cellId) =>
              (<Cell key={cellId}
                borderLeft={cellId === 3 || cellId === 6}
                onClick={() => props.setSelectedCell([rowId, cellId])}
                selected={((rowId === props.selectedCell[0]) && (cellId === props.selectedCell[1]))}
                given={cell.given}
                wrong={cell.wrong}>
                {cell.content}
              </Cell>)
            )}</Row>)
        )}
      </tbody>
    </Grid>
  );
}