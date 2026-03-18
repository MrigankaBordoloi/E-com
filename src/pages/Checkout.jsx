import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, ShoppingBag, ArrowRight, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../utils/api';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { success, error } = useToast();

    const [step, setStep] = useState(1); // 1: Address, 2: Review, 3: Payment
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.name || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    const validateAddress = () => {
        const required = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
        return required.every(field => shippingAddress[field].trim() !== '');
    };

    const handleContinueToReview = () => {
        if (validateAddress()) {
            setStep(2);
        } else {
            error('Please fill in all address fields');
        }
    };

    const handlePayment = async () => {
        try {
            setLoading(true);

            // Create order on backend
            const orderData = {
                items: cartItems,
                shippingAddress,
                totalAmount: getCartTotal()
            };

            const response = await api.createOrder(orderData);

            // Here you would integrate Razorpay
            // For now, we'll simulate payment success
            success('Order placed successfully!');
            clearCart();
            navigate('/orders');

        } catch (err) {
            error(err.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 15000 ? 0 : 200;
    const total = subtotal + shipping;

    return (
        <div className="checkout-page">
            <div className="container">
                <div className="checkout-header">
                    <h1>Checkout</h1>
                    <div className="checkout-steps">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>
                            <div className="step-number">1</div>
                            <span>Address</span>
                        </div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>
                            <div className="step-number">2</div>
                            <span>Review</span>
                        </div>
                        <div className={`step ${step >= 3 ? 'active' : ''}`}>
                            <div className="step-number">3</div>
                            <span>Payment</span>
                        </div>
                    </div>
                </div>

                <div className="checkout-content">
                    <div className="checkout-main">
                        {/* Step 1: Shipping Address */}
                        {step === 1 && (
                            <motion.div
                                className="checkout-section card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="section-header">
                                    <MapPin size={24} />
                                    <h2>Shipping Address</h2>
                                </div>

                                <div className="address-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="fullName" className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                className="form-input"
                                                value={shippingAddress.fullName}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="form-input"
                                                value={shippingAddress.phone}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            className="form-textarea"
                                            rows="3"
                                            value={shippingAddress.address}
                                            onChange={handleAddressChange}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                className="form-input"
                                                value={shippingAddress.city}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                className="form-input"
                                                value={shippingAddress.state}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pincode" className="form-label">Pincode</label>
                                            <input
                                                type="text"
                                                id="pincode"
                                                name="pincode"
                                                className="form-input"
                                                value={shippingAddress.pincode}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleContinueToReview}
                                    >
                                        Continue to Review
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Review Order */}
                        {step === 2 && (
                            <motion.div
                                className="checkout-section card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="section-header">
                                    <ShoppingBag size={24} />
                                    <h2>Review Your Order</h2>
                                </div>

                                <div className="order-review">
                                    <div className="review-address">
                                        <h3>Shipping To:</h3>
                                        <p>{shippingAddress.fullName}</p>
                                        <p>{shippingAddress.phone}</p>
                                        <p>{shippingAddress.address}</p>
                                        <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                                        <button className="btn-link" onClick={() => setStep(1)}>Edit Address</button>
                                    </div>

                                    <div className="review-items">
                                        <h3>Order Items</h3>
                                        {cartItems.map(item => (
                                            <div key={item.id} className="review-item">
                                                <img src={item.image} alt={item.name} />
                                                <div className="item-details">
                                                    <h4>{item.name}</h4>
                                                    <p>Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="item-price">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={() => setStep(3)}
                                    >
                                        Proceed to Payment
                                        <CreditCard size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Payment */}
                        {step === 3 && (
                            <motion.div
                                className="checkout-section card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="section-header">
                                    <CreditCard size={24} />
                                    <h2>Payment</h2>
                                </div>

                                <div className="payment-section">
                                    <p>Click below to proceed with payment via Razorpay</p>
                                    <button
                                        className="btn btn-gold btn-lg"
                                        onClick={handlePayment}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="spinning" size={20} />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Pay ₹{total.toLocaleString()}
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="checkout-sidebar">
                        <div className="card order-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-line">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-line">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            {subtotal > 15000 && (
                                <div className="free-shipping-badge">
                                    ✓ Free shipping applied!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
