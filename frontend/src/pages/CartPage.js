import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/CartPage.css";
import CartItem from "../components/CartItem";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // To track total cart price
  const [cartMessage, setCartMessage] = useState(""); // For any feedback messages
  const [checkedItems, setCheckedItems] = useState(new Set());

  // Fetch cart items from the server when the component loads
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart/1");
        if (!response.ok) {
          throw new Error("Error fetching cart items");
        }
        const data = await response.json();
        setCartItems(data.cartItems);
        calculateTotalPrice(data.cartItems, checkedItems); // Ensure both arguments are passed here
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartMessage("Failed to load cart.");
      }
    };
  
    fetchCart();
  }, []);

  // Calculate the total price of the items in the cart
  const calculateTotalPrice = (items, checkedItems) => {
    const total = items.reduce((sum, item) => {
      if (checkedItems.has(item.cart_item_id)) {
        const price = parseFloat(item.price);
        sum += price * item.quantity;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  };

  const handleCheckboxChange = (cart_item_id) => {
    const updatedCheckedItems = new Set(checkedItems);
    if (updatedCheckedItems.has(cart_item_id)) {
      updatedCheckedItems.delete(cart_item_id);
    } else {
      updatedCheckedItems.add(cart_item_id);
    }
    setCheckedItems(updatedCheckedItems);
    calculateTotalPrice(cartItems, updatedCheckedItems); // Recalculate with new checked state
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
        const updatedCart = cartItems.map((item) =>
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

  const handleIncrease = (cart_item_id) => {
    const item = cartItems.find((item) => item.cart_item_id === cart_item_id);
    if (item) {
      // Optimistically update UI before database update
      const updatedCart = cartItems.map((item) =>
        item.cart_item_id === cart_item_id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart); // Recalculate total price immediately
  
      // Update the quantity in the database
      updateQuantity(cart_item_id, item.quantity + 1);
    }
  };
  

  const handleDecrease = (cart_item_id) => {
    const item = cartItems.find((item) => item.cart_item_id === cart_item_id);
    if (item && item.quantity > 1) {
      // Optimistically update UI before database update
      const updatedCart = cartItems.map((item) =>
        item.cart_item_id === cart_item_id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart); // Recalculate total price immediately
  
      // Update the quantity in the database
      updateQuantity(cart_item_id, item.quantity - 1);
    }
  };
  
  const handleDelete = async (cart_item_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/delete/${cart_item_id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        const updatedCart = cartItems.filter((item) => item.cart_item_id !== cart_item_id);
        setCartItems(updatedCart);
        calculateTotalPrice(updatedCart); // Recalculate total price
      } else {
        console.error("Failed to delete cart item");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
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
              onDelete={handleDelete}
              onCheckboxChange={handleCheckboxChange}
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
