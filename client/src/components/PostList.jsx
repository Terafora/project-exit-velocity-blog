import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => {
        console.log(error);
        setError('Failed to load posts.');
      });
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {error && <p>{error}</p>}
      {posts.length === 0 && <p>No posts available.</p>}
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
