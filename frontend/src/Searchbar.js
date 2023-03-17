import React, { useState, useEffect } from 'react';
import './Searchbar.css';
import Forum from './forum';
import votes from './forum'

function SearchBar({posts}) {
 
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('time');

  // useEffect(() => {
  //   async function fetchPosts() {
  //     const response = await fetch('http://localhost:5000/forum/post');
  //     const data = await response.json();
  //     setPosts(data);
  //   }
  //   fetchPosts();
  // }, []);

  useEffect(()=>{

    if(searchTerm){
      setFilteredPosts(
        posts?.filter(post => {
          return post.title.toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    }

  }, [searchTerm])

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
      <div className='sort-tab'>
        Sort by: 
        <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="time">Time</option>
          <option value="title">Title</option>
        </select>
      </div>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id} className='post-block'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="likes-count">{votes[post.id]} </p>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
