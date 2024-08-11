"use client"
import { useState, useEffect } from "react";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../hooks/useAuth";
import AddProductForm from "../components/AddProductForm";
import { Router, useRouter } from "next/router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { user, isSeller } = useAuth();
  const router = useRouter();
  console.log({ user });
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      router.replace("/login");
      return;
    }
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/products?search=${search}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (isSeller) {
      alert("Sellers cannot add products to the cart.");
      return;
    }

    try {
      await api.post("/cart/add", { userId: user.id, productId, quantity: 1 });
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
  
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {isSeller && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
          <AddProductForm />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            {!isSeller && (
              <button
                onClick={() => handleAddToCart(product.id)}
                className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
