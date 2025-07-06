import styles from './RenderList04.module.css';
import RenderListItem04 from './RenderListItem04';

interface Props {
  id: number;
  image: string;
  title: string;
  newPrice: string;
  oldPrice?: string;
  discount?: string;
}

const RenderList04 = ({ data }: {data: Props[]}) => {
  return (
    <div className={styles.containerList}>
      {data.length > 0 && 
      data.map((item) => (
        <RenderListItem04
          key={item.id}
          {...item}
          // image={item.image}
          // title={item.title}
          // newPrice={item.newPrice}
          // oldPrice={item.oldPrice}
          // discount={item.discount}
        />
      ))}
    </div>
  )
}

export default RenderList04