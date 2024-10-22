// client/src/components/CreatePost.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/posts', formData, {
        headers: {
          Authorization: token
        }
      });
      alert('Post created successfully');
    } catch (error) {
      console.error('Error creating post', error);
      alert('Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" onChange={handleChange} />
      </div>
      <div>
        <label>Content:</label>
        <textarea name="content" onChange={handleChange} />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" onChange={handleChange} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
