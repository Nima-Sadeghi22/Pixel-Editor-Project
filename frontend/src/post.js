import React, { useState, useEffect } from 'react';
import Reply from './reply' 
//import Forum from './forum'

function SubmitPost({ onNewPost, handleEditSubmit, editingPostId, titleProp, bodyProp }) {
    const [title, setTitle] = useState(titleProp);
    const [body, setBody] = useState(bodyProp);
    //console.log('editing post id:', editingPostId, titleProp, bodyProp,title,body)
    useEffect(()=>{
        setTitle(titleProp)
        setBody(bodyProp)
    },[editingPostId])

    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingPostId !== null) {
           // console.log('editing post id:', editingPostId)
            // If editing a post, send a PUT request to the backend to update the post
            fetch(`http://localhost:5000/forum/post/${editingPostId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, body , id: editingPostId})
            })
                .then(response => {
                    if (response.ok) {
                        setTitle('')
                        setBody('')
                        // Call the onNewPost function with the updated post
                        return response.json();
                    } else {
                        throw new Error('Failed to edit post.');
                    }
                })
                .then(data => {
                    // Call the onNewPost function with the updated post
                    //onNewPost(data.post);
                    handleEditSubmit(data.post)
                })
                .catch(error => {
                    console.error(error);
                });
        }

        else {

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
        }
    };
    //console.log('title', title)
    //console.log('boyd', body)

    return (
        <form
            //
            onSubmit={handleSubmit}
        >
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={

                    title
                }
                    //
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <textarea id="body" value={body}
                    //
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}
export default SubmitPost;