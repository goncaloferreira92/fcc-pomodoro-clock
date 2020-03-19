import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const TimeLeft = ({ startStopButtonLabel, timerLabel, timeLeft, handleStartStopClick }) => {

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });

    return (
    <div>
        <div id="timer-label">{ timerLabel }</div>
        <div id="time-left">
            { formattedTimeLeft }
        </div>
        <div>
            <button id="start_stop" onClick={handleStartStopClick}> {startStopButtonLabel} </button>
        </div>
    </div>
    )
};

export default TimeLeft
