import { useState } from 'react';
import api from '../utils/api';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, category, description, price, discount });
      alert('Product added successfully');
      setName('');
      setCategory('');
      setDescription('');
      setPrice('');
      setDiscount('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        placeholder="Discount"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
}
