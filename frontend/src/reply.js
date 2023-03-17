import React, { useState } from 'react';

function Reply({ postId, onNewReply }) {
  const [body, setBody] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('this is post Id', postId)
    fetch(`http://localhost:5000/forum/posts/${postId}/replies`, {
    
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body })
    })
    .then(response => response.json())
    .then(data => {
        console.log({data})
        onNewReply(postId, data.reply);
        setBody('');
        // if (response.ok) {
        //     setBody('');
        //     return response.json();
        //   } else {
        //     throw new Error('Failed to submit reply.');
        //   }
    })
    .catch(error => {
      // handle any errors
      console.log(error)
    });
};

return (
  <div>
    {showReplyBox ? (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="body"></label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit" >Submit</button>
      </form>
    ) : (
      <button onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>
    )}
    {showReplyBox && (
      <button onClick={() => setShowReplyBox(!showReplyBox)}>Back</button>
    )}
  </div>
);
}

export default Reply;