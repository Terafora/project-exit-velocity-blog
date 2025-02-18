import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { stripHtmlTags } from '../utils/textUtils';
import '../stylings/PostList.scss';

const PostList = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const selectedLanguage = i18n.language || 'en'; // Use 'en' as a default fallback

  useEffect(() => {
    api.get('/api/posts')
      .then(response => {
        console.log("Fetched posts:", response.data); // Debugging log
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load posts.');
      });
  }, []);

  return (
    <div className="container my-4">
      <h1>{t('blog_posts')}</h1>
      {error && <p>{error}</p>}
      {posts.length === 0 && <p>No posts available.</p>}
      {posts.map(post => (
        <div key={post._id} className="card mb-4">
          {post.imageURL && (
            <img 
              src={post.imageURL} 
              alt={post.title[selectedLanguage] || post.title.en} 
              className="card-img-top"
              style={{ 
                height: '200px', 
                objectFit: 'cover',
                objectPosition: 'center'
              }} 
            />
          )}
          <div className="arrow">
            <div className="card-body">
              <Link to={`/blog/${post._id}`} className="text-decoration-none">
                <h2 className="card-title">
                  {post.title && typeof post.title[selectedLanguage] === 'string' 
                    ? post.title[selectedLanguage] 
                    : post.title?.en || 'Untitled Post'}
                </h2>
              </Link>
            </div>
          </div>
          <div className="preview-content">
            <p className="card-text">
              {post.content && typeof post.content[selectedLanguage] === 'string' 
                ? stripHtmlTags(post.content[selectedLanguage]).substring(0, 150) 
                : stripHtmlTags(post.content?.en)?.substring(0, 150) || 'No content available'}
              ...
            </p>
            <Link 
              to={`/blog/${post._id}`} 
              className="btn btn-secondary btn-sm"
            >
              {t('read_more')}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
