// Centralized API utility for Vaastra backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Get auth token from localStorage
    getAuthToken() {
        const user = localStorage.getItem('vaastra-user');
        if (user) {
            const parsed = JSON.parse(user);
            return parsed.token;
        }
        return null;
    }

    // Build headers with auth token
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        const token = this.getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    // Generic request handler
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                ...this.getHeaders(),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, {
            method: 'GET',
        });
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // PUT request
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        });
    }

    // ===== AUTH ENDPOINTS =====
    async login(email, password) {
        return this.post('/auth/login', { email, password });
    }

    async register(name, email, password) {
        return this.post('/auth/register', { name, email, password });
    }

    async getCurrentUser() {
        return this.get('/auth/user');
    }

    async updateProfile(data) {
        return this.put('/auth/profile', data);
    }

    // ===== PRODUCTS ENDPOINTS =====
    async getProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.get(`/products${queryString ? `?${queryString}` : ''}`);
    }

    async getProduct(id) {
        return this.get(`/products/${id}`);
    }

    // ===== CATEGORIES ENDPOINTS =====
    async getCategories() {
        return this.get('/categories');
    }

    // ===== CART ENDPOINTS =====
    async getCart() {
        return this.get('/cart');
    }

    async addToCart(productId, quantity = 1) {
        return this.post('/cart', { productId, quantity });
    }

    async updateCartItem(id, quantity) {
        return this.put(`/cart/${id}`, { quantity });
    }

    async removeFromCart(id) {
        return this.delete(`/cart/${id}`);
    }

    // ===== ORDERS ENDPOINTS =====
    async createOrder(orderData) {
        return this.post('/orders', orderData);
    }

    async getOrders() {
        return this.get('/orders');
    }

    async getOrder(id) {
        return this.get(`/orders/${id}`);
    }

    async cancelOrder(id) {
        return this.put(`/orders/${id}/cancel`);
    }

    async updatePayment(id, paymentData) {
        return this.put(`/orders/${id}/payment`, paymentData);
    }

    // ===== ADMIN ENDPOINTS =====
    async getDashboard() {
        return this.get('/admin/dashboard');
    }

    async getAdminProducts() {
        return this.get('/admin/products');
    }

    async createProduct(productData) {
        return this.post('/admin/products', productData);
    }

    async updateProduct(id, productData) {
        return this.put(`/admin/products/${id}`, productData);
    }

    async deleteProduct(id) {
        return this.delete(`/admin/products/${id}`);
    }

    async updateStock(id, stock) {
        return this.put(`/admin/products/${id}/stock`, { stock });
    }

    async getAdminOrders() {
        return this.get('/admin/orders');
    }

    async updateOrderStatus(id, status) {
        return this.put(`/admin/orders/${id}/status`, { status });
    }

    async getInventory() {
        return this.get('/admin/inventory');
    }
}

// Export singleton instance
const api = new ApiService();
export default api;
