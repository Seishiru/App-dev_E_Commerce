import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/CartPage.css";
import empty from "../assets/empty_image.png"; // Default empty cart image
import CartItem from "../components/CartItem";

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
        // Use functional state update to ensure we are working with the latest cartItems
        setCartItems((prevItems) => {
          const updatedCart = prevItems.map((item) =>
            item.cart_item_id === cart_item_id ? { ...item, quantity: newQuantity } : item
          );
          calculateTotalPrice(updatedCart); // Recalculate total price after update
          return updatedCart;
        });
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleIncrease = (cart_item_id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.cart_item_id === cart_item_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      calculateTotalPrice(updatedCart); // Recalculate total price after update
      return updatedCart;
    });
  };

  const handleDecrease = (cart_item_id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.cart_item_id === cart_item_id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      calculateTotalPrice(updatedCart); // Recalculate total price after update
      return updatedCart;
    });
  };

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
        {cartItems.length? <div className="cart-list">
          {cartItems.map((item) => (
            <CartItem
              key={item.cart_item_id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          ))}
        </div>: <div className="empty-cart-message">Your cart is empty</div>}
      </div>

      <div className="section-container cart-summary">
        <h3 className="cart-column-name">Total</h3>
        <h3 className="cart-column-name">₱{totalPrice.toFixed(2)}</h3>
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
