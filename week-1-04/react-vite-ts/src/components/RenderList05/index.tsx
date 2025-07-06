import RenderListItem05 from './RenderListItem05';
import styles from './RenderList05.module.css';

interface Props {
  id: number;
  image: string;
  title: string;
  shop: string;
  rating: number;
  sold: number;
  newPrice: string;
  oldPrice?: string;
  discount?: string;
}

const RenderList05 = ({ data }: { data: Props[] }) => {
  return (
    <div className={styles.containerList}>
      {data.length > 0 &&
      data.map((item) => (
        <RenderListItem05 key={item.id} {...item} />
      ))}
    </div>
  );
};

export default RenderList05;