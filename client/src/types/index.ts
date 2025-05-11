// Common interfaces for the application

export interface LocalizedContent {
    [key: string]: string;
}

export interface Post {
    _id: string;
    title: LocalizedContent;
    content: LocalizedContent;
    createdAt?: string;
    updatedAt?: string;
    date?: string;
    imageURL?: string;
    author?: string;
    tags?: string[];
    views?: number;
}

export interface User {
    _id: string;
    username: string;
    email?: string;
    role?: string;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    message?: string;
    user?: User;
}

export interface ApiError {
    message: string;
    status?: number;
    errors?: any;
}
