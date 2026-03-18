import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, delay = 0 }) => {
    const { addToCart } = useCart();
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <motion.div
            className="product-card card-product"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -8 }}
        >
            <Link to={`/product/${product.id}`} className="product-card-link">
                {/* Image Container */}
                <div className="product-image-container">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Badges */}
                    <div className="product-badges">
                        {product.new && (
                            <motion.span
                                className="badge badge-new"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: delay + 0.2, type: 'spring' }}
                            >
                                New
                            </motion.span>
                        )}
                        {discount > 0 && (
                            <motion.span
                                className="badge badge-discount"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: delay + 0.3, type: 'spring' }}
                            >
                                {discount}% OFF
                            </motion.span>
                        )}
                        {product.trending && (
                            <motion.span
                                className="badge badge-trending"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: delay + 0.4, type: 'spring' }}
                            >
                                Trending
                            </motion.span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="product-quick-actions">
                        <motion.button
                            className="quick-action-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.preventDefault();
                                // Add to wishlist logic
                            }}
                        >
                            <Heart size={18} />
                        </motion.button>
                    </div>

                    {/* Overlay Add to Cart */}
                    <motion.div
                        className="product-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    >
                        <motion.button
                            className="btn btn-gold btn-add-cart"
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ShoppingBag size={18} />
                            Add to Cart
                        </motion.button>
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>

                    {/* Rating */}
                    <div className="product-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'none'}
                                    stroke={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'var(--color-gray)'}
                                />
                            ))}
                        </div>
                        <span className="rating-text">
                            {product.rating} ({product.reviews})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="product-pricing">
                        <span className="product-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                            <span className="product-original-price">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
