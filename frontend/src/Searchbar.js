import React, { useState, useEffect } from 'react';
import './Searchbar.css';

function SearchBar() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('time');

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:5000/forum/post');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, [posts]);

  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (searchTerm === '') {
    return (
      <div className='search-bar'>
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input"/>
      </div>
    );
  }

  if (sortOption === 'title') {
    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filteredPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  return (
    <div className='search-bar'>
      <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input"/>
      <h2 className='searchtitle'>Search Results: </h2>
      <div>
        Sort by: 
        <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="time">Time</option>
          <option value="title">Title</option>
        </select>
      </div>
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
