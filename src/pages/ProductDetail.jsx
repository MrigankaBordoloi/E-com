import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Share2, Star, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const { addToCart } = useCart();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    if (!product) {
        return <div className="container">Product not found</div>;
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                <motion.div
                    className="product-detail"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <motion.div
                            className="main-image"
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={product.images[selectedImage]} alt={product.name} />
                            {discount > 0 && (
                                <div className="discount-badge">-{discount}%</div>
                            )}
                        </motion.div>

                        <div className="image-thumbnails">
                            {product.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img src={image} alt={`${product.name} ${index + 1}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info-section">
                        <div className="product-header">
                            <div>
                                <span className="product-category-tag">{product.category}</span>
                                {product.new && <span className="badge-new">New Arrival</span>}
                                {product.trending && <span className="badge-trending">Trending</span>}
                            </div>

                            <div className="product-actions-top">
                                <motion.button
                                    className="icon-btn"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Heart size={20} />
                                </motion.button>
                                <motion.button
                                    className="icon-btn"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Share2 size={20} />
                                </motion.button>
                            </div>
                        </div>

                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-rating-section">
                            <div className="stars-large">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        fill={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'none'}
                                        stroke={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'var(--color-gray)'}
                                    />
                                ))}
                            </div>
                            <span className="rating-details">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        <div className="product-price-section">
                            <div className="price-main">₹{product.price.toLocaleString()}</div>
                            {product.originalPrice > product.price && (
                                <>
                                    <div className="price-original">₹{product.originalPrice.toLocaleString()}</div>
                                    <div className="price-save">Save ₹{(product.originalPrice - product.price).toLocaleString()}</div>
                                </>
                            )}
                        </div>

                        <p className="product-description">{product.description}</p>

                        {/* Colors */}
                        {product.colors && (
                            <div className="product-options">
                                <h3 className="option-title">Available Colors</h3>
                                <div className="color-options">
                                    {product.colors.map((color, index) => (
                                        <span key={index} className="color-tag">{color}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="quantity-section">
                            <h3 className="option-title">Quantity</h3>
                            <div className="quantity-controls">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="quantity-btn"
                                >
                                    -
                                </button>
                                <span className="quantity-display">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="product-cta">
                            <motion.button
                                className="btn btn-gold btn-lg add-to-cart-btn"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                                whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                            >
                                <AnimatePresence mode="wait">
                                    {addedToCart ? (
                                        <motion.span
                                            key="added"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-sm"
                                        >
                                            <Check size={20} />
                                            Added to Cart!
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="add"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-sm"
                                        >
                                            <ShoppingBag size={20} />
                                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            <Link to="/cart" className="btn btn-outline btn-lg">
                                View Cart
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="product-features">
                            <div className="feature-item">
                                <Truck size={20} />
                                <div>
                                    <strong>Free Shipping</strong>
                                    <p>On orders above ₹15,000</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <Shield size={20} />
                                <div>
                                    <strong>Authenticity Guaranteed</strong>
                                    <p>100% genuine handwoven silk</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <RefreshCw size={20} />
                                <div>
                                    <strong>Easy Returns</strong>
                                    <p>7-day return policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="related-products section-padding">
                        <h2 className="section-title text-center">You May Also Like</h2>
                        <div className="products-grid">
                            {relatedProducts.map((prod, index) => (
                                <ProductCard key={prod.id} product={prod} delay={index * 0.1} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
