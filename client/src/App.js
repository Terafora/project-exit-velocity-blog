import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Login from './components/Login';  
import Navbar from './components/Navbar'; 
import InfoBar from './components/InfoBar';
import './App.scss';
import './i18n';

function App() {
  const { i18n } = useTranslation();
  const [infobarText, setInfobarText] = useState('Welcome to the site! Check out our latest blog posts and tutorials.');

  const token = localStorage.getItem('token'); // Get token from local storage

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
        <div className="content-wrapper">
          <Routes>
            <Route path="/blog" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={token ? <CreatePost /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <InfoBar text={infobarText} />
      </div>
    </Router>
  );
}

export default App;
