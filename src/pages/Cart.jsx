import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
    const cartTotal = getCartTotal();
    const cartCount = getCartCount();

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <div className="container">
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ShoppingBag size={80} className="empty-icon" />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any sarees yet.</p>
                        <Link to="/catalog">
                            <motion.button
                                className="btn btn-primary btn-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Shopping
                                <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <motion.h1
                    className="cart-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Shopping Cart
                    <span className="cart-count">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                </motion.h1>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="cart-item"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link to={`/product/${item.id}`} className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </Link>

                                <div className="cart-item-details">
                                    <Link to={`/product/${item.id}`}>
                                        <h3 className="cart-item-name">{item.name}</h3>
                                    </Link>
                                    <p className="cart-item-category">{item.category}</p>
                                    <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                                </div>

                                <div className="cart-item-quantity">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="quantity-value">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </div>

                                <motion.button
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(item.id)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Trash2 size={20} />
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <motion.div
                        className="cart-summary"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="summary-title">Order Summary</h2>

                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{cartTotal >= 15000 ? 'FREE' : '₹500'}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (Estimated)</span>
                                <span>₹{Math.round(cartTotal * 0.18).toLocaleString()}</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <span>₹{(cartTotal + (cartTotal >= 15000 ? 0 : 500) + Math.round(cartTotal * 0.18)).toLocaleString()}</span>
                            </div>
                        </div>

                        {cartTotal < 15000 && (
                            <div className="free-shipping-notice">
                                Add ₹{(15000 - cartTotal).toLocaleString()} more for free shipping!
                            </div>
                        )}

                        <Link to="/checkout">
                            <motion.button
                                className="btn btn-gold btn-lg checkout-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Proceed to Checkout
                                <ArrowRight size={20} />
                            </motion.button>
                        </Link>

                        <Link to="/catalog" className="continue-shopping">
                            ← Continue Shopping
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
