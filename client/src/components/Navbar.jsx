import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../stylings/Navbar.scss';

const Navbar = ({ changeLanguage }) => {
    const { t } = useTranslation(); // Get the translation function

    return (
        <div className="navbar-wrapper">
            <div className="navbar-shadow"></div>
            <div className="navbar-shadow navbar-shadow-two"></div>

            <nav className="navbar"></nav>
            <div className="navbar navbar-two"></div>

            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/">{t('home')}</Link></li>
                <li className="navbar-item"><Link to="/about">{t('about')}</Link></li>
                <li className="navbar-item"><Link to="/blog">{t('blog')}</Link></li>
                <li className="navbar-item"><Link to="/contact">{t('contact')}</Link></li>

                {/* Language Selector */}
                <li className="navbar-item dropdown">
                    <a href="#" className="dropdown-toggle">{t('language')}</a>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item"><button onClick={() => changeLanguage('en')}>English</button></li>
                        <li className="dropdown-item"><button onClick={() => changeLanguage('fr')}>French</button></li>
                        <li className="dropdown-item"><button onClick={() => changeLanguage('jp')}>Japanese</button></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
