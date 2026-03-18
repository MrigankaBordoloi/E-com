import React from 'react';
import { motion } from 'framer-motion';
import './StorytellingScroll.css';

/* ─── chapter data ──────────────────────────────────────────── */
const CHAPTERS = [
    {
        num: '01',
        eyebrow: 'The Origin',
        title: ['Born from', 'Wild Silk'],
        body: 'In the forests of Assam, the Muga silkworm spins its thread on som and soalu trees — the only naturally golden silk in the world. No cultivation. No artificial dye. Only nature\'s own luminous filament, growing richer with every wash and every year.',
        img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1100&fit=crop&q=80',
        accent: '#D4A854',
        palette: 'dark',
    },
    {
        num: '02',
        eyebrow: 'The Craft',
        title: ['Hands That', 'Weave Centuries'],
        body: 'Each Mekhela Chador takes 15 to 45 days to complete. The weavers of Sualkuchi work on traditional handlooms — every thread placed by deliberate hands. 200+ shuttle passes per inch, each one a conscious act of artistry no machine can replicate.',
        img: 'https://images.unsplash.com/photo-1583391733981-5babdc3eb87d?w=900&h=1100&fit=crop&q=80',
        accent: '#C1440E',
        palette: 'light',
    },
    {
        num: '03',
        eyebrow: 'The Legacy',
        title: ['Sacred Language', 'in Thread'],
        body: 'Kinkhap (lion), Gos (tree), Jaapi (hat) — the motifs of Assam are a living scripture. Each pattern is a word in an ancient visual language, carrying cultural memory, identity, and the silent prayers of the master weaver who gave it form.',
        img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&h=1100&fit=crop&q=80',
        accent: '#D4A854',
        palette: 'dark',
    },
];

/* viewport config — fires once at 20% visibility */
const VP = { once: true, amount: 0.2 };

/* ─── silk-thread divider between chapters ───────────────────── */
const ThreadDivider = ({ accent }) => (
    <div className="ss-thread-wrap" aria-hidden="true">
        <motion.div
            className="ss-thread-line"
            style={{ background: `linear-gradient(90deg, transparent, ${accent} 50%, transparent)` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
            className="ss-thread-gem"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.9 }}
        />
    </div>
);

/* ─── single chapter ─────────────────────────────────────────── */
const Chapter = ({ ch, index }) => {
    const isLight    = ch.palette === 'light';
    const isReversed = index % 2 === 1;

    /* image clip-path wipe direction: left → right on odd, right → left on even */
    const imgInitial = isReversed
        ? { clipPath: 'inset(0 0% 0 100%)' }
        : { clipPath: 'inset(0 100% 0 0%)' };
    const imgAnimate = { clipPath: 'inset(0 0% 0 0%)' };

    return (
        <section className={`ss-ch ${isLight ? 'ss-ch-light' : 'ss-ch-dark'}`}>

            {/* Large chapter-number watermark */}
            <motion.div
                className="ss-num-mark"
                aria-hidden="true"
                initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {ch.num}
            </motion.div>

            <div className={`ss-ch-inner ${isReversed ? 'ss-ch-reversed' : ''}`}>

                {/* ── Text column ──────────────────────────────── */}
                <div className="ss-text-col">

                    {/* Eyebrow — clip-path draw */}
                    <div style={{ overflow: 'hidden' }}>
                        <motion.span
                            className="ss-eyebrow"
                            style={{ color: ch.accent }}
                            initial={{ y: '110%' }}
                            whileInView={{ y: '0%' }}
                            viewport={VP}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {ch.eyebrow}
                        </motion.span>
                    </div>

                    {/* Title — each line rises from below its overflow mask */}
                    <h2 className="ss-title" aria-label={ch.title.join(' ')}>
                        {ch.title.map((line, li) => (
                            <div key={li} className="ss-title-mask">
                                <motion.span
                                    className={`ss-title-line ${li === 1 ? 'ss-title-italic' : ''}`}
                                    initial={{ y: '108%', rotate: 1.5 }}
                                    whileInView={{ y: '0%', rotate: 0 }}
                                    viewport={VP}
                                    transition={{
                                        duration: 0.95,
                                        delay: 0.08 + li * 0.13,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    {line}
                                </motion.span>
                            </div>
                        ))}
                    </h2>

                    {/* Body — fade + slight rise */}
                    <motion.p
                        className="ss-body"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.9, delay: 0.32, ease: 'easeOut' }}
                    >
                        {ch.body}
                    </motion.p>

                    {/* Accent rule — scaleX expand */}
                    <motion.div
                        className="ss-accent-rule"
                        style={{ background: `linear-gradient(90deg, ${ch.accent}, transparent)` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={VP}
                        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* ── Image column — curtain wipe reveal ────────── */}
                <motion.div
                    className="ss-image-col"
                    initial={imgInitial}
                    whileInView={imgAnimate}
                    viewport={VP}
                    transition={{ duration: 1.3, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                >
                    <img
                        src={ch.img}
                        alt=""
                        className="ss-image"
                        loading="lazy"
                    />
                    <div className="ss-image-shade" />
                </motion.div>

            </div>
        </section>
    );
};

/* ─── root ───────────────────────────────────────────────────── */
const StorytellingScroll = () => (
    <div id="story">
        {CHAPTERS.map((ch, i) => (
            <React.Fragment key={i}>
                {i > 0 && <ThreadDivider accent={CHAPTERS[i - 1].accent} />}
                <Chapter ch={ch} index={i} />
            </React.Fragment>
        ))}
    </div>
);

export default StorytellingScroll;
