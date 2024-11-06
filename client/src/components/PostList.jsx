import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const PostList = () => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const selectedLanguage = i18n.language; // Get current language

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
          <h2>{post.title[selectedLanguage] || post.title.en}</h2>
          <p>{post.content[selectedLanguage] || post.content.en}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
