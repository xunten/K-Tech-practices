import { useCart } from "./CartProvider";

export default function CartList() {
  const { cart } = useCart();
  return (
    <div className="p-6 bg-white shadow rounded-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>

      <ul className="space-y-3">
        {cart.length === 0 ? (
          <li className="text-gray-500">Chưa có sản phẩm nào trong giỏ.</li>
        ) : (
          cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between border-b pb-2 text-gray-800"
            >
              <span>{item.name}</span>
              <span>{item.price}₫</span>
            </li>
          ))
        )}
      </ul>
    </div>

  )
}