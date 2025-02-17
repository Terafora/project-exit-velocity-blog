import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import Home from './components/Home';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';
import InfoBar from './components/InfoBar';
import PostDetails from './components/PostDetails';
import Contact from './components/Contact';
import 'react-quill/dist/quill.snow.css';
import './App.scss';
import './i18n';

function App() {
  const { i18n } = useTranslation();
  const [infobarText, setInfobarText] = useState('Welcome to the site! Check out our latest blog posts and tutorials.');

  const token = localStorage.getItem('token');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const updateInfoBarText = (text) => {
    setInfobarText(text);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar changeLanguage={changeLanguage} updateInfoBarText={updateInfoBarText} />
        <MobileNavbar changeLanguage={changeLanguage} updateInfoBarText={updateInfoBarText} />
        <div className="content-wrapper">
          <Routes>
            {/* Home Route */}
  <         Route path="/" element={<Home />} />
  
            {/* Blog Routes */}
            <Route path="/blog" element={<PostList />} />
            <Route path="/blog/:postId" element={<PostDetails />} />

            {/* Other Routes */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/create" element={token ? <CreatePost /> : <Navigate to="/login" />} />
            <Route path="/edit/:postId" element={token ? <EditPost /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <InfoBar text={infobarText} />
      </div>
    </Router>
  );
}

export default App;
