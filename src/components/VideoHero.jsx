import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import './VideoHero.css';

/* Deterministic particles — no Math.random to keep renders stable */
const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
    left:     `${(i * 3.13 + 1.4) % 97}%`,
    delay:    `${(i * 0.41)  % 11}s`,
    duration: `${11 + (i * 1.23) % 13}s`,
    size:     `${1.5 + (i * 0.77) % 4}px`,
    driftX:   `${-45 + (i * 5.7) % 90}px`,
}));

const WORDS = [
    { text: 'The',    cls: 'hw-plain'  },
    { text: 'Golden', cls: 'hw-italic' },
    { text: 'Thread', cls: 'hw-italic' },
    { text: 'of',     cls: 'hw-plain'  },
    { text: 'Assam',  cls: 'hw-bold'   },
];

const VideoHero = ({
    subtitle = 'Handcrafted Mekhela Chadors woven by master artisans — where centuries of tradition meet timeless luxury.',
}) => {
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
    const heroY       = useTransform(scrollY, [0, 600], [0, 80]);

    return (
        <section className="lg-hero" aria-label="Hero">

            {/* ── Curtain reveal — dark panel slides upward ── */}
            <motion.div
                className="lg-curtain"
                initial={{ y: '0%' }}
                animate={{ y: '-100%' }}
                transition={{ duration: 1.55, ease: [0.76, 0, 0.24, 1] }}
                aria-hidden="true"
            />

            {/* ── Animated colour blobs ── */}
            <div className="lg-blobs" aria-hidden="true">
                <div className="lg-blob lg-blob-gold" />
                <div className="lg-blob lg-blob-red"  />
                <div className="lg-blob lg-blob-silk" />
                <div className="lg-blob lg-blob-teal" />
                <div className="lg-blob lg-blob-deep" />
            </div>

            {/* ── Rising gold particles ── */}
            <div className="lg-particles" aria-hidden="true">
                {PARTICLES.map((p, i) => (
                    <span
                        key={i}
                        className="lg-particle"
                        style={{
                            left:             p.left,
                            width:            p.size,
                            height:           p.size,
                            animationDelay:   p.delay,
                            animationDuration:p.duration,
                            '--drift-x':      p.driftX,
                        }}
                    />
                ))}
            </div>

            {/* ── Grain texture ── */}
            <div className="lg-grain" aria-hidden="true" />

            {/* ── Top iridescent line ── */}
            <div className="lg-line-top" aria-hidden="true" />

            {/* ── VAASTRA watermark ── */}
            <motion.div
                className="lg-watermark"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9, duration: 2.5 }}
                aria-hidden="true"
            >
                VAASTRA
            </motion.div>

            {/* ── Floating glass panels (desktop only) ── */}
            <motion.div
                className="lg-panel lg-panel-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
            >
                <span className="panel-label">Crafted in</span>
                <span className="panel-value">Assam, India</span>
                <span className="panel-sub">Since 1985</span>
                <div className="panel-pulse" />
            </motion.div>

            <motion.div
                className="lg-panel lg-panel-right"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
            >
                <span className="panel-label">GI Tagged</span>
                <span className="panel-value">100% Authentic</span>
                <span className="panel-sub">Muga · Endi · Pat</span>
                <div className="panel-pulse" />
            </motion.div>

            {/* ── Main content ── */}
            <motion.div className="lg-content" style={{ opacity: heroOpacity, y: heroY }}>

                {/* Eyebrow */}
                <motion.div
                    className="lg-eyebrow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.65, duration: 0.8 }}
                >
                    <span className="eyebrow-gem" aria-hidden="true" />
                    Handwoven Heritage · GI Tagged · Assam
                    <span className="eyebrow-gem" aria-hidden="true" />
                </motion.div>

                {/* Headline — word-by-word 3D flip-in */}
                <h1 className="lg-headline" style={{ perspective: '1400px' }}>
                    {WORDS.map((w, i) => (
                        <motion.span
                            key={i}
                            className={`hw-word ${w.cls}`}
                            initial={{ opacity: 0, y: 90, rotateX: -80 }}
                            animate={{ opacity: 1, y: 0,  rotateX: 0   }}
                            transition={{
                                delay:    1.85 + i * 0.14,
                                duration: 1.05,
                                ease:     [0.16, 1, 0.3, 1],
                            }}
                        >
                            {w.text}
                        </motion.span>
                    ))}
                </h1>

                {/* Expanding gold rule */}
                <motion.div
                    className="lg-rule"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.65, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Subtitle */}
                <motion.p
                    className="lg-subtitle"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.75, duration: 0.9 }}
                >
                    {subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="lg-ctas"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.0, duration: 0.8 }}
                >
                    <a href="#collections" className="cta-gold cursor-hover-target">
                        <span>Explore Collection</span>
                        <ArrowRight size={15} strokeWidth={2} />
                    </a>
                    <a href="#story" className="cta-glass cursor-hover-target">
                        Our Heritage
                    </a>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    className="lg-stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.35, duration: 0.9 }}
                    aria-label="Key statistics"
                >
                    {[
                        { num: '200+', lbl: 'Years Heritage'  },
                        { num: '50+',  lbl: 'Master Weavers'  },
                        { num: '1000+',lbl: 'Unique Designs'  },
                    ].map((s, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <div className="stat-bar" aria-hidden="true" />}
                            <div className="stat-item">
                                <span className="stat-num">{s.num}</span>
                                <span className="stat-lbl">{s.lbl}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </motion.div>
            </motion.div>

            {/* ── Scroll indicator ── */}
            <motion.div
                className="lg-scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
                aria-hidden="true"
            >
                <div className="lg-scroll-line" />
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ArrowDown size={14} strokeWidth={1.5} />
                </motion.div>
                <span>Scroll</span>
            </motion.div>
        </section>
    );
};

export default VideoHero;
