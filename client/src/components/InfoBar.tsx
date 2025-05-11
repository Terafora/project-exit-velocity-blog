import React from 'react';
import '../stylings/InfoBar.scss';

interface InfoBarProps {
  text: string;
}

const InfoBar: React.FC<InfoBarProps> = ({ text }) => { 
    return (
        <div className="info-bar">
            <div className="scrolling-text">
                {text}
            </div>
        </div>
    );
};

export default InfoBar;
