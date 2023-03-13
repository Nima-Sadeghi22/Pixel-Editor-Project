import React, { useState, useEffect } from 'react'
import axios from "axios";
import './Profile.css'

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
    <div>
      
        <p className='card' >Welcome {currentName}!</p>
  
        <p className='textstyle1' >Profile Name: {currentName}</p>
        <p className='textstyle2'>Bio: {currentAbout}</p>
        <p className='textstyle1'> Current Time: {currentTime}</p>
            
        
      
    </div>
  );
}

export default Profile;