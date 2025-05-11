import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Post } from '../types';
import '../stylings/PostDetails.scss';

const PostDetails: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async (): Promise<void> => {
            try {
                if (!postId) return;
                const response = await api.get<Post>(`/api/posts/${postId}`);
                console.log("Fetched post details:", response.data); // Debugging log
                setPost(response.data);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Could not retrieve post data');
            }
        };
        fetchPost();
    }, [postId]);

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!post) return <div>Loading...</div>;

    const selectedLanguage = i18n.language || 'en';
    console.log("Current selected language in PostDetails:", selectedLanguage); // Debugging log

    return (
        <div className="container my-4">
            <button 
                onClick={() => navigate('/blog')}
                className="btn btn-outline-secondary mb-4"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                ← {t('back')}
            </button>
            <div className="post-details">
                <div className="post-border">
                {post.imageURL && (
                    <img src={post.imageURL} alt="Post" className="img-fluid" />
                )}
                <h1>{post.title[selectedLanguage] || post.title.en}</h1>
                {post.author && <p><strong>{t('author')}:</strong> {post.author}</p>}
                {post.date && <p><strong>{t('posted')}:</strong> {new Date(post.date).toLocaleDateString(selectedLanguage, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>}
                <hr></hr>
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: post.content[selectedLanguage] || post.content.en }}
                />
                {post.tags && post.tags.length > 0 && (
                    <p>
                        <strong>{t('tags')}:</strong> {post.tags.map((tag, index) => (
                            <span key={index} className="badge bg-secondary mx-1">{tag}</span>
                        ))}
                    </p>
                )}
                <hr className="my-4" />
                <div className="d-flex justify-content-between align-items-center">
                    {post.views !== undefined && (
                        <p className="mb-0">
                            👁️ {post.views} {t('views')}
                        </p>
                    )}
                    <div className="share-buttons">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary me-2"
                        >
                            {t('facebook-share')}
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary me-2"
                        >
                            {t('linkedin-share')}
                        </a>
                        <a
                            href={`mailto:?subject=${encodeURIComponent(post.title[selectedLanguage] || post.title.en)}&body=${encodeURIComponent(`Check out this blog post: ${window.location.href}`)}`}
                            className="btn btn-outline-primary"
                        >
                            {t('email-share')}
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
