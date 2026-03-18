import React, { useEffect } from 'react';
import ScrollProgress from '../components/ScrollProgress';
import CustomCursor from '../components/CustomCursor';
import VideoHero from '../components/VideoHero';
import MarqueeTicker from '../components/MarqueeTicker';
import HeritageBento from '../components/HeritageBento';
import HorizontalProducts from '../components/HorizontalProducts';
import StorytellingScroll from '../components/StorytellingScroll';
import StatsSection from '../components/StatsSection';
import TestimonialLookbook from '../components/TestimonialLookbook';
import AtelierInquiry from '../components/AtelierInquiry';
import { products } from '../data/mockData';
import './Home.css';

const Home = () => {
    const featuredProducts = products.filter(p => p.trending || p.new).slice(0, 8);

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => { document.documentElement.style.scrollBehavior = 'auto'; };
    }, []);

    return (
        <div className="home-page">
            {/* Spring-animated page-progress bar at the very top */}
            <ScrollProgress />

            {/* Custom cursor */}
            <CustomCursor />

            {/* Curtain reveal + word-split hero */}
            <VideoHero
                subtitle="Handcrafted Mekhela Chadors woven by master artisans — where centuries of tradition meet timeless luxury."
            />

            {/* Running ticker — dark */}
            <MarqueeTicker />

            {/* 3D-tilt bento grid */}
            <HeritageBento />

            {/* Running ticker — gold inverted */}
            <MarqueeTicker inverted />

            {/* Horizontal drag-to-scroll products */}
            <HorizontalProducts products={featuredProducts} />

            {/* Scroll-pinned storytelling chapters */}
            <StorytellingScroll />

            {/* Animated count-up stats */}
            <StatsSection />

            {/* Testimonials lookbook */}
            <TestimonialLookbook />

            {/* Atelier inquiry form */}
            <AtelierInquiry />
        </div>
    );
};

export default Home;
