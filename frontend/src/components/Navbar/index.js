import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import "./Title.css"
import "./Navbar.css"
const Navbar = () => {
    
  return (
    <>
      <Nav className='PLEASE_WORK' >
        <Bars className='navbar'/>
  
        <NavMenu className='PLEASE_WORK'>
            <p className='animate-charcter'>Pixel Art Creator!</p>
            <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/profile' activeStyle>
            Profile
          </NavLink>
          <NavLink to='/pixeleditor' activeStyle>
            Pixel Art Creator
          </NavLink>
          <NavLink to='/forum' activeStyle>
            Forum
          </NavLink>
        
        </NavMenu>
       
      </Nav>
    </>
  );
};
  
export default Navbar;