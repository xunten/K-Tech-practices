import { useState } from 'react';
import styles from './ViewedProducts.module.css';
import { IoClose } from 'react-icons/io5';

interface Product {
  id: number;
  name: string;
  image: string;
  price?: string;
  isDiscontinued?: boolean;
}

const ViewedProducts = ({ data } : { data: Product[] }) => {
  const [products, setProducts] = useState<Product[]>(data);

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const clearAll = () => {
    setProducts([]);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Sản phẩm đã xem</h2>
        <button onClick={clearAll}>Xóa lịch sử</button>
      </div>

      <div className={styles.productList}>
        {products.map(product => (
          <div className={styles.card} key={product.id}>
            <img src={product.image} alt={product.name} className={styles.thumb} />
            <div className={styles.info}>
              <p className={styles.name}>{product.name}</p>
              {product.isDiscontinued ? (
                <p className={styles.discontinued}>Ngừng kinh doanh</p>
              ) : (
                <p className={styles.price}>{product.price}</p>
              )}
            </div>
            <button className={styles.remove} onClick={() => removeProduct(product.id)}>
              <IoClose />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewedProducts;
