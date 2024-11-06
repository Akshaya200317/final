import React, { useState, useEffect } from 'react';
import "../Styles/Cart.css";
import Navbar from '../Components/Navbar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    const response = await fetch('https://final-be6i.onrender.com/cart');
    const data = await response.json();
    setCartItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (id) => {
    const response = await fetch(`https://final-be6i.onrender.com/cart/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setCartItems(cartItems.filter(item => item._id !== id));
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    const updatedItem = { quantity: newQuantity };

    const response = await fetch(`https://final-be6i.onrender.com/cart/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    });

    if (response.ok) {
      setCartItems(cartItems.map(item => 
        item._id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handlePlaceOrder = async () => {
    const response = await fetch('https://final-be6i.onrender.com/cart', {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Order placed successfully');
      setCartItems([]);
    } 
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <div className="cart-page">
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map(item => (
                <li key={item._id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}>-</button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item._id, e.target.value)}
                      />
                      <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="delete-item" onClick={() => handleDeleteItem(item._id)}>×</button>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <div className="coupon-section">
                <input type="text" placeholder="Coupon code" />
                <button className="apply-coupon">Apply Coupon</button>
              </div>

              <div className="cart-totals">
                <h3>Cart Totals</h3>
                <div className="totals-details">
                  <p><strong>Subtotal:</strong> ${calculateTotalPrice()}</p>
                  <p><strong>Shipping:</strong> Enter your address to view shipping options.</p>
                  <button className="calculate-shipping">Calculate Shipping</button>
                </div>
                <div className="total-amount">
                  <h3>Total: ${calculateTotalPrice()}</h3>
                </div>
                <button className="checkout-button" onClick={handlePlaceOrder}>Proceed to Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Cart;
