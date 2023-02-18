import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SignaturePad from './SignaturePad';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [openModel, setOpenModal] = useState(false);

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
        <p><button onClick={() => setOpenModal(true)}>Create Signature</button></p>
      </header>

      {openModel && (
        <div className="modalContainer">
          <div className="modal">
            <SignaturePad />
            <div className="modal__bottom">
              <button onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
