const { Order, OrderItem, Product, CartItem } = require('../models');
const { sequelize } = require('../config/database');

// Create order
exports.createOrder = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { items, shippingAddress, billingAddress, paymentMethod, razorpayOrderId } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No items in order'
            });
        }

        // Calculate totals
        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findByPk(item.productId);

            if (!product || !product.isActive) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: `Product ${item.productId} not available`
                });
            }

            if (product.stockQuantity < item.quantity) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            const itemSubtotal = parseFloat(product.price) * item.quantity;
            subtotal += itemSubtotal;

            orderItems.push({
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                quantity: item.quantity,
                subtotal: itemSubtotal
            });

            // Reduce stock
            product.stockQuantity -= item.quantity;
            await product.save({ transaction: t });
        }

        // Calculate shipping and tax
        const shippingCost = subtotal >= parseFloat(process.env.FREE_SHIPPING_THRESHOLD || 15000) ? 0 : 500;
        const taxAmount = Math.round(subtotal * parseFloat(process.env.TAX_RATE || 0.18) * 100) / 100;
        const totalAmount = subtotal + shippingCost + taxAmount;

        // Generate order number
        const orderNumber = `VAS${Date.now()}`;

        // Create order
        const order = await Order.create({
            userId: req.user.id,
            orderNumber,
            subtotal,
            shippingCost,
            taxAmount,
            totalAmount,
            shippingAddress,
            billingAddress: billingAddress || shippingAddress,
            paymentMethod,
            razorpayOrderId,
            status: 'pending',
            paymentStatus: 'pending'
        }, { transaction: t });

        // Create order items
        for (const item of orderItems) {
            await OrderItem.create({
                ...item,
                orderId: order.id
            }, { transaction: t });
        }

        // Clear user's cart
        await CartItem.destroy({
            where: { userId: req.user.id },
            transaction: t
        });

        await t.commit();

        // Fetch complete order
        const completeOrder = await Order.findByPk(order.id, {
            include: [{ model: OrderItem, as: 'items' }]
        });

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: { order: completeOrder }
        });
    } catch (error) {
        await t.rollback();
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{ model: OrderItem, as: 'items' }],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: { orders }
        });
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// Get single order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: [{ model: OrderItem, as: 'items' }]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: { order }
        });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const order = await Order.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: [{ model: OrderItem, as: 'items' }]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (!['pending', 'confirmed'].includes(order.status)) {
            return res.status(400).json({
                success: false,
                message: 'Order cannot be cancelled at this stage'
            });
        }

        // Restore stock
        for (const item of order.items) {
            const product = await Product.findByPk(item.productId);
            if (product) {
                product.stockQuantity += item.quantity;
                await product.save({ transaction: t });
            }
        }

        order.status = 'cancelled';
        await order.save({ transaction: t });

        await t.commit();

        res.json({
            success: true,
            message: 'Order cancelled successfully',
            data: { order }
        });
    } catch (error) {
        await t.rollback();
        console.error('Cancel order error:', error);
        res.status(500).json({
            success: false,
            message: 'Error cancelling order',
            error: error.message
        });
    }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { razorpayPaymentId, status } = req.body;

        const order = await Order.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.razorpayPaymentId = razorpayPaymentId;
        order.paymentStatus = status;

        if (status === 'completed') {
            order.status = 'confirmed';
        }

        await order.save();

        res.json({
            success: true,
            message: 'Payment status updated',
            data: { order }
        });
    } catch (error) {
        console.error('Update payment status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating payment status',
            error: error.message
        });
    }
};
