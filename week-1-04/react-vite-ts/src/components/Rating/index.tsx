import { useState } from 'react';
import styles from './Rating.module.css';

interface IRating {
  id: number;
  label: string;
}

interface RatingItemProps {
  label: string;
  isActive: boolean;
  onHandleClick: () => void;
}

const RatingItem = ({ label, isActive, onHandleClick }: RatingItemProps) => {
  return (
    <span onClick={onHandleClick} className={`${styles.rating_value} ${isActive ? styles.active : ''}`}>
      {label}
    </span>
  );
};

const Rating = ({ data }: { data: IRating[] }) => {
  const [rating, setRating] = useState(3); // mặc định 3 sao

  const currentLabel = data.find(item => item.id === rating)?.label || '';

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Chọn đánh giá của bạn</span>
      <div className={styles.stars}>
        {data.map((item) => (
          <RatingItem
            key={item.id}
            label="★"
            isActive={rating >= item.id}
            onHandleClick={() => setRating(item.id)}
          />
        ))}
      </div>
      <span className={styles.result}>{currentLabel}</span>
    </div>
  );
};

export default Rating;
