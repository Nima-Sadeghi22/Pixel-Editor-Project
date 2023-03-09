import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './Searchbar';
import Forum from './forum';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/forum/post').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
      <Forum />
      </header>
    </div>
  );
}

export default App;
