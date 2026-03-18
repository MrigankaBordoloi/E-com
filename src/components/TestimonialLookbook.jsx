import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mockData';
import './TestimonialLookbook.css';

const TestiCard = ({ t, index }) => (
    <motion.article
        className="testi-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
    >
        <div className="testi-shine" aria-hidden="true" />
        <div className="testi-stars" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={11} fill="#D4A854" strokeWidth={0} />
            ))}
        </div>
        <blockquote className="testi-text">"{t.comment}"</blockquote>
        <div className="testi-author">
            <img src={t.image} alt={t.name} className="testi-avatar" loading="lazy" />
            <div>
                <p className="testi-name">{t.name}</p>
                <p className="testi-loc">{t.location}</p>
            </div>
        </div>
    </motion.article>
);

const TestimonialLookbook = () => (
    <section className="testi-section" id="testimonials">
        <div className="testi-noise" aria-hidden="true" />
        <div className="container">
            <motion.div
                className="testi-head"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="testi-eyebrow">Stories from Our Community</span>
                <h2 className="testi-title">Voices of <em>Heritage</em></h2>
            </motion.div>

            <div className="testi-grid">
                {testimonials.map((t, i) => <TestiCard key={t.id} t={t} index={i} />)}
            </div>
        </div>
    </section>
);

export default TestimonialLookbook;
