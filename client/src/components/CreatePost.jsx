import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: { en: '', fr: '', ja: '', eo: '' },
        content: { en: '', fr: '', ja: '', eo: '' },
    });
    const [imageURL, setImageURL] = useState('');

    const handleChange = (e, lang, field) => {
        setFormData({
            ...formData,
            [field]: { ...formData[field], [lang]: e.target.value }
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, 
                uploadFormData
            );
            setImageURL(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const postData = {
            ...formData,
            imageURL // Only one URL for the image, used across all translations
        };

        try {
            await axios.post('/api/posts', postData, {
                headers: { Authorization: token }
            });
            alert('Post created successfully');
        } catch (error) {
            console.error('Error creating post', error);
            alert('Error creating post');
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <h3>Create Post</h3>

                {/* Image Upload */}
                <div className="mb-4">
                    <label>Upload Image:</label>
                    <input type="file" onChange={handleImageUpload} className="form-control" />
                    {imageURL && <img src={imageURL} alt="Uploaded" style={{ width: '100%', marginTop: '10px' }} />}
                </div>

                {/* Title and Content Fields for Each Language */}
                {['en', 'fr', 'ja', 'eo'].map((lang) => (
                    <div key={lang} className="mb-4">
                        <h4>Title ({lang.toUpperCase()}):</h4>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Title in ${lang.toUpperCase()}`}
                            value={formData.title[lang]}
                            onChange={(e) => handleChange(e, lang, 'title')}
                        />

                        <h4>Content ({lang.toUpperCase()}):</h4>
                        <textarea
                            className="form-control"
                            placeholder={`Write HTML content for ${lang.toUpperCase()}`}
                            rows="5"
                            value={formData.content[lang]}
                            onChange={(e) => handleChange(e, lang, 'content')}
                        />

                        {/* Inline Preview for Each Language */}
                        <h5 className="mt-3">Preview ({lang.toUpperCase()}):</h5>
                        <div
                            className="border p-3"
                            style={{ backgroundColor: '#f8f9fa' }}
                            dangerouslySetInnerHTML={{ __html: formData.content[lang] }}
                        />
                    </div>
                ))}

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;