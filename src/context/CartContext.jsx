import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('vaastra-cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('vaastra-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Fetch cart from backend when user logs in
    useEffect(() => {
        const fetchCart = async () => {
            if (isAuthenticated) {
                try {
                    setLoading(true);
                    const response = await api.getCart();
                    setCartItems(response.items || []);
                } catch (error) {
                    console.error('Failed to fetch cart:', error);
                    // Keep local cart on error
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCart();
    }, [isAuthenticated]);

    const addToCart = async (product, quantity = 1) => {
        // Optimistically update UI
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);

            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { ...product, quantity }];
        });

        // Sync with backend if authenticated
        if (isAuthenticated) {
            try {
                await api.addToCart(product.id, quantity);
            } catch (error) {
                console.error('Failed to add to cart on backend:', error);
                // Revert on error could be added here
            }
        }
    };

    const removeFromCart = async (productId) => {
        // Optimistically update UI
        setCartItems(prev => prev.filter(item => item.id !== productId));

        // Sync with backend if authenticated
        if (isAuthenticated) {
            try {
                const item = cartItems.find(i => i.id === productId);
                if (item?.cartId) {
                    await api.removeFromCart(item.cartId);
                }
            } catch (error) {
                console.error('Failed to remove from cart on backend:', error);
            }
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        // Optimistically update UI
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );

        // Sync with backend if authenticated
        if (isAuthenticated) {
            try {
                const item = cartItems.find(i => i.id === productId);
                if (item?.cartId) {
                    await api.updateCartItem(item.cartId, quantity);
                }
            } catch (error) {
                console.error('Failed to update cart on backend:', error);
            }
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        loading
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
