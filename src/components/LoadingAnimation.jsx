import React from 'react';
import { motion } from 'framer-motion';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
    return (
        <div className="loading-container">
            <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="loading-svg"
            >
                {/* Weaving loom frame */}
                <rect
                    x="20"
                    y="20"
                    width="80"
                    height="80"
                    stroke="var(--color-kings-gold)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                />

                {/* Vertical threads (warp) */}
                {[30, 40, 50, 60, 70, 80, 90].map((x, i) => (
                    <motion.line
                        key={`warp-${i}`}
                        x1={x}
                        y1="20"
                        x2={x}
                        y2="100"
                        stroke="var(--color-kings-gold)"
                        strokeWidth="1"
                        opacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 1,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}

                {/* Horizontal weaving thread (weft) - animated */}
                <motion.path
                    d="M 20 40 Q 35 35, 50 40 T 80 40 L 100 40"
                    stroke="var(--color-vermillion)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        pathLength: { duration: 2, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.5 }
                    }}
                />

                <motion.path
                    d="M 20 60 Q 35 65, 50 60 T 80 60 L 100 60"
                    stroke="var(--color-vermillion)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        pathLength: { duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.5, delay: 0.5 }
                    }}
                />

                <motion.path
                    d="M 20 80 Q 35 75, 50 80 T 80 80 L 100 80"
                    stroke="var(--color-vermillion)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        pathLength: { duration: 2, delay: 1, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.5, delay: 1 }
                    }}
                />

                {/* Center motif element */}
                <motion.circle
                    cx="60"
                    cy="60"
                    r="5"
                    fill="var(--color-kings-gold)"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                />
            </svg>

            <motion.p
                className="loading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                Weaving Experience
            </motion.p>
        </div>
    );
};

export default LoadingAnimation;
