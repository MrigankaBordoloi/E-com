import React from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', fullPage = false, text = 'Loading...' }) => {
    const sizeClass = `spinner-${size}`;

    if (fullPage) {
        return (
            <div className="loading-fullpage">
                <div className="loading-content">
                    <motion.div
                        className={`spinner ${sizeClass}`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        <div className="spinner-circle"></div>
                    </motion.div>
                    {text && <p className="loading-text">{text}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="loading-inline">
            <motion.div
                className={`spinner ${sizeClass}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
                <div className="spinner-circle"></div>
            </motion.div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
};

export const SkeletonLoader = ({ width = '100%', height = '20px', className = '' }) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{ width, height }}
        />
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="card product-card-skeleton">
            <SkeletonLoader height="300px" className="skeleton-image" />
            <div style={{ padding: 'var(--spacing-lg)' }}>
                <SkeletonLoader height="24px" width="80%" />
                <SkeletonLoader height="16px" width="60%" style={{ marginTop: 'var(--spacing-sm)' }} />
                <SkeletonLoader height="20px" width="40%" style={{ marginTop: 'var(--spacing-md)' }} />
            </div>
        </div>
    );
};

export default LoadingSpinner;
