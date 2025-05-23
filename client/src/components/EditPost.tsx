import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';  // Keep for Cloudinary
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Post, LocalizedContent } from '../types';

interface FormData {
    title: LocalizedContent;
    content: LocalizedContent;
    author: string;
    tags: string;
}

interface CloudinaryResponse {
    secure_url: string;
    [key: string]: any;
}

const EditPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [formData, setFormData] = useState<FormData>({
        title: { en: '', fr: '', ja: '', eo: '', es: '' },
        content: { en: '', fr: '', ja: '', eo: '', es: '' },
        author: '',
        tags: '',
    });
    const [imageURL, setImageURL] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async (): Promise<void> => {
        try {
            if (!postId) return;
            const response = await api.get<Post>(`/api/posts/${postId}`);
            const { title, content, author, tags, imageURL } = response.data;
            setFormData({
                title: title || { en: '', fr: '', ja: '', eo: '', es: '' },
                content: content || { en: '', fr: '', ja: '', eo: '', es: '' },
                author: author || '',
                tags: tags?.join(', ') || '',
            });
            setImageURL(imageURL || '');
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    const handleChange = (value: string, lang: string | null, field: keyof FormData): void => {
        setFormData({
            ...formData,
            [field]: lang ? { ...formData[field as keyof Pick<FormData, 'title' | 'content'>], [lang]: value } : value
        });
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || '');

        try {
            const response = await axios.post<CloudinaryResponse>(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                uploadFormData
            );
            setImageURL(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!postId) return;

        const updatedPostData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()),
            imageURL,
        };

        try {
            await api.patch(`/api/updates/${postId}`, updatedPostData);
            alert('Post updated successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error("Error updating post:", error);
            alert('Error updating post');
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <h3>Edit Post</h3>

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
                {(['en', 'fr', 'ja', 'eo', 'es'] as const).map((lang) => (
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
                            rows={5}
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
                <button type="submit" className="btn btn-primary w-100">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
