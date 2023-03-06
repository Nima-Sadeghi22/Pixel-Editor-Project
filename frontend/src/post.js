import React, { useState } from 'react';
//import Forum from './forum'

function SubmitPost({onNewPost}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch('http://localhost:5000/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
      })
        .then(response => {
          if (response.ok) {
            setTitle('')
            setBody('')
            // Call the onNewPost function with the new post
            return response.json();
          } else {
            throw new Error('Failed to submit post.');
          }
        })
        .then(data => {
          // Call the onNewPost function with the new post
      onNewPost(data.post);  
         })
         .catch(error => {
            console.error(error);
         });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
export default SubmitPost;