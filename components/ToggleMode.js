
import styled from 'styled-components'

const Container = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direvction: row;
    align-items: center;
`

const Toggle = styled.input`
    appearance: none;
    outline: none;
    position: relative;
    width: 4rem;
    height: 2rem;
    background-color: ${props => props.theme.togglePrimaryColor};
    border-radius: 1rem;
    margin: 1rem;
    cursor: pointer;
    transition: all 0.5s ease;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 2rem;
        width: 2rem;
        background-color: ${props => props.theme.toggleSecondaryColor};
        border-radius: 1rem;
        transition: all 0.5s ease;
    }
    &:checked:before {
        transform: translate(100%);
    }
`

export default function ToggleMode(props) {

    return(
        <Container>
            <label htmlFor='toggleMode'><b>{props.lightMode? 'Light Mode' : 'Dark Mode'}</b></label>
            <Toggle id='toggleMode' type='checkBox' value={props.mode} onChange={() => {props.setLightMode(prevMode => !prevMode)}} />
        </Container>
    );
}