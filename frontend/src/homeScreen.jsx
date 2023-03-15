import React from 'react';

export default function Home(props){
    return(
      <div>
       "Welcome to the Home page. The current time is "
      <p> {props.currentTime}.</p>
      </div>  
    );
}
