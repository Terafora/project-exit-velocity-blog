import React from 'react';
import { useTranslation } from 'react-i18next';
import '../stylings/Contact.scss';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="contact-container">
            <div className="contact-content">
                <h1>{t('contact')}</h1>
                <div className="contact-info">
                    <div className="contact-section">
                        <h2>Email</h2>
                        <p>charlotte.stone649@gmail.com</p>
                    </div>
                    <div className="contact-section">
                        <h2>Socials</h2>
                        <ul className="social-links">
                            <li>
                                <a href="https://www.linkedin.com/in/charlotte-stone-web/" target="_blank" rel="noopener noreferrer">
                                    LinkedIn: Charlotte Stone
                                </a><br></br>
                                <a href="https://github.com/Terafora" target="_blank" rel="noopener noreferrer">
                                    Github: Terafora
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
