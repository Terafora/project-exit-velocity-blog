import React from 'react';
import { useTranslation } from 'react-i18next';
import '../stylings/Contact.scss';

const Contact: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="contact-container">
            <div className="contact-content">
            <div className="contact-border">
                <h1>{t('contact')}</h1>
                <div className="contact-info">
                    <div className="contact-section">
                        <h2>Email</h2>
                        <p>Temporarily hidden</p>
                    </div>
                    <div className="contact-section">
                        <h2>Socials</h2>
                        <ul className="social-links">
                            <li>
                                <p>Updating Soon</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Contact;
