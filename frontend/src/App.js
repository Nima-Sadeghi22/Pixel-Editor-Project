import React, { useState, useEffect } from 'react';
import Forum from './forum';
//import Post from './post';
//import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    //fetch('http://localhost:5000/forum/post').then(res => res.json()).then(data => {
      fetch('/forum/post').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
       <Forum />
        </header>
    </div>
  );
}

export default App;
