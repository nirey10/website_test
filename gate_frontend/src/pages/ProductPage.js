// src/pages/ProductsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsPage({ token }) {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/products', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
    };

    const handleAddProduct = async () => {
        await axios.post('http://localhost:5000/products', newProduct, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchProducts();
    };

    const handleDeleteProduct = async (id) => {
        await axios.delete(`http://localhost:5000/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchProducts();
    };

    return (
        <div className="container">
            <header>
                <h1>Manage Products</h1>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                />
                <button onClick={handleAddProduct}>Add Product</button>
            </div>
        </div>
    );
}

export default ProductsPage;
