import styled from 'styled-components';

const TimeContainer = styled.div`
    @import url(//db.onlinewebfonts.com/c/055d8bd397b68d5d121796f56b904640?family=Digital);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-family: Digital, monospace;

`

export default function Time(props) {
    const displayTime = () => {
        const hours = Math.floor(props.time / 3600);
        const minutes = Math.floor((props.time - (hours*3600)) / 60);
        const seconds = props.time % 60;
        let hoursStr = '';
        if (hours > 1) {
            if (hours < 10)
                hoursStr += '0';
            hoursStr += hours;
        }
        let minutesStr = '';
        if (minutes < 10)
            minutesStr += '0';
        minutesStr += minutes;
        let secondsStr = '';
        if (seconds < 10)
            secondsStr += '0';
        secondsStr += seconds;
        return (hoursStr ? hoursStr + ':' : '') + minutesStr + ':' + secondsStr;
    }
    return (
        <TimeContainer>
            {displayTime()}
        </TimeContainer>
    );
}