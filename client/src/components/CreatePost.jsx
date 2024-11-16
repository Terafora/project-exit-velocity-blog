import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: { en: '', fr: '', ja: '', eo: '' },
        content: { en: '', fr: '', ja: '', eo: '' },
        author: '',
        tags: ''
    });
    const [imageURL, setImageURL] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (value, lang, field) => {
        setFormData({
            ...formData,
            [field]: lang ? { ...formData[field], [lang]: value } : value
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
            console.log("Image uploaded successfully:", response.data.secure_url); // Log success
        } catch (error) {
            console.error('Error uploading image:', error);
            setError("Image upload failed. Please check Cloudinary configuration.");
            console.log('Detailed Cloudinary error:', error.response?.data); // Detailed error log
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const postData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()),
            imageURL,
        };

        console.log("Post data being prepared for submission:", postData); // Log data structure

        const requiredLanguages = ['en', 'fr', 'ja', 'eo'];
        const missingFields = requiredLanguages.filter(lang => 
            !postData.title[lang] || !postData.content[lang]
        );

        if (missingFields.length > 0 || !postData.author) {
            alert('Please fill in all required fields for each language and provide an author name.');
            return;
        }

        try {
            await axios.post('/api/posts', postData, {
                headers: { Authorization: token }
            });
            alert('Post created successfully');
            setError(null); // Clear previous errors on success
        } catch (error) {
            console.error('Error creating post', error);
            setError("Error creating post. Please check your input and try again.");
            console.log("Post creation error details:", error.response?.data); // Log error details
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <h3>Create Post</h3>

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if present */}

                {/* Author Input */}
                <div className="mb-4">
                    <label>Author:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter author name"
                        value={formData.author}
                        onChange={(e) => handleChange(e.target.value, null, 'author')}
                    />
                </div>

                {/* Tags Input */}
                <div className="mb-4">
                    <label>Tags (comma-separated):</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., JavaScript, Web Development, React"
                        value={formData.tags}
                        onChange={(e) => handleChange(e.target.value, null, 'tags')}
                    />
                </div>

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
                            onChange={(e) => handleChange(e.target.value, lang, 'title')}
                        />

                        <h4>Content ({lang.toUpperCase()}):</h4>
                        <textarea
                            className="form-control"
                            placeholder={`Write HTML content for ${lang.toUpperCase()}`}
                            rows="5"
                            value={formData.content[lang]}
                            onChange={(e) => handleChange(e.target.value, lang, 'content')}
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
