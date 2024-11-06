import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: { en: '', fr: '', ja: '', eo: '' },
        content: { en: '', fr: '', ja: '', eo: '' }
    });

    const handleChange = (e, lang, field) => {
        setFormData({
            ...formData,
            [field]: { ...formData[field], [lang]: e.target.value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/posts', formData, {
                headers: { Authorization: token }
            });
            alert('Post created successfully');
        } catch (error) {
            console.error('Error creating post', error);
            alert('Error creating post');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Post</h3>
            {['en', 'fr', 'ja', 'eo'].map((lang) => (
                <div key={lang}>
                    <h4>Title ({lang.toUpperCase()}):</h4>
                    <input
                        type="text"
                        value={formData.title[lang]}
                        onChange={(e) => handleChange(e, lang, 'title')}
                    />
                    <h4>Content ({lang.toUpperCase()}):</h4>
                    <textarea
                        value={formData.content[lang]}
                        onChange={(e) => handleChange(e, lang, 'content')}
                    />
                </div>
            ))}
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
