import { useCart, type CartItem } from './CartProvider';

const products: CartItem[] = [
  { id: 1, name: "Sản phẩm 1", price: 100 },
  { id: 2, name: "Sản phẩm 2", price: 200 },
  { id: 3, name: "Sản phẩm 3", price: 300 },
  { id: 4, name: "Sản phẩm 4", price: 400 },
];

export default function ProductList() {
  const { addToCart } = useCart();
  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map((p) => (
          <li
            key={p.id}
            className="border rounded p-4 flex flex-col justify-between shadow-sm"
          >
            <div>
              <p className="text-lg font-semibold">{p.name}</p>
              <p className="text-gray-600">{p.price}₫</p>
            </div>
            <button
              onClick={() => addToCart(p)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>

  )
}