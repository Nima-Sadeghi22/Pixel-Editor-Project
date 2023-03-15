
import React from "react";
  
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>I am a really cool rough draft homepage that will be updated later. </p>
      <p>1. "Display dynamic data to the user. That is, some part of the webpage changes based on data received from the server."

This is pretty self explanatory, Christopher just demonstrated this for us in the gif he posted, the pixel editor itself satisfies this.

2. Upload data from the client to the back-end, which persists (saves) the data to the server’s file system. This data can be as simple as strings or numbers that you save to a text file, or files that the user uploads such as images.

This is being done through the forum. Also pretty self explanatory, React will send data to Flask to store it in a database 

3. "Meaningfully search through server-side data."

This is the search bar function of the forum, more specifically, the spec states that there must be a way that a user must enter a search term. We could also maybe find a way to sort? though that is pretty low priority.


Small Features:
 1. Token Authentication Login System (feature)
2. Andrea made a watermark signature pad
3. We are adding the ability to like posts 
      </p>
    </div>
  );
};
  
export default Home;