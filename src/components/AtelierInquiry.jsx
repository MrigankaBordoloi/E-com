import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AtelierInquiry.css';

const AtelierInquiry = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', occasion: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <section className="atelier-sec" id="contact">
            <div className="atelier-noise" aria-hidden="true" />
            <div className="container">
                <div className="atelier-layout">
                    {/* ── Left content ── */}
                    <motion.div
                        className="atelier-info"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="atelier-eyebrow">Bespoke Atelier</span>
                        <h2 className="atelier-heading">
                            Commission<br /><em>Your Legacy</em>
                        </h2>
                        <p className="atelier-desc">
                            Work directly with our master weavers to create a Mekhela Chador that carries your story —
                            custom motifs, heirloom-quality silk, and designs that outlast generations.
                        </p>
                        <ul className="atelier-feats">
                            {[
                                'Personal design consultation',
                                'Custom Assamese motifs',
                                '6–10 week masterpiece creation',
                                'Certificate of authenticity',
                            ].map((f, i) => (
                                <li key={i}>
                                    <span className="feat-dot" aria-hidden="true" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* ── Right glass form ── */}
                    <motion.div
                        className="atelier-card-wrap"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="atelier-glass-card">
                            <div className="atelier-card-shine" aria-hidden="true" />
                            {sent ? (
                                <div className="atelier-success">
                                    <div className="success-icon" aria-hidden="true">✦</div>
                                    <h3>Inquiry Received</h3>
                                    <p>Our atelier team will reach out within 24–48 hours to begin your bespoke journey.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="atelier-form" noValidate>
                                    <h3 className="form-heading">Begin Your Journey</h3>
                                    <div className="aform-row">
                                        <div className="aform-group">
                                            <label htmlFor="ai-name">Full Name</label>
                                            <input id="ai-name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} />
                                        </div>
                                        <div className="aform-group">
                                            <label htmlFor="ai-email">Email</label>
                                            <input id="ai-email" name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="aform-row">
                                        <div className="aform-group">
                                            <label htmlFor="ai-phone">Phone</label>
                                            <input id="ai-phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                                        </div>
                                        <div className="aform-group">
                                            <label htmlFor="ai-occasion">Occasion</label>
                                            <select id="ai-occasion" name="occasion" value={form.occasion} onChange={handleChange}>
                                                <option value="">Select</option>
                                                <option>Wedding</option>
                                                <option>Bihu Festival</option>
                                                <option>Corporate Gift</option>
                                                <option>Personal Collection</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="aform-group">
                                        <label htmlFor="ai-msg">Your Vision</label>
                                        <textarea id="ai-msg" name="message" rows="4" placeholder="Describe your dream Mekhela Chador…" value={form.message} onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="atelier-submit cursor-hover-target">
                                        <span>Send Inquiry</span>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AtelierInquiry;
