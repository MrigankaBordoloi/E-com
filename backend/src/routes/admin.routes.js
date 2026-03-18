const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { auth, adminAuth } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(auth);
router.use(adminAuth);

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Products
router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);
router.put('/products/:id/stock', adminController.updateStock);

// Orders
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// Inventory
router.get('/inventory', adminController.getInventoryReport);

module.exports = router;
