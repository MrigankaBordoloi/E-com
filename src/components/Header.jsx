import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const NAV = [
    { name: 'Collections', path: '/catalog' },
    { name: 'Muga Silk',   path: '/catalog?category=muga' },
    { name: 'Endi Silk',   path: '/catalog?category=endi' },
    { name: 'Our Story',   path: '/#story' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { getCartCount } = useCart();
    const { user } = useAuth();
    const cartCount = getCartCount();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 56);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.header
            className={`header ${scrolled ? 'header-scrolled' : 'header-clear'}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo cursor-hover-target" aria-label="Vaastra home">
                        <motion.div className="monogram" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <span className="monogram-text">VAASTRA</span>
                        </motion.div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="nav-desktop" aria-label="Main navigation">
                        {NAV.map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}
                            >
                                <Link to={item.path} className="nav-link cursor-hover-target">{item.name}</Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        <Link to="/cart" aria-label="Shopping bag">
                            <motion.button className="icon-btn cart-btn cursor-hover-target" whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                                <ShoppingBag size={18} strokeWidth={1.5} />
                                {cartCount > 0 && (
                                    <motion.span
                                        className="cart-badge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500 }}
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </motion.button>
                        </Link>

                        <Link to={user ? '/profile' : '/login'} aria-label={user ? 'My profile' : 'Sign in'}>
                            <motion.button className="icon-btn cursor-hover-target" whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                                <User size={18} strokeWidth={1.5} />
                            </motion.button>
                        </Link>

                        <motion.button
                            className="icon-btn menu-toggle"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(v => !v)}
                            whileHover={{ y: -2 }}
                        >
                            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            className="mobile-backdrop"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                        />
                        <motion.div
                            className="mobile-menu"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <nav className="mobile-nav" aria-label="Mobile navigation">
                                {NAV.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.08 + i * 0.05 }}
                                    >
                                        <Link to={item.path} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
