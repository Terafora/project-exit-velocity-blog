import React from 'react';
import '../stylings/InfoBar.scss';

const InfoBar = ({ text }) => { 
    return (
        <div className="info-bar">
            <div className="scrolling-text">
                {text}
            </div>
        </div>
    );
};

export default InfoBar;
