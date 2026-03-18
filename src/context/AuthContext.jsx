import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('vaastra-user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('vaastra-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('vaastra-user');
        }
    }, [user]);

    // Auto-login on app load if token exists
    useEffect(() => {
        const autoLogin = async () => {
            if (user?.token) {
                try {
                    const response = await api.getCurrentUser();
                    setUser({
                        ...response.user,
                        token: user.token
                    });
                } catch (error) {
                    console.error('Auto-login failed:', error);
                    // Token might be expired, clear user
                    setUser(null);
                }
            }
        };

        autoLogin();
    }, []); // Only run on mount

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await api.login(email, password);

            const userData = {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                role: response.user.role,
                token: response.token
            };

            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name, email, password) => {
        try {
            setLoading(true);
            const response = await api.register(name, email, password);

            const userData = {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                role: response.user.role,
                token: response.token
            };

            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data) => {
        try {
            setLoading(true);
            const response = await api.updateProfile(data);

            setUser(prev => ({
                ...prev,
                ...response.user
            }));

            return response.user;
        } catch (error) {
            console.error('Update profile error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
