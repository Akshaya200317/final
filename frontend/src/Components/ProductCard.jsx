import React from 'react';
import './ProductCard.css';

const ProductItem = ({ product }) => {

  const addToCart = async () => {
    const cartItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    const response = await fetch('http://localhost:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    });

    if (response.ok) {
      alert(`${product.title} has been added to the cart!`);
    } else {
      alert('Failed to add product.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-details">
        <span className="product-price">${product.price}</span>
        <button className="add-cart-btn" onClick={addToCart}>
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
