import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './Searchbar';

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
      <SearchBar />
      </header>
    </div>
  );
}

export default App;
