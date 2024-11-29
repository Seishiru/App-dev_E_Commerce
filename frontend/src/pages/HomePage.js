
import '../css/HomePage.css';
import sale_image from '../assets/sale_image.png';
const HomePage = () => {

    return (
        <div>
            {/* Main Image Section */}
            <div className="main-image-section">
                <div className="margin"></div>
                <div className="image-container">
                    <div className="large-image">
                        <img src={sale_image} alt="Shopee Logo" className="sale_image" />
                    </div>
                </div>
                <div className="margin"></div>
            </div>

            {/* Suggested Products Section */}
            <div className="suggested-products">
                <h2>Suggested products for you</h2>
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
