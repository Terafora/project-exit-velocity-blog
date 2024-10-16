import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar'; 
import './App.scss';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />  
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
