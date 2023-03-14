import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './Searchbar';


function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
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
