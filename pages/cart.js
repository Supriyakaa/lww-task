import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md max-w-3xl w-full p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-lg font-bold mt-2 text-gray-800">Price: ${item.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
