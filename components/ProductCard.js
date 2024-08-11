export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">Category: {product.category}</p>
      <p className="text-lg font-bold mt-2">Price: ${product.price}</p>
     
    </div>
  );
}