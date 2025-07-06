import styles from './RenderList04.module.css';
 
interface Props {
  image: string;
  title: string;
  newPrice: string;
  oldPrice?: string;
  discount?: string;
}
 
 const RenderListItem04 = ({ image, title, newPrice, oldPrice, discount }: Props) => {
   return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        {discount && <span className={styles.discount}>{discount}</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.prices}>
        <span className={styles.newPrice}>{newPrice}</span>
        {oldPrice && <span className={styles.oldPrice}>{oldPrice}</span>}
      </div>
    </div>
  );
 }
    export default RenderListItem04