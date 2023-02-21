import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SignaturePad from './SignaturePad';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [openModel, setOpenModal] = useState(false);
  const [imageUrl, setImageURL] = useState('https://camo.githubusercontent.com/f4e79a4215204104c0c1945e5cb02676fc6f42236321c20e186de3a66f4528b0/68747470733a2f2f6e6f6465692e636f2f6e706d2f72656163742d7369676e61747572652d63616e7661732e706e673f646f776e6c6f6164733d7472756526646f776e6c6f616452616e6b3d747275652673746172733d74727565');

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
