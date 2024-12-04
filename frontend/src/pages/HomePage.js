import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';
import saleImage1 from '../assets/homepage/hp1.avif';
import saleImage2 from '../assets/homepage/hp2.avif';
import saleImage3 from '../assets/homepage/hp3.avif';
import saleImage4 from '../assets/homepage/hp4.avif';
import saleImage5 from '../assets/homepage/hp5.avif';
import saleImage6 from '../assets/homepage/hp6.avif';
import saleImage7 from '../assets/homepage/hp7.avif';
import saleImage8 from '../assets/homepage/hp8.avif';
import saleImage9 from '../assets/homepage/hp9.avif';
import saleImage10 from '../assets/homepage/hp10.avif';

const HomePage = () => {
    // Create an array of all sale images
    const saleImages = [
        saleImage1,
        saleImage2,
        saleImage3,
        saleImage4,
        saleImage5,
        saleImage6,
        saleImage7,
        saleImage8,
        saleImage9,
        saleImage10
    ];

    // State to track the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % saleImages.length);
        }, 2000);
    
        return () => clearInterval(interval);
    }, [saleImages.length]);
    
    useEffect(() => {
        // Add the sliding class on image change
        const imageElement = document.querySelector('.sale_image');
        if (imageElement) {
            imageElement.classList.add('slide-in');
    
            // Remove the class after animation ends
            const removeClass = () => imageElement.classList.remove('slide-in');
            imageElement.addEventListener('animationend', removeClass);
    
            // Cleanup listener
            return () => imageElement.removeEventListener('animationend', removeClass);
        }
    }, [currentImageIndex]);
    

    return (
        <div>
            {/* Main Image Section */}
            <div className="section-container">
                <div className="margin"></div>
                <div className="image-container">
                    <div className="large-image">
                        {/* Dynamically update the `src` based on currentImageIndex */}
                        <img src={saleImages[currentImageIndex]} alt="Shopee Logo" className="sale_image" />
                    </div>
                </div>
                <div className="margin"></div>
            </div>

            {/* Suggested Products Section */}
            <div className="section-container suggested-products">
                <h2 className="section-title">Suggested products for you</h2>
                <div className="product-grid">
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 1 description</div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 2 description</div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 3 description</div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 4 description</div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 5 description</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
