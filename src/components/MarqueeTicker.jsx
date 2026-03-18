import React from 'react';
import './MarqueeTicker.css';

const ITEMS = [
    'Muga Silk', 'Handwoven', 'Assam Heritage', 'Mekhela Chador',
    'GI Tagged', 'Master Weavers', 'Kinkhap Motif', 'Luxury Textiles',
    'Endi Silk', 'Traditional Loom', 'Pat Silk', 'Gos Motif', 'Jaapi Art',
];

const MarqueeTicker = ({ inverted = false }) => {
    const items = [...ITEMS, ...ITEMS, ...ITEMS];

    return (
        <div className={`marquee-ticker ${inverted ? 'marquee-inv' : ''}`} aria-hidden="true">
            <div className="marquee-track">
                <div className={`marquee-content ${inverted ? 'marquee-rev' : ''}`}>
                    {items.map((item, i) => (
                        <span key={i} className="marquee-item">
                            {item}
                            <span className="marquee-sep">✦</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarqueeTicker;
