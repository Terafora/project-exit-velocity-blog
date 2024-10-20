import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar'; 
import InfoBar from './components/InfoBar';
import './App.scss';
import './i18n';

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar changeLanguage={changeLanguage} /> 
        <div className="content-wrapper">
          <Routes>
            <Route path="/blog" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
        <InfoBar />
      </div>
    </Router>
  );
}

export default App;
