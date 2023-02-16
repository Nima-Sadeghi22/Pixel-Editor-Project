import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
// import './App.css';
import Home from './homeScreen.js'
import PixelEditor from './pixelEditorScreen'
import Forum from './forumScreen'


function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [screenState, setScreenState] = useState(0);
  /*
    0 | Home
    1 | Pixel Editor
    2 | Forum
  */

    useEffect(() => {
      fetch('http://127.0.0.1:5000/').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
      });
    }, []);

  switch(screenState){
    case 1:
      return (
        <div className="App">
          <button onClick={() => setScreenState(0)}>Return to Home</button>
          <PixelEditor></PixelEditor>
        </div>
      );
      break;
    case 2:
      return (
        <div className="App">
          <button onClick={() => setScreenState(0)}>Return to Home</button>
          <Forum></Forum>
        </div>
      );
      break;
    default:
      return (
        <div className="App">
          <button onClick={() => setScreenState(1)}>Pixel Editor</button>
          <button onClick={() => setScreenState(2)}>Forum</button>
          <Home currentTime={currentTime}></Home>
        </div>
      );
      break;
  }
}
export default App;
