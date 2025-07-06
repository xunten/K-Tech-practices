import React from "react";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import styles from "./ProductCard.module.css";

import { CiCirclePlus, CiCircleMinus  } from "react-icons/ci";

interface Props {
  product: Product;
}

const formatPrice = (price: number) =>
  price.toLocaleString("vi-VN") + " ₫";

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, updateQuantity, cart } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => addToCart(product);
  const handleIncrease = () => updateQuantity(product.id, quantity + 1);
  const handleDecrease = () => updateQuantity(product.id, quantity - 1);

  return (
    <div className={styles.card}>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.price}>{formatPrice(product.price)}</div>
      {quantity > 0 ? (
        <div className={styles.controls}>
          <button className={styles.iconBtn} onClick={handleDecrease} disabled={quantity === 0}>
            <CiCircleMinus />
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button className={styles.iconBtn} onClick={handleIncrease}>
            <CiCirclePlus />
          </button>
        </div>
      ) : (
        <button className={styles.addBtn} onClick={handleAdd}>
          <span className={styles.iconBtn}><CiCirclePlus /></span> Thêm vào giỏ hàng
        </button>
      )}

    </div>
  );
};

export default ProductCard;