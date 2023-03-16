
import React from "react";
  
const Home = () => {
  return (
    <div>
      <h1>35L Project</h1>
      <h1>Team Name: Invictus</h1>
      <h1>Team Members: Nima Sadeghi, Christopher Lee, Afnan Kamran Khawaja, Brian Zhao, and Andrea Hayes</h1>
      <p>Our project will be a social media web application centered around pixel art creation. Users will create their own <br></br> 
        pixel art via a built-in interface, which will be saved on their profile. They may interact with each other through a forum where <br></br>
        they can upvote other art. Our motivation for this project came because there are a plethora of social media applications, but <br></br>
        none allow you to create your own art. By creating a drawing interface, it makes it easier for the user to share and interact with other users. 
      </p>
      <h3>Major Features</h3>
      <p>1. "Display dynamic data to the user. That is, some part of the webpage 
            changes based on data received from the server." <br></br>
            This requirement is met by the pixel editor itself. As a user creates their picture by changing
            the pixels it is updated in real time. The user has the option to change colors by pixel with the pencil, <br></br>
             change multiple pixels at a time with the bucket, select a color with the dropper and and change to white with the erase tool.
             
           </p>

      <p>2. "Upload data from the client to the back-end, which persists (saves) 
            the data to the server's file system."<br></br>
            We implemented this feature with the forum.  
            React will send data to Flask to store it in a database </p>

      <p>3. "Meaningfully search through server-side data." <br></br>
          The forum contains a search bar function of the forum.</p>

      <h3>Small Features</h3>
      <p>1. Token Authentication Login System (feature)<br></br>
            Words here about this.</p>
      <p>2. Watermark signature pad <br></br>
            After creating pixel art users are able to add a siganture. Once a user clicks the "Create 
            Signature" button a window appears for them to draw their signature in a choice of 8 colors.
            Once "Create" is clicked the siganture apperas in the bottom right hand corner of the art. </p>
      <p>3. Ability to like posts <br></br>
            More words here</p>

      <h1>Technology</h1>
      <p>We used react for the frontend and flask for the backend. </p>
      
    </div>
  );
};
  
export default Home;