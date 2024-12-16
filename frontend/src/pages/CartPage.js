import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/CartPage.css";
import empty from "../assets/empty_image.png"; // Default empty cart image

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // To track total cart price
  const [cartMessage, setCartMessage] = useState(""); // For any feedback messages

  // Fetch cart items from the server when the component loads
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart/1"); // Assuming user ID is 1 for this example
        if (!response.ok) {
          throw new Error("Error fetching cart items");
        }
        const data = await response.json();
        setCartItems(data.cartItems); // Assuming response has a 'cartItems' array
        calculateTotalPrice(data.cartItems); // Calculate total price
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartMessage("Failed to load cart.");
      }
    };

    fetchCart();
  }, []);

  // Calculate the total price of the items in the cart
  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      // Ensure price is a number
      const price = parseFloat(item.price);
      return sum + price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  // Update quantity of a cart item
  const updateQuantity = async (cart_item_id, newQuantity) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/update-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_item_id, quantity: newQuantity }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map(item =>
          item.cart_item_id === cart_item_id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        calculateTotalPrice(updatedCart); // Recalculate total price after update
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (!cartItems.length) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <img src={empty} alt="Empty cart" />
      </div>
    );
  }

  return (
    <div>
      <div className="section-container cart-columns">
        <div></div>
        <div>
          <h3 className="cart-column-name">Product</h3>
        </div>
        <div>
          <h3 className="cart-column-name">Unit Price</h3>
        </div>
        <div>
          <h3 className="cart-column-name">Quantity</h3>
        </div>
        <div>
          <h3 className="cart-column-name">Total Price</h3>
        </div>
        <div></div>
      </div>

      <div className="section-container cart-container">
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.cart_item_id} className="cart-item">
              {/* Product image */}
              <div className="cart-column">
                {item.image_url ? (
                  <img
                    src={`http://localhost:5000/uploads/${item.image_url}`}
                    alt={item.product_name}
                    className="cart-item-image"
                  />
                ) : (
                  <img src={empty} alt="No Image" className="cart-item-image" />
                )}
              </div>
              <div className="cart-column">{item.product_name}</div>
              <div className="cart-column">₱{parseFloat(item.price).toFixed(2)}</div>
              <div className="cart-column">
                <button onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-column">₱{(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-summary">
        <h4>Total: ₱{totalPrice.toFixed(2)}</h4>
      </div>

      <div className="checkout-container">
        <Link to="/checkout">
          <button className="checkout-button">Checkout</button>
        </Link>
      </div>

      {cartMessage && <div className="cart-message">{cartMessage}</div>}
    </div>
  );
}

export default CartPage;
