import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Post } from '../types';

const Dashboard: React.FC = () => {
    const { i18n } = useTranslation();
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (): Promise<void> => {
        try {
            const response = await api.get<Post[]>('/api/posts');
            setPosts(response.data);
            console.log("Posts fetched:", response.data); // Debugging log
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleCreatePost = (): void => {
        navigate('/create');
    };

    const handleEditPost = (postId: string): void => {
        navigate(`/edit/${postId}`);
    };

    const handleDeletePost = async (postId: string): Promise<void> => {
        try {
            await api.delete(`/api/delete/${postId}`);
            fetchPosts(); // Refresh the list of posts after deletion
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const selectedLanguage = i18n.language || 'en';
    console.log("Current selected language:", selectedLanguage); // Debugging log

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleCreatePost}>Create New Post</button>
            <h2>All Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h3>{post.title[selectedLanguage] || post.title.en || "Untitled"}</h3>
                        <p>{post.content[selectedLanguage]?.substring(0, 150) || post.content.en?.substring(0, 150) || "No content available"}</p>
                        <button onClick={() => handleEditPost(post._id)}>Edit</button>
                        <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
