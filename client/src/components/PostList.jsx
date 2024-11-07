import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PostList = () => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const selectedLanguage = i18n.language || 'en'; // Use 'en' as a default fallback

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => {
        console.error(error);
        setError('Failed to load posts.');
      });
  }, []);

  return (
    <div className="container my-4">
      <h1>Blog Posts</h1>
      {error && <p>{error}</p>}
      {posts.length === 0 && <p>No posts available.</p>}
      {posts.map(post => (
        <div key={post._id} className="mb-4">
          <Link to={`/blog/${post._id}`}>
            <h2>
              {/* Ensure title is available and access specific language */}
              {post.title && typeof post.title[selectedLanguage] === 'string' 
                ? post.title[selectedLanguage] 
                : post.title?.en || 'Untitled Post'}
            </h2>
          </Link>
          <p>
            {/* Ensure content is available and access specific language */}
            {post.content && typeof post.content[selectedLanguage] === 'string' 
              ? post.content[selectedLanguage].substring(0, 150) 
              : post.content?.en?.substring(0, 150) || 'No content available'}
            ...
          </p>
          <Link to={`/blog/${post._id}`} className="btn btn-secondary btn-sm">Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
