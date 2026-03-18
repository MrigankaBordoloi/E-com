import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import './Catalog.css';

const Catalog = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 50000]);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p =>
                p.category.toLowerCase().includes(selectedCategory.toLowerCase())
            );
        }

        // Filter by price range
        filtered = filtered.filter(p =>
            p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered = [...filtered].sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered = [...filtered].sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered = [...filtered].sort((a, b) => b.id - a.id);
                break;
            default:
                filtered = [...filtered].sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
        }

        return filtered;
    }, [selectedCategory, sortBy, priceRange]);

    return (
        <div className="catalog-page">
            <motion.div
                className="catalog-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container">
                    <motion.h1
                        className="catalog-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Heritage Collections
                    </motion.h1>
                    <motion.p
                        className="catalog-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Handwoven Mekhela Chadors by master artisans of Assam
                    </motion.p>
                </div>
            </motion.div>

            <div className="catalog-content container">
                <div className="catalog-layout">
                    {/* Sidebar Filters */}
                    <motion.aside
                        className="catalog-sidebar"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="filter-section">
                            <h3 className="filter-title">
                                <Filter size={20} />
                                Filters
                            </h3>

                            {/* Category Filter */}
                            <div className="filter-group">
                                <h4 className="filter-group-title">Category</h4>
                                <div className="filter-options">
                                    <label className="filter-option">
                                        <input
                                            type="radio"
                                            name="category"
                                            value="all"
                                            checked={selectedCategory === 'all'}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        />
                                        <span>All Sarees</span>
                                    </label>
                                    {categories.map(cat => (
                                        <label key={cat.id} className="filter-option">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.name.toLowerCase()}
                                                checked={selectedCategory === cat.name.toLowerCase()}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            />
                                            <span>{cat.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="filter-group">
                                <h4 className="filter-group-title">Price Range</h4>
                                <div className="price-range-labels">
                                    <span>₹{priceRange[0].toLocaleString()}</span>
                                    <span>₹{priceRange[1].toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="price-slider"
                                />
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <div className="catalog-main">
                        {/* Toolbar */}
                        <div className="catalog-toolbar">
                            <div className="results-count">
                                <strong>{filteredProducts.length}</strong> sarees found
                            </div>

                            <div className="sort-controls">
                                <SlidersHorizontal size={18} />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="sort-select"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="catalog-products-grid">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} delay={index * 0.05} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <p>No sarees found matching your criteria.</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setPriceRange([0, 50000]);
                                    }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
