import React, { useState, useEffect } from 'react';
import Post from './post'
function Forum() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the list of posts from the backend
    fetch('http://localhost:5000/forum/post')
      .then(response => response.json())
      .then(data => {
        console.log('logging data here ',data)
        setPosts(data)

    });
  }, []);

  const handleNewPost = (newPost) => {
    // Add the new post to the state
    setPosts([...posts, newPost]);
  };
  return (
    <div>
      <h2>Forum</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>Title: {post.title}</h3>
            <p>Body:{post.body}</p>
            {/* <p>id: {post.id} tillhere</p> */}
          </li>
        ))}
      </ul>
      <Post onNewPost={handleNewPost} />
    </div>
  );
}

export default Forum;