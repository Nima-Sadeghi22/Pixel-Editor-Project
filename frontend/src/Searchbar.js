import React, { useState, useEffect } from 'react';
import './Searchbar.css';

function SearchBar() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:5000/forum/post');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='search-bar'>
      <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input"/>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <h3>Title: {post.title}</h3>
            <p>Body:{post.body}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
