
import React from "react";
  
const Home = () => {
  return (
    <div className="home-content">
      <h1>35L Project</h1>
      <h1>Team Name: Invictus</h1>
      <h1>Team Members: Nima Sadeghi, Christopher Lee, Afnan Kamran Khawaja, Brian Zhao, and Andrea Hayes</h1>
      <h1>Technology</h1>
      <h3>Frontend: React.js & Node.js</h3>
      <h3>Backend: Flask</h3>
      <p>Our project is a social media web application centered around pixel art creation. Users will create their own  
        pixel art via a built-in interface, which will be saved on their profile. They may interact with each other through a forum where 
        they can upvote other art. Our motivation for this project came because there are a plethora of social media applications, but 
        none allow you to create your own art. By creating a drawing interface, it makes it easier for the user to share and interact with other users. 
      </p>
      
      
      <h3>Major Features</h3>
      <p>1. "Display dynamic data to the user. That is, some part of the webpage 
            changes based on data received from the server." <br></br>
            This requirement is met by the pixel editor itself. As a user creates their picture by changing 
            the pixels it is updated in real time. The user has the option to change colors by pixel with the pencil, 
             change multiple pixels at a time with the bucket, select a color with the dropper and and change to white with the erase tool. 
             Finally, the user has the option to download their creation with a watermark of their signature. 
           </p>

      <p>2. "Upload data from the client to the back-end, which persists (saves) 
            the data to the server's file system."<br></br>
            The forum meets our requirement to upload data from the client to the back-end, which persists (saves) 
            the data to the server's file system. The forum uses REST API methodology, namely the POST, GET, PUT, DELETE methods 
            to interact with the frontend, and saves data into an in-program database using a dictionary that is updated 
            in real time. The user has the ability to create a post to the forum, reply, delete, and edit. Every single 
            interaction is saved to the database, and even if the user refreshes the changes in the webpage, their data is saved. 
            
</p>

      <p>3. "Meaningfully search through server-side data." <br></br>
      The search bar meets our requirement to perform meaningful search through server-side data. The search takes a query 
      from the user, traverses through the backend database, matches the string and returns the results to the user in the 
      frontend. The user has the ability to search through posts made previously and return them in various ways. The user 
      also has the ability to perform different types of searches, sorting by time or alphabetical order the posts were made in.
</p>

      <h3>Small Features</h3>
      <p>1. Token Authentication Login System (feature)<br></br>
      User session (or semi-profile) which is authenticated by a jwt token from the backend. Think about how the duo app 
      works for myUCLA accounts. Anyone who is not authenticated from the backend database (which for tokens is encrypted) 
      will not be able to see the art or login to the profile. 

</p>
      <p>2. Watermark signature pad <br></br>
            After creating pixel art users are able to add a siganture. Once a user clicks the "Create Signature" button 
            a window appears for them to draw their signature in a choice of 8 colors. Once "Create" is clicked the siganture 
            apperas in the bottom right hand corner of the art. The goal of this feature was to protect users from their art being stolen. 
 </p>
      <p>3. Ability to like posts <br></br>
      We added the functionality to like a post that's created. The like gets stored in the database and associated with the 
      users token. In the future, if we had more time to add a registration page, we could make it so that the amount of likes 
      received would appear on the profile of the user.
</p>

      
      
    </div>
  );
};
  
export default Home;