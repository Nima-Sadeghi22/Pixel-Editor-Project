import React, { useState, useEffect } from 'react';
import Post from './post'
import Reply from './reply'
function Forum() {
    const [selectedTitle, setSelectedTitle] = useState('')
    const [selectedBody, setSelectedBody] = useState('')
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);
    useEffect(() => {
        // Fetch the list of posts from the backend
        fetch('http://localhost:5000/forum/post')
            .then(response => response.json())
            .then(data => {
                // const postsWithReplies = data.map(post => ({ ...post, 

                //     //replies: [1,2,'44,'],
                //     replies: [] }));

                // const postsWithReplies = data.map(post => {
                //     post.replies=[]
                //     return post

                // }

                //);
                setPosts(data);
                console.log('logging data here ', data)
                setPosts(data)

            });
    }, []);

    const handleEditPost = (postId, title, body) => {
        // console.log('id handle edit')
        setSelectedTitle(title)
        setSelectedBody(body)
        //Set the editingpostID state variable to the id of the post that is being edited
        setEditingPostId(postId);
    }
    const handleNewPost = (newPost) => {
        // Add the new post to the state
        newPost.replies=[]
        setPosts([...posts, newPost]);
    };

    const handleEditSubmit = (editPost) => {
        let postsCopy = []
        posts.map(post => {
            if (post.id == editPost.id) {
                post.title = editPost.title

                post.body = editPost.body
            }
            postsCopy.push(post)
        })
        setPosts(postsCopy)
        setEditingPostId(null)
        setSelectedTitle('')
        setSelectedBody('')
    }
    //add reply function

    const handleNewReply = (postId, newReply) => {
        // Find the post with the given ID
        const postIndex = posts.findIndex(post => post.id === postId);
       // console.log({postId, newReply, postIndex});
        //console.log("hello")

        if (postIndex !== -1) {
            // Add the new reply to the 'replies' array of the corresponding post
            const updatedPost = { ...posts[postIndex] };
            updatedPost.replies.push(newReply);
            const updatedPosts = [...posts];
            updatedPosts[postIndex] = updatedPost;
            setPosts(updatedPosts);
        }
    };
    // map funtion works on array only
    // 

    return (
        <div>
            <h2>Forum</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>Title: {post.title}</h3>
                        <p>Body:{post.body}</p>
                        <button onClick={() => handleEditPost(post.id, post.title, post.body)}>Edit</button>
                        <p>{(post.replies.length)}</p>
                        <ul>
                            
                            {post.replies.map(reply => (
                                <li key={reply.id}>{reply.body}</li>
                            ))}
                        </ul>
                       {/* <button onClick={() => handleEditPost(post.id, post.title, post.body)}>Edit</button> */}
                        <Reply postId={post.id} onNewReply={handleNewReply} />
                    </li>
                ))}
            </ul>
            <Post onNewPost={handleNewPost} editingPostId={editingPostId} titleProp={selectedTitle} bodyProp={selectedBody} handleEditSubmit={handleEditSubmit} />
        </div>
    );
}

export default Forum;


