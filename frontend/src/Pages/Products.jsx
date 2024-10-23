import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import "../Styles/Products.css"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const response = await fetch('http://localhost:5000/products');
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;