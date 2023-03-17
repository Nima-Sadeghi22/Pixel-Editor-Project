import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import Navbar from './components/Navbar';
import PixelEditor from './pixelEditorScreen';
import Forum from './forum';
import SearchBar from './Searchbar';
//import Post from './post';
//import logo from './logo.svg';
import './App.css';
import './App.css'

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">

        {!token && token !== "" && token !== undefined ?
          <Login setToken={setToken} />
          : (

            <>
              <Header token={removeToken} />
              <Navbar>
              </Navbar>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="http://127.0.0.1:5000/profile" element={<Profile token={token} setToken={setToken} />}></Route>
                <Route exact path="/profile" element={<Profile></Profile>}></Route>
                <Route exact path="/pixeleditor" element={
                  <PixelEditor
                    x={22}
                    y={22}
                    gridwidth={22}
                    gridheight={22}
                    pixelwidth={24}
                    defaultcolor="#FFFF00"
                  />
                  }>
                </Route>
                <Route exact path="/forum" element={<Fragment><Forum></Forum></Fragment>}></Route>
                <Route exact path="/forum" element={<Forum></Forum>}></Route>

              </Routes>
            </>
          )}
      </div>

    </BrowserRouter>

  );
}

export default App;