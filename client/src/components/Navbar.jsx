import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../stylings/Navbar.scss';

const Navbar = ({ changeLanguage, updateInfoBarText }) => {
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

    // Set navbar background color based on the current path
    const isBlogArticle = location.pathname.startsWith('/blog/') && location.pathname.length > 6;
    const navbarColor = isBlogArticle ? '#C71585' : (routeColors[location.pathname] || '#20B2AA');

    useEffect(() => {
        const newTextKey = routeTextKeys[location.pathname] || 'infobar.default';
        const newText = t(newTextKey);
        updateInfoBarText(newText);
    }, [location.pathname, i18n.language, t, updateInfoBarText, routeTextKeys]);

    return (
        <div className="navbar-wrapper">
            <div className="navbar-shadow"></div>
            <div className="navbar-shadow navbar-shadow-two"></div>

            {/* Apply the dynamic color to both navbar and navbar-two */}
            <nav className="navbar" style={{ backgroundColor: navbarColor }}></nav>
            <div className="navbar navbar-two" style={{ backgroundColor: navbarColor }}></div>

            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/">{t('home')}</Link></li>
                <li className="navbar-item"><Link to="/about">{t('about')}</Link></li>
                <li className="navbar-item"><Link to="/blog">{t('blog')}</Link></li>
                <li className="navbar-item"><Link to="/contact">{t('contact')}</Link></li>

                {/* Language Selector with dynamic background for dropdown-menu */}
                <li className="navbar-item dropdown">
                    <button type="button" className="dropdown-toggle">{t('language')}</button> {/* Changed from <a> to <button> */}
                    <ul className="dropdown-menu" style={{ backgroundColor: navbarColor }}>
                        <li className="dropdown-item"><button onClick={() => changeLanguage('en')}>English</button></li>
                        <li className="dropdown-item"><button onClick={() => changeLanguage('fr')}>French</button></li>
                        <li className="dropdown-item"><button onClick={() => changeLanguage('eo')}>Esperanto</button></li>
                        <li className="dropdown-item"><button onClick={() => changeLanguage('ja')}>Japanese</button></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
