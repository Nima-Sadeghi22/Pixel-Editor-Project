import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import Navbar from './components/Navbar';
import SignaturePad from './SignaturePad';
import PixelEditor from './pixelEditorScreen';
import Forum from './forum';
import SearchBar from './Searchbar';
//import Post from './post';
//import logo from './logo.svg';
import './App.css';
import './App.css'

function App() {
  const { token, removeToken, setToken } = useToken();
  const [openModal, setOpenModal] = useState(false);
  const [signature, setSignature] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        
        {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} />
        :(
          
          <>
            <Header token={removeToken}/>
            <Navbar>
            </Navbar>
            <Routes>
              <Route exact path="http://127.0.0.1:5000/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
              <Route exact path = "/profile" element = {<Profile></Profile>}></Route>
              <Route exact path = "/pixeleditor" element = {<PixelEditor x={22} y={22} gridWidth={22} gridHeight={22} pixelWidth={24} defaultColor="#FFFF00"
          selectedColor="#63C5DA"></PixelEditor>}></Route>
          <Route exact path = "/forum" element = {<Fragment><SearchBar></SearchBar><Forum></Forum></Fragment>}></Route>
          <Route exact path = "/forum" element = {<Forum></Forum>}></Route>
              
            </Routes>
          </>
        )}
      </div>
      
    </BrowserRouter>

  );
}

export default App;