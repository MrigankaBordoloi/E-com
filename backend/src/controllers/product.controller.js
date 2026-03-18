const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// Get all products with filters
exports.getProducts = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sort = 'featured',
            search,
            page = 1,
            limit = 12
        } = req.query;

        const offset = (page - 1) * limit;
        const where = { isActive: true };

        // Filter by category
        if (category) {
            const cat = await Category.findOne({ where: { slug: category } });
            if (cat) where.categoryId = cat.id;
        }

        // Filter by price
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = minPrice;
            if (maxPrice) where.price[Op.lte] = maxPrice;
        }

        // Search
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        // Sorting
        let order = [['createdAt', 'DESC']];
        if (sort === 'price-asc') order = [['price', 'ASC']];
        else if (sort === 'price-desc') order = [['price', 'DESC']];
        else if (sort === 'newest') order = [['createdAt', 'DESC']];
        else if (sort === 'featured') order = [['isFeatured', 'DESC'], ['createdAt', 'DESC']];

        const { count, rows: products } = await Product.findAndCountAll({
            where,
            include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
            order,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: {
                products,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    pages: Math.ceil(count / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Category, as: 'category' }]
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: { product }
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};
