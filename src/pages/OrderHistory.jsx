import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, TruckIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './OrderHistory.css';

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, shipped, delivered, cancelled

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await api.getOrders();
            setOrders(response.orders || []);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return <CheckCircle className="status-icon success" />;
            case 'cancelled':
                return <XCircle className="status-icon error" />;
            case 'shipped':
                return <TruckIcon className="status-icon info" />;
            default:
                return <Clock className="status-icon pending" />;
        }
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status?.toLowerCase() === filter);

    if (loading) {
        return <LoadingSpinner fullPage text="Loading orders..." />;
    }

    return (
        <div className="orders-page">
            <div className="container container-sm">
                <motion.div
                    className="orders-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Order History</h1>
                    <p>Track and manage your orders</p>
                </motion.div>

                <motion.div
                    className="order-filters card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map(status => (
                        <button
                            key={status}
                            className={`filter-btn ${filter === status ? 'active' : ''}`}
                            onClick={() => setFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {filteredOrders.length === 0 ? (
                    <motion.div
                        className="empty-state card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Package size={64} />
                        <h2>No orders found</h2>
                        <p>Start shopping to see your orders here!</p>
                        <Link to="/catalog">
                            <button className="btn btn-primary">Browse Products</button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="orders-list">
                        {filteredOrders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                className="order-card card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Order #{order.id}</h3>
                                        <p className="order-date">
                                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="order-status">
                                        {getStatusIcon(order.status)}
                                        <span className={`status-text ${order.status?.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items?.map(item => (
                                        <div key={item.id} className="order-item">
                                            <img src={item.image || item.product?.image} alt={item.name || item.product?.name} />
                                            <div className="item-info">
                                                <h4>{item.name || item.product?.name}</h4>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                            <div className="item-price">₹{((item.price || item.product?.price) * item.quantity).toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <span>Total</span>
                                        <strong>₹{order.totalAmount?.toLocaleString()}</strong>
                                    </div>
                                    <Link to={`/orders/${order.id}`}>
                                        <button className="btn btn-outline btn-sm">View Details</button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
