import React, { useState } from 'react';
import '../Styles/Admin.css'
import Navbar from '../Components/Navbar';

const Admin = () => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result }); 
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct), 
    });

    if (response.ok) {
      alert('Product added successfully!');
      setNewProduct({ title: '', description: '', price: '', image: '' });
    }
  };

  return (
    <div>
      <Navbar/>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProduct.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
