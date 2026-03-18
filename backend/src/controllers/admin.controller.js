const { Product, Category, Order, OrderItem, User } = require('../models');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize');

// Dashboard stats
exports.getDashboardStats = async (req, res) => {
    try {
        // Total revenue
        const totalRevenue = await Order.sum('totalAmount', {
            where: { paymentStatus: 'completed' }
        });

        // Total orders
        const totalOrders = await Order.count();

        // Pending orders
        const pendingOrders = await Order.count({
            where: { status: 'pending' }
        });

        // Low stock products
        const lowStockProducts = await Product.count({
            where: { stockQuantity: { [Op.lte]: 10 }, isActive: true }
        });

        // Recent orders
        const recentOrders = await Order.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [
                { model: User, as: 'user', attributes: ['name', 'email'] },
                { model: OrderItem, as: 'items' }
            ]
        });

        // Monthly revenue (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyRevenue = await Order.findAll({
            attributes: [
                [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'month'],
                [sequelize.fn('SUM', sequelize.col('totalAmount')), 'revenue']
            ],
            where: {
                createdAt: { [Op.gte]: sixMonthsAgo },
                paymentStatus: 'completed'
            },
            group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m')],
            order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'ASC']],
            raw: true
        });

        res.json({
            success: true,
            data: {
                stats: {
                    totalRevenue: totalRevenue || 0,
                    totalOrders,
                    pendingOrders,
                    lowStockProducts
                },
                recentOrders,
                monthlyRevenue
            }
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats',
            error: error.message
        });
    }
};

// Get all products (admin)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Category, as: 'category' }],
            order: [['createdAt', 'DESC']],
            paranoid: false // Include soft-deleted
        });

        res.json({
            success: true,
            data: { products }
        });
    } catch (error) {
        console.error('Get all products error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: { product }
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.update(req.body);

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: { product }
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.destroy(); // Soft delete

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};

// Update stock
exports.updateStock = async (req, res) => {
    try {
        const { stockQuantity } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        product.stockQuantity = stockQuantity;
        await product.save();

        res.json({
            success: true,
            message: 'Stock updated successfully',
            data: { product }
        });
    } catch (error) {
        console.error('Update stock error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating stock',
            error: error.message
        });
    }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        const where = {};

        if (status) where.status = status;

        const { count, rows: orders } = await Order.findAndCountAll({
            where,
            include: [
                { model: User, as: 'user', attributes: ['name', 'email', 'phone'] },
                { model: OrderItem, as: 'items' }
            ],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: {
                orders,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    pages: Math.ceil(count / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.status = status;
        await order.save();

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: { order }
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
};

// Get inventory report
exports.getInventoryReport = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { isActive: true },
            include: [{ model: Category, as: 'category' }],
            order: [['stockQuantity', 'ASC']]
        });

        const lowStock = products.filter(p => p.stockQuantity <= 10);
        const outOfStock = products.filter(p => p.stockQuantity === 0);
        const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.price) * p.stockQuantity), 0);

        res.json({
            success: true,
            data: {
                products,
                summary: {
                    totalProducts: products.length,
                    lowStockCount: lowStock.length,
                    outOfStockCount: outOfStock.length,
                    totalInventoryValue: totalValue
                }
            }
        });
    } catch (error) {
        console.error('Get inventory report error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching inventory report',
            error: error.message
        });
    }
};
