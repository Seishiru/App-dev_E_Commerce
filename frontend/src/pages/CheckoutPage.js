import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Checkout.css";
import CheckoutItem from "../components/CheckoutItem";
import { jwtDecode } from "jwt-decode";

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee] = useState(60.00); // Fixed shipping fee for now
  const [addresses, setAddresses] = useState([]);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartAndAddress = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Fetch cart items
        const cartResponse = await fetch(`http://localhost:5000/api/cart/${userId}`);
        if (cartResponse.ok) {
          const data = await cartResponse.json();
          setCartItems(data.cartItems);
          
          // Calculate total price
          const subtotal = data.cartItems.reduce((sum, item) => {
            return sum + (parseFloat(item.price) * item.quantity);
          }, 0);
          setTotalPrice(subtotal);
        }

        // Fetch user's default address - Added Authorization header
        const addressResponse = await fetch(
          `http://localhost:5000/api/${userId}/addresses`, 
          {
            headers: {
              'Authorization': `Bearer ${token}` // Add the token to the request
            }
          }
        );
        
        if (addressResponse.ok) {
          const addressData = await addressResponse.json();
          setAddresses(addressData);
          setAddress(addressData[0]); // Set first address as default since the API returns an array
        } else {
          console.error("Error fetching addresses:", await addressResponse.text());
        }
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      }
    };

    fetchCartAndAddress();
  }, [navigate]);

  const handlePlaceOrder = () => {
    setShowConfirmation(true);
    // Hide the confirmation after 3 seconds and redirect
    setTimeout(() => {
      setShowConfirmation(false);
      navigate('/purchases');
    }, 3000);
  };

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setShowAddressDropdown(false);
  };

  return (
    <div>
      <div className="section-container">
        <h2 className="section-title">Delivery Address</h2>
        <hr />
        {address ? (
          <div className="address-container">
            <div>
              <div className="receiver-name">{address.receiver}</div>
              <div>{address.phoneNumber}</div>
            </div>
            <div className="address-contents">
              {address.address}
            </div>
            <div className="address-button-container">
              <button onClick={() => setShowAddressDropdown(!showAddressDropdown)}>
                Change
              </button>
              {showAddressDropdown && (
                <div className="address-dropdown">
                  {addresses.length > 1 ? (
                    addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="address-option"
                        onClick={() => handleAddressSelect(addr)}
                      >
                        <div className="receiver-name">{addr.receiver}</div>
                        <div>{addr.phoneNumber}</div>
                        <div>{addr.address}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-addresses-message">
                      No other addresses available
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>No delivery address found. Please add an address.</div>
        )}
      </div>

      <div className="section-container">
        <h2 className="section-title">Items Ordered</h2>
        <hr />
        <div className="checkout-list">
          {cartItems.map(item => (
            <CheckoutItem key={item.cart_item_id} item={item} />
          ))}
        </div>
        <hr />
        <div className="total-container">
          <div className="total-label">TOTAL</div>
          <div className="total-price">₱{totalPrice.toFixed(2)}</div>
        </div>
      </div>

      <div className="section-container">
        <h2 className="section-title">Order Summary</h2>
        <hr />
        <div className="order-summary-row">
          <div>Merchandise Subtotal</div>
          <div>₱{totalPrice.toFixed(2)}</div>
        </div>
        <div className="order-summary-row">
          <div>Shipping Subtotal</div>
          <div>₱{shippingFee.toFixed(2)}</div>
        </div>
        <div className="order-summary-row">
          <div>Voucher Discount</div>
          <div>₱0.00</div>
        </div>
        <hr />
        <div className="total-container">
          <div className="total-label">TOTAL</div>
          <div className="total-price">₱{(totalPrice + shippingFee).toFixed(2)}</div>
        </div>
        <div className="order-button-container">
          <button className="order-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for your purchase.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
