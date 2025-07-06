import React from "react";
import { useCart } from "../context/CartContext";
import styles from "./CartIcon.module.css";

interface Props {
  onClick: () => void;
}

const CartIcon: React.FC<Props> = ({ onClick }) => {
  const { getTotalItems } = useCart();
  return (
    <div className={styles.cartIcon}>
      <div className={styles.icon} onClick={onClick}>🛒 
      <span className={styles.title}>Your cart</span>
      <div className={styles.quantityContainer}>
        <span className={styles.quantity }>({getTotalItems()})</span>
        <span className={styles.title}> products</span>
      </div>      
      </div>
    </div>
  );
};

export default CartIcon;