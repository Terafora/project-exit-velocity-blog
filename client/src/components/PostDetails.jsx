import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PostDetails = () => {
    const { postId } = useParams();
    const { i18n } = useTranslation(); 
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}`);
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

    return (
        <div className="container my-4">
            <div className="post-details">
                {/* Image */}
                {post.imageURL && (
                    <img src={post.imageURL} alt="Post" className="img-fluid mb-4" style={{ maxWidth: '100%' }} />
                )}

                {/* Title */}
                <h1>{post.title[selectedLanguage] || post.title.en}</h1>

                {/* Author */}
                <p><strong>Author:</strong> {post.author}</p>

                {/* Content */}
                <div
                    className="post-content border p-3"
                    style={{ backgroundColor: '#f8f9fa' }}
                    dangerouslySetInnerHTML={{ __html: post.content[selectedLanguage] || post.content.en }}
                />

                {/* Tags */}
                <p>
                    <strong>Tags:</strong> {post.tags.map((tag, index) => (
                        <span key={index} className="badge bg-secondary mx-1">{tag}</span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default PostDetails;