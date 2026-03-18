const { CartItem, Product } = require('../models');

// Get user cart
exports.getCart = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            where: { userId: req.user.id },
            include: [{
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'images', 'stockQuantity', 'isActive']
            }]
        });

        res.json({
            success: true,
            data: { cartItems }
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error.message
        });
    }
};

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Check if product exists and is available
        const product = await Product.findByPk(productId);
        if (!product || !product.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or unavailable'
            });
        }

        if (product.stockQuantity < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // Check if item already in cart
        let cartItem = await CartItem.findOne({
            where: { userId: req.user.id, productId }
        });

        if (cartItem) {
            // Update quantity
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create new cart item
            cartItem = await CartItem.create({
                userId: req.user.id,
                productId,
                quantity
            });
        }

        // Fetch updated cart item with product
        cartItem = await CartItem.findByPk(cartItem.id, {
            include: [{ model: Product, as: 'product' }]
        });

        res.status(201).json({
            success: true,
            message: 'Item added to cart',
            data: { cartItem }
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding to cart',
            error: error.message
        });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        const cartItem = await CartItem.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: [{ model: Product, as: 'product' }]
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        if (quantity <= 0) {
            await cartItem.destroy();
            return res.json({
                success: true,
                message: 'Item removed from cart'
            });
        }

        if (cartItem.product.stockQuantity < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({
            success: true,
            message: 'Cart updated',
            data: { cartItem }
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating cart',
            error: error.message
        });
    }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
    try {
        const cartItem = await CartItem.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        await cartItem.destroy();

        res.json({
            success: true,
            message: 'Item removed from cart'
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing from cart',
            error: error.message
        });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        await CartItem.destroy({
            where: { userId: req.user.id }
        });

        res.json({
            success: true,
            message: 'Cart cleared'
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error clearing cart',
            error: error.message
        });
    }
};
