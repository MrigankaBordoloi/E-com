import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './HeritageBento.css';

const ITEMS = [
    {
        id: 1,
        tag: 'Signature',
        title: 'Muga Silk',
        desc: 'The golden thread of Assam — natural silk spun from the wild Antheraea assamensis silkworm. Its warm sheen is utterly unique in the world.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1200&fit=crop&q=80',
        link: '/catalog?category=muga',
        size: 'large',
        accent: '#D4A854',
    },
    {
        id: 2,
        tag: 'Thermal Luxury',
        title: 'Endi Silk',
        desc: 'Nature\'s finest comfort — breathable, soft, and handspun.',
        image: 'https://images.unsplash.com/photo-1583391733981-5babdc3eb87d?w=700&h=900&fit=crop&q=80',
        link: '/catalog?category=endi',
        size: 'tall',
        accent: '#F5EDD8',
    },
    {
        id: 3,
        tag: 'Sacred Motif',
        title: 'Kinkhap Lion',
        desc: 'Guardian of Assamese royal heritage — woven in gold thread.',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&h=500&fit=crop&q=80',
        link: '/catalog',
        size: 'small',
        accent: '#C1440E',
    },
    {
        id: 4,
        tag: 'Craftsmanship',
        title: 'The Living Loom',
        desc: '200+ years of continuous weaving in every thread.',
        image: 'https://images.unsplash.com/photo-1583391733956-6f44e2aa4b7d?w=700&h=500&fit=crop&q=80',
        link: '/catalog',
        size: 'small',
        accent: '#D4A854',
    },
];

const BentoCard = ({ item, index }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        el.style.transition = 'transform 0ms';
        el.style.transform = `perspective(1100px) rotateY(${x * 10}deg) rotateX(${-y * 6}deg) translateZ(10px)`;
    };

    const handleMouseLeave = () => {
        const el = cardRef.current;
        if (!el) return;
        el.style.transition = 'transform 700ms cubic-bezier(0.19, 1, 0.22, 1)';
        el.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    };

    return (
        <motion.article
            ref={cardRef}
            className={`bento-card bento-${item.size}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Link to={item.link} className="bento-link cursor-hover-target">
                <div className="bento-img" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="bento-overlay" />
                <div className="bento-shine" />
                <div className="bento-sweep" aria-hidden="true" />

                <div className="bento-content">
                    <div className="bento-top">
                        <span className="bento-tag" style={{ '--accent': item.accent }}>{item.tag}</span>
                        <div className="bento-arrow-btn" aria-hidden="true">
                            <ArrowUpRight size={15} strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="bento-bottom">
                        <h3 className="bento-title">{item.title}</h3>
                        <p className="bento-desc">{item.desc}</p>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

const HeritageBento = () => (
    <section className="heritage-bento">
        <div className="container">
            <motion.div
                className="bento-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="bento-eyebrow">Heritage Collections</span>
                <h2 className="bento-heading">
                    Woven from<br /><em>the Earth</em>
                </h2>
            </motion.div>

            <div className="bento-grid">
                {ITEMS.map((item, i) => <BentoCard key={item.id} item={item} index={i} />)}
            </div>
        </div>
    </section>
);

export default HeritageBento;
