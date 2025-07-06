import styles from './RenderList05.module.css';

interface Props {
  image: string;
  title: string;
  shop: string;
  rating: number;
  sold: number;
  newPrice: string;
  oldPrice?: string;
  discount?: string;
}

const RenderListItem05 = ({ image, title, shop, rating, sold, newPrice, oldPrice, discount }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        {discount && <span className={styles.discount}>{discount}</span>}
      </div>
      <div className={styles.shop}>{shop}</div>
      <div className={styles.prices}>
        <span className={styles.newPrice}>{newPrice}</span>
        {oldPrice && <span className={styles.oldPrice}>{oldPrice}</span>}
        <span className={styles.sale}>18% off</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.rating}>
        <div className={styles.stars}>
          {"★".repeat(rating)}{"☆".repeat(5 - rating)}
        </div>
        <div className={styles.sold}>Sold: {sold}</div>
      </div>
    </div>
  );
};

export default RenderListItem05;