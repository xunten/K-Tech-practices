import React from "react";
import { useCart } from "../context/CartContext";
import styles from "./CartDropdown.module.css";

import { IoIosCloseCircleOutline } from "react-icons/io";

const formatPrice = (price: number) =>
  price.toLocaleString("vi-VN") + " ₫";

const CartDropdown: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  if (!visible) return null;

  return (
    <div className={styles.dropdown}>
      <button className={styles.closeBtn} onClick={onClose}><IoIosCloseCircleOutline /></button>
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <div className={styles.empty}>Cart is empty</div>
      ) : (
        <ul className={styles.items}>
          {cart.map((item) => (
            <li key={item.id} className={styles.item}>
              <span>{item.name}</span>
              <span className={styles.item_quatitlyprice}>{item.quantity} × {formatPrice(item.price)}</span>
              <button onClick={() => removeFromCart(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.total}>
        Total: {formatPrice(getTotalPrice())}
      </div>
      <button className={styles.viewCartBtn}>View Cart</button>
    </div>
  );
};

export default CartDropdown;