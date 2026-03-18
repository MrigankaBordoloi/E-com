import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        // Check if touch device
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = (e) => {
            if (e.target.closest('.cursor-hover-target')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e) => {
            if (e.target.closest('.cursor-hover-target')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, [cursorX, cursorY]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="custom-cursor"
                style={{
                    left: cursorX,
                    top: cursorY,
                    scale: isHovering ? 3 : 1,
                }}
                transition={{
                    scale: { type: 'spring', stiffness: 300, damping: 20 }
                }}
            />

            {/* Outer ring for hover state */}
            {isHovering && (
                <motion.div
                    className="custom-cursor-ring"
                    style={{
                        left: cursorX,
                        top: cursorY,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                >
                    <span className="cursor-text">View Details</span>
                </motion.div>
            )}
        </>
    );
};

export default CustomCursor;
