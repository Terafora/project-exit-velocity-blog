import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
    const { postId } = useParams();
    const [formData, setFormData] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`/api/posts/${postId}`);
            setFormData({ title: response.data.title, content: response.data.content });
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`/api/update/${postId}`, formData, {
                headers: { Authorization: token }
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
                <label>Content:</label>
                <textarea name="content" value={formData.content} onChange={handleChange} />
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
