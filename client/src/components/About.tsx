import React from 'react';
import { useTranslation } from 'react-i18next';
import '../stylings/About.scss';

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="about-container">
            <div className="about-content">
                <div className="about-border">
                    <div className="about-grid">
                        <div className="image-section">
                            <div className="image-wrapper">
                                <img 
                                    src="/assets/cstonesite.png" 
                                    alt={t('about_page.image_alt')}
                                    className="about-image"
                                />
                            </div>
                        </div>
                        <div className="text-section">
                            <h1>{t('about_page.title')}</h1>
                            <div className="about-text">
                                <h2>{t('about_page.sections.who.title')}</h2>
                                <p>{t('about_page.sections.who.content')}</p>
                                <h2>{t('about_page.sections.what.title')}</h2>
                                <p>{t('about_page.sections.what.content')}</p>
                                <h2>{t('about_page.sections.vision.title')}</h2>
                                <p>{t('about_page.sections.vision.content')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
