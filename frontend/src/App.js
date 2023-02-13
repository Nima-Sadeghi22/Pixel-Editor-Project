import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

       If the backend is working, there should be a bunch of numbers here (not 0):

        <p> {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;
