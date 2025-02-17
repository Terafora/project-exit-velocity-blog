import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../stylings/MobileNavbar.scss';

const MobileNavbar = ({ changeLanguage, updateInfoBarText }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    // Define colors for each route
    const routeColors = {
        '/': '#20B2AA', // Home page color
        '/about': '#FFD700', // About page color
        '/blog': '#C71585', // Blog page color
        '/contact': '#1e90ff', // Contact page color
    };

    // Define i18n translation keys for each route
    const routeTextKeys = {
        '/': 'infobar.home',
        '/about': 'infobar.about',
        '/blog': 'infobar.blog',
        '/contact': 'infobar.contact',
    };

    const isBlogArticle = location.pathname.startsWith('/blog/') && location.pathname.length > 6;
    const navbarColor = isBlogArticle ? '#C71585' : (routeColors[location.pathname] || '#20B2AA');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="mobile-navbar-wrapper">
            {/* Static header container */}
            <div className="mobile-header-container" style={{ backgroundColor: navbarColor }}>
                <div className="mobile-navbar-header">
                    <span className="blog-title">Project Exit Velocity</span>
                    <button 
                        className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Decorative animated elements */}
            <div className="mobile-navbar-shadow"></div>
            <div className="mobile-navbar-shadow mobile-navbar-shadow-two"></div>
            <div className="mobile-navbar" style={{ backgroundColor: navbarColor }}></div>
            <div className="mobile-navbar mobile-navbar-two" style={{ backgroundColor: navbarColor }}></div>

            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} style={{ backgroundColor: navbarColor }}>
                <ul className="mobile-navbar-list">
                    <li className="mobile-navbar-item">
                        <Link to="/" onClick={closeMenu}>{t('home')}</Link>
                    </li>
                    <li className="mobile-navbar-item">
                        <Link to="/about" onClick={closeMenu}>{t('about')}</Link>
                    </li>
                    <li className="mobile-navbar-item">
                        <Link to="/blog" onClick={closeMenu}>{t('blog')}</Link>
                    </li>
                    <li className="mobile-navbar-item">
                        <Link to="/contact" onClick={closeMenu}>{t('contact')}</Link>
                    </li>
                    <li className="mobile-navbar-item language-selector">
                        <span className="language-label">{t('language')}</span>
                        <div className="language-options">
                            <button onClick={() => { changeLanguage('en'); closeMenu(); }}>English</button>
                            <button onClick={() => { changeLanguage('fr'); closeMenu(); }}>Français</button>
                            <button onClick={() => { changeLanguage('eo'); closeMenu(); }}>Esperanto</button>
                            <button onClick={() => { changeLanguage('ja'); closeMenu(); }}>日本語</button>
                            <button onClick={() => { changeLanguage('es'); closeMenu(); }}>Español</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MobileNavbar;
