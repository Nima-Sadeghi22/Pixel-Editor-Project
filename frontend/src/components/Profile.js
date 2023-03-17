import React, { useState, useEffect } from 'react'
import Card from 'bootstrap'
import axios from "axios";
import './Profile.css'
import Image from "./avatar.png";

function Profile(props) {

  const [profileData, setProfileData] = useState(null)
  function getData() {
    axios({
      method: "GET",
      url:"/profile",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      const res =response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    const [currentTime, setCurrentTime] = useState(0);
    const [currentName, setCurrentName] = useState(0);
    const [currentAbout, setCurrentAbout] = useState(0);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/profile').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
        setCurrentName(data.name)
        setCurrentAbout(data.about)

      });
    }, []);
  

  return (
    
    <div className='card'>
      <div>
        
        <img className="card-img-top" src={Image} alt="Card image cap"></img>
        <h1>Name: {currentName}</h1>
        <p>Bio: {currentAbout}</p>
        
        </div>   
      
    </div>
    
    
  );
}

export default Profile;