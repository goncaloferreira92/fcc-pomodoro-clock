import React from 'react';
import moment from 'moment';

const Session = ({ sessionLength, incrementSessionLengthByOneMinute, decrementSessionLengthByOneMinute }) => {

    const sessionLengthInMinutes = moment.duration(sessionLength, 's').minutes()

    return (
        <div id="session-label">
          <h1>Session</h1>
          <button id="session-increment" onClick={incrementSessionLengthByOneMinute}>+</button>
          <p id="session-length">{sessionLengthInMinutes}</p>
          <button id="session-decrement" onClick={decrementSessionLengthByOneMinute}>-</button>
        </div>
    )
}

export default Session
