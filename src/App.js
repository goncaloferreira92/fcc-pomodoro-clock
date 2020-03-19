import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import Break from './components/Break.jsx';
import Session from './components/Session.jsx';
import TimeLeft from './components/TimeLeft.jsx';


function App() {
  const audioElement = useRef(null);
  const [breakLength, setBreakLength] = useState(3300); // 300
  const [sessionLength, setSessionLength] = useState(1500);
  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  useEffect(() => {
      setTimeLeft(sessionLength)
  }, [sessionLength]);
    
  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (sessionLength >= 7200) {
        setSessionLength(7200)
    } else {
        setSessionLength(newSessionLength)
    };
};

  const decrementSessionLengthByOneMinute = () => {
      const newSessionLength = sessionLength - 60;
      if (sessionLength <= 60) {
          setSessionLength(60)
      } else {
          setSessionLength(newSessionLength)
      };
  };

  
    
  const incrementBreakLengthByOneMinute = () => {
      const newBreakLength = breakLength + 60

      if (breakLength >= 3600) {
          return setBreakLength(breakLength);
      } else {
          setBreakLength(newBreakLength)
      };
  };

  const decrementBreakLengthByOneMinute = () => {
      const newBreakLength = breakLength - 60;
      if (breakLength <= 60) {
          setBreakLength(60)
      } else {
          setBreakLength(newBreakLength)
      };
  };

  const isStarted = intervalId !== null;
    const handleStartStopClick = () => {
        if (isStarted) {
            clearInterval(intervalId)
            setIntervalId(null);
        } else {
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft - 1;
    
                    if (newTimeLeft >= 0) {
                        return prevTimeLeft - 1;
                    } 

                    audioElement.current.play();
                    if (currentSessionType === "Session") {
                        setCurrentSessionType("Break");
                        setTimeLeft(breakLength);
                    } else if (currentSessionType === "Break") {
                        setCurrentSessionType("Session");
                        setTimeLeft(sessionLength);
                    };
                                      
                });
            }, 10);
            setIntervalId(newIntervalId);   
        };
    };


  const handleResetButtonClick = () => {
    // clear the timeout interval
    clearInterval(intervalId);
    // set the intervalid null
    setIntervalId(null);
    // set the sessiontype to session
    setCurrentSessionType('Session');
    // reset the session length to 25 minutes
    setSessionLength(25 * 60)
    // reset the break length to 5 minutes
    setBreakLength(5 * 60)
    // reset the timer to 25 minutes
    setTimeLeft(25 * 60)

    audioElement.current.load();
  }


  return (
    <div className="App">

      <div className="top-container">
        <Break
          id="break-length"
          breakLength={breakLength}
          incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
          decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute} />
        <Session
          id="session-length"
          sessionLength={sessionLength}
          incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
          decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
        />
      </div>
      <div id="bottom-container">
        <TimeLeft
        sessionLength={sessionLength}
        breakLength={breakLength}
        timerLabel={currentSessionType}
        timeLeft={timeLeft}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted ? 'stop' : 'start'} />
        <button id="reset" onClick={handleResetButtonClick}>Reset</button>
      </div>
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"></source>
      </audio>


    </div>
  )
}

export default App;
