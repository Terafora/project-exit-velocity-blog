import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PostDetails = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation(); 
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}`);
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

    const selectedLanguage = i18n.language;
    console.log("Current selected language in PostDetails:", selectedLanguage); // Debugging log

    return (
        <div className="container my-4">
            <button 
                onClick={() => navigate('/blog')}
                className="btn btn-outline-secondary mb-4"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                ← Back to Blog
            </button>
            <div className="post-details">
                {post.imageURL && (
                    <img src={post.imageURL} alt="Post" className="img-fluid mb-4" style={{ maxWidth: '100%' }} />
                )}
                <h1>{post.title[selectedLanguage] || post.title.en}</h1>
                <p><strong>Author:</strong> {post.author}</p>
                <p><strong>Posted:</strong> {new Date(post.date).toLocaleDateString(selectedLanguage, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
                <div
                    className="post-content border p-3"
                    style={{ backgroundColor: '#f8f9fa' }}
                    dangerouslySetInnerHTML={{ __html: post.content[selectedLanguage] || post.content.en }}
                />
                <p>
                    <strong>Tags:</strong> {post.tags.map((tag, index) => (
                        <span key={index} className="badge bg-secondary mx-1">{tag}</span>
                    ))}
                </p>
                <hr className="my-4" />
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">
                        👁️ {post.views} views
                    </p>
                    <div className="share-buttons">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary me-2"
                        >
                            Share on Facebook
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary me-2"
                        >
                            Share on LinkedIn
                        </a>
                        <a
                            href={`mailto:?subject=${encodeURIComponent(post.title[selectedLanguage] || post.title.en)}&body=${encodeURIComponent(`Check out this blog post: ${window.location.href}`)}`}
                            className="btn btn-outline-primary"
                        >
                            Share via Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
