import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { stripHtmlTags } from '../utils/textUtils';
import { Post } from '../types';
import '../stylings/PostList.scss';

const PostList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const selectedLanguage = i18n.language || 'en';

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const response = await api.get<Post[]>('/api/posts');
        console.log("API Response:", response); // Full response logging
        
        if (!response.data || !Array.isArray(response.data)) {
          console.error("Invalid data format:", response.data);
          throw new Error('Invalid data format received from server');
        }

        // Sort posts in reverse chronological order
        const sortedPosts = [...response.data].sort((a, b) => 
          new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
        );
        setPosts(sortedPosts);
        setError(null);
      } catch (error: any) {
        console.error("Error details:", error);
        setError(error.response?.data?.message || 'Failed to load posts.');
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="container my-4">
        <h1>{t('blog_posts')}</h1>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1>{t('blog_posts')}</h1>
      {error && <p className="alert alert-danger">{error}</p>}
      {!error && posts.length === 0 && <p>No posts available.</p>}
      {!error && Array.isArray(posts) && posts.map(post => (
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
