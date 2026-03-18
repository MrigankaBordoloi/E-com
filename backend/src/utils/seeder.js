const { Category, Product, User } = require('../models');
const { sequelize } = require('../config/database');

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Clear existing data
        await sequelize.sync({ force: true });
        console.log('📊 Database cleared and synced');

        // Create categories
        const categories = await Category.bulkCreate([
            {
                name: 'Muga Silk',
                slug: 'muga-silk',
                description: 'Luxurious golden silk from Assam, known for its natural sheen',
                imageUrl: 'https://images.unsplash.com/photo-1610976052996-369a1b79b72f?w=800',
                displayOrder: 1
            },
            {
                name: 'Endi Silk',
                slug: 'endi-silk',
                description: 'Traditional Assamese silk, soft and warm',
                imageUrl: 'https://images.unsplash.com/photo-1612992840876-5c8b6b4a4f6d?w=800',
                displayOrder: 2
            },
            {
                name: 'Banarasi Silk',
                slug: 'banarasi-silk',
                description: 'Opulent silk sarees from Varanasi with intricate brocade work',
                imageUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800',
                displayOrder: 3
            },
            {
                name: 'Kanjivaram Silk',
                slug: 'kanjivaram-silk',
                description: 'South Indian silk sarees with rich colors and heavy borders',
                imageUrl: 'https://images.unsplash.com/photo-1610701596077-c6b57c4c8b6d?w=800',
                displayOrder: 4
            },
            {
                name: 'Chanderi Silk',
                slug: 'chanderi-silk',
                description: 'Lightweight silk sarees with a sheer texture',
                imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
                displayOrder: 5
            },
            {
                name: 'Patola Silk',
                slug: 'patola-silk',
                description: 'Double ikat sarees from Gujarat with geometric patterns',
                imageUrl: 'https://images.unsplash.com/photo-1612992851287-2f0a3a7e38d2?w=800',
                displayOrder: 6
            }
        ]);

        console.log(`✅ Created ${categories.length} categories`);

        // Create products
        const products = await Product.bulkCreate([
            {
                name: 'Golden Muga Silk Saree',
                slug: 'golden-muga-silk-saree',
                description: 'Exquisite golden Muga silk saree from Assam. Hand-woven by master artisans, featuring traditional motifs and natural golden sheen',
                categoryId: categories[0].id,
                price: 24999,
                originalPrice: 34999,
                stockQuantity: 15,
                sku: 'MGA-001',
                isFeatured: true,
                isTrending: true,
                rating: 4.8,
                reviewCount: 24,
                colors: ['Golden', 'Natural Gold'],
                images: [
                    'https://images.unsplash.com/photo-1610976052996-369a1b79b72f?w=1200',
                    'https://images.unsplash.com/photo-1617736879383-d0e99bdf7c5a?w=1200',
                    'https://images.unsplash.com/photo-1610701596077-c6b57c4c8b6d?w=1200'
                ]
            },
            {
                name: 'Ivory Endi Silk Saree',
                slug: 'ivory-endi-silk-saree',
                description: 'Traditional Assamese Endi silk saree in ivory white. Known for its warmth and durability with subtle traditional patterns',
                categoryId: categories[1].id,
                price: 18999,
                originalPrice: 22999,
                stockQuantity: 20,
                sku: 'EDI-001',
                isNew: true,
                isFeatured: true,
                rating: 4.6,
                reviewCount: 18,
                colors: ['Ivory', 'Off-White'],
                images: [
                    'https://images.unsplash.com/photo-1612992840876-5c8b6b4a4f6d?w=1200',
                    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200'
                ]
            },
            {
                name: 'Royal Banarasi Silk Saree',
                slug: 'royal-banarasi-silk-saree',
                description: 'Luxurious Banarasi silk saree with intricate zari work. Perfect for weddings and grand celebrations',
                categoryId: categories[2].id,
                price: 32999,
                originalPrice: 45999,
                stockQuantity: 8,
                sku: 'BAN-001',
                isTrending: true,
                rating: 4.9,
                reviewCount: 42,
                colors: ['Royal Blue', 'Gold'],
                images: [
                    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200',
                    'https://images.unsplash.com/photo-1617736879383-d0e99bdf7c5a?w=1200'
                ]
            },
            {
                name: 'Peacock Blue Kanjivaram Saree',
                slug: 'peacock-blue-kanjivaram-saree',
                description: 'Stunning Kanjivaram silk saree in peacock blue with contrasting gold border. Temple designs woven in pure zari',
                categoryId: categories[3].id,
                price: 28999,
                originalPrice: 38999,
                stockQuantity: 12,
                sku: 'KAN-001',
                isFeatured: true,
                rating: 4.7,
                reviewCount: 31,
                colors: ['Peacock Blue', 'Gold'],
                images: [
                    'https://images.unsplash.com/photo-1610701596077-c6b57c4c8b6d?w=1200',
                    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200'
                ]
            },
            {
                name: 'Blush Pink Chanderi Saree',
                slug: 'blush-pink-chanderi-saree',
                description: 'Elegant Chanderi silk saree in soft blush pink. Lightweight and perfect for day events with delicate silver zari',
                categoryId: categories[4].id,
                price: 15999,
                originalPrice: 19999,
                stockQuantity: 25,
                sku: 'CHN-001',
                isNew: true,
                rating: 4.5,
                reviewCount: 15,
                colors: ['Blush Pink', 'Rose'],
                images: [
                    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200',
                    'https://images.unsplash.com/photo-1617736879383-d0e99bdf7c5a?w=1200'
                ]
            },
            {
                name: 'Emerald Green Patola Saree',
                slug: 'emerald-green-patola-saree',
                description: 'Authentic double ikat Patola saree from Gujarat. Geometric patterns in emerald green with traditional craftsmanship',
                categoryId: categories[5].id,
                price: 45999,
                originalPrice: 59999,
                stockQuantity: 5,
                sku: 'PAT-001',
                isTrending: true,
                isFeatured: true,
                rating: 5.0,
                reviewCount: 8,
                colors: ['Emerald Green', 'Gold'],
                images: [
                    'https://images.unsplash.com/photo-1612992851287-2f0a3a7e38d2?w=1200',
                    'https://images.unsplash.com/photo-1610976052996-369a1b79b72f?w=1200'
                ]
            },
            {
                name: 'Mauve Purple Tussar Silk Saree',
                slug: 'mauve-purple-tussar-silk-saree',
                description: 'Natural Tussar silk saree in elegant mauve purple. Textured fabric with natural gold sheen and hand-painted motifs',
                categoryId: categories[0].id,
                price: 19999,
                originalPrice: 24999,
                stockQuantity: 18,
                sku: 'TUS-001',
                isNew: true,
                rating: 4.6,
                reviewCount: 12,
                colors: ['Mauve', 'Purple'],
                images: [
                    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200'
                ]
            },
            {
                name: 'Coral Pink Bandhani Saree',
                slug: 'coral-pink-bandhani-saree',
                description: 'Vibrant Bandhani tie-dye saree in coral pink. Traditional Rajasthani craftsmanship with intricate dot patterns',
                categoryId: categories[2].id,
                price: 12999,
                originalPrice: 16999,
                stockQuantity: 30,
                sku: 'BND-001',
                rating: 4.4,
                reviewCount: 22,
                colors: ['Coral', 'Pink'],
                images: [
                    'https://images.unsplash.com/photo-1617736879383-d0e99bdf7c5a?w=1200',
                    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200'
                ]
            }
        ]);

        console.log(`✅ Created ${products.length} products`);

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin',
            email: 'admin@vaastra.com',
            password: 'admin123', // Will be hashed automatically
            isAdmin: true,
            emailVerified: true
        });

        console.log('✅ Created admin user (admin@vaastra.com / admin123)');

        // Create demo user
        const demoUser = await User.create({
            name: 'Demo User',
            email: 'demo@vaastra.com',
            password: 'demo123',
            phone: '+91 9876543210',
            emailVerified: true
        });

        console.log('✅ Created demo user (demo@vaastra.com / demo123)');

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Login credentials:');
        console.log('   Admin: admin@vaastra.com / admin123');
        console.log('   Demo:  demo@vaastra.com / demo123\n');

    } catch (error) {
        console.error('❌ Seeding error:', error);
    } finally {
        process.exit();
    }
};

seedDatabase();
