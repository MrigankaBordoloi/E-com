import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-gold-line" aria-hidden="true" />

            <div className="footer-body">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand */}
                        <motion.div
                            className="footer-col footer-brand-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="footer-logo">VAASTRA</h3>
                            <p className="footer-tagline">The Golden Thread of Assam</p>
                            <p className="footer-desc">
                                Luxury Mekhela Chadors handwoven by master artisans of Assam.
                                GI Tagged. Heritage Certified.
                            </p>
                            <div className="social-links">
                                {[
                                    { Icon: Instagram, label: 'Instagram' },
                                    { Icon: Facebook,  label: 'Facebook' },
                                    { Icon: Youtube,   label: 'YouTube' },
                                ].map(({ Icon, label }) => (
                                    <motion.a key={label} href="#" aria-label={label} className="social-link cursor-hover-target" whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
                                        <Icon size={17} strokeWidth={1.5} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Shop */}
                        <motion.div
                            className="footer-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h4 className="footer-col-title">Shop</h4>
                            <ul className="footer-links">
                                <li><Link to="/catalog?category=muga">Muga Silk</Link></li>
                                <li><Link to="/catalog?category=endi">Endi Silk</Link></li>
                                <li><Link to="/catalog?category=pat">Pat Silk</Link></li>
                                <li><Link to="/catalog">All Collections</Link></li>
                                <li><Link to="/catalog?new=true">New Arrivals</Link></li>
                            </ul>
                        </motion.div>

                        {/* Care */}
                        <motion.div
                            className="footer-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h4 className="footer-col-title">Care</h4>
                            <ul className="footer-links">
                                <li><Link to="/about">About Vaastra</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/shipping">Shipping Policy</Link></li>
                                <li><Link to="/returns">Returns</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                            </ul>
                        </motion.div>

                        {/* Connect */}
                        <motion.div
                            className="footer-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h4 className="footer-col-title">Connect</h4>
                            <ul className="footer-contact-list">
                                <li>
                                    <Mail size={13} strokeWidth={1.5} aria-hidden="true" />
                                    <span>support@vaastra.com</span>
                                </li>
                                <li>
                                    <Phone size={13} strokeWidth={1.5} aria-hidden="true" />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li>
                                    <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
                                    <span>Guwahati, Assam, India</span>
                                </li>
                            </ul>

                            <form className="footer-newsletter" onSubmit={e => e.preventDefault()}>
                                <div className="newsletter-field">
                                    <input type="email" placeholder="your@email.com" aria-label="Subscribe to newsletter" />
                                    <button type="submit" aria-label="Subscribe">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="newsletter-note">Exclusive previews & heritage stories</p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-row">
                        <p className="copyright">© {year} Vaastra. All rights reserved.</p>
                        <div className="footer-legal">
                            <Link to="/privacy">Privacy Policy</Link>
                            <span aria-hidden="true">·</span>
                            <Link to="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
