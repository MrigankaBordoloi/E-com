import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './HorizontalProducts.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { success } = useToast();

    const handleAdd = (e) => {
        e.preventDefault();
        addToCart(product.id, 1);
        success('Added to bag');
    };

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <div className="hprod-card cursor-hover-target">
            <Link to={`/product/${product.id}`} className="hprod-link">
                <div className="hprod-img-wrap">
                    <img src={product.image} alt={product.name} className="hprod-img" loading="lazy" />

                    <div className="hprod-badges">
                        {product.new      && <span className="hprod-badge hprod-badge-new">New</span>}
                        {product.trending && <span className="hprod-badge hprod-badge-hot">Trending</span>}
                        {discount > 0     && <span className="hprod-badge hprod-badge-sale">-{discount}%</span>}
                    </div>

                    <div className="hprod-overlay">
                        <button className="hprod-add" onClick={handleAdd} aria-label="Add to bag">
                            <ShoppingBag size={14} strokeWidth={1.5} />
                            <span>Add to Bag</span>
                        </button>
                    </div>
                </div>

                <div className="hprod-info">
                    <span className="hprod-cat">{product.category}</span>
                    <h3 className="hprod-name">{product.name}</h3>
                    <div className="hprod-meta">
                        <div className="hprod-rating">
                            <Star size={10} fill="currentColor" strokeWidth={0} />
                            <span>{product.rating}</span>
                            <span className="hprod-reviews">({product.reviews})</span>
                        </div>
                        <div className="hprod-price">
                            <span className="hprod-price-now">₹{product.price.toLocaleString('en-IN')}</span>
                            {product.originalPrice && (
                                <span className="hprod-price-was">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const HorizontalProducts = ({ products }) => {
    const trackRef = useRef(null);

    return (
        <section className="hprod-section" id="collections">
            <div className="hprod-header container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="hprod-eyebrow">Curated for you</span>
                    <h2 className="hprod-title">
                        Heritage<br /><em>Collections</em>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Link to="/catalog" className="hprod-all cursor-hover-target">
                        View All
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>

            <div className="hprod-scroll-wrap">
                <div className="hprod-track" ref={trackRef}>
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HorizontalProducts;
