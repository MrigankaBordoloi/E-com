import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import './StatsSection.css';

/* Animated number counter — triggers once when the element enters the viewport */
const CountUp = ({ end, suffix = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const target = parseInt(end, 10);
        const controls = animate(0, target, {
            duration: 2.4,
            ease: 'easeOut',
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return controls.stop;
    }, [inView, end]);

    return <span ref={ref}>{display}{suffix}</span>;
};

const STATS = [
    { isCount: true,  num: '200',  suffix: '+', label: 'Years of Heritage', sub: 'Continuous weaving tradition' },
    { isCount: true,  num: '50',   suffix: '+', label: 'Master Weavers',    sub: 'Artisans from Assam'         },
    { isCount: true,  num: '1000', suffix: '+', label: 'Unique Designs',    sub: 'Hand-drawn motifs'           },
    { isCount: false, num: 'GI',   suffix: '',  label: 'Tagged Authentic',  sub: 'Government certified'        },
];

const StatsSection = () => (
    <section className="stats-sec">
        <div className="stats-grain" aria-hidden="true" />
        <div className="container">
            <div className="stats-grid">
                {STATS.map((s, i) => (
                    <motion.div
                        key={i}
                        className="stat-card"
                        initial={{ opacity: 0, y: 44 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="stat-card-shine" aria-hidden="true" />
                        <div className="stat-card-body">
                            <p className="stat-num">
                                {s.isCount
                                    ? <CountUp end={s.num} suffix={s.suffix} />
                                    : <>{s.num}{s.suffix}</>
                                }
                            </p>
                            <p className="stat-lbl">{s.label}</p>
                            <p className="stat-sub">{s.sub}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default StatsSection;
