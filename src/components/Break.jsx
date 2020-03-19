import React from 'react';
import moment from 'moment';

const Break = ({ breakLength, incrementBreakLengthByOneMinute, decrementBreakLengthByOneMinute }) => {

    const breakLengthInMinutes = moment.duration(breakLength, 's').minutes();

    return (
        <div id="break-label">
          <h1>Break</h1>
          <button id="break-increment" onClick={incrementBreakLengthByOneMinute}>+</button>
          <p id="break-length">{breakLengthInMinutes}</p>
          <button id="break-decrement" onClick={decrementBreakLengthByOneMinute}>-</button>
        </div>
    )
}

export default Break
