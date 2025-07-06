import styles from './RenderList01.module.css'

interface Props  {
    thumbnail: string;
    title: string;
    time: string;
}

const RenderListItem01 = ({ 
  thumbnail,
  title, 
  time 
}: Props) => {
  return (
        <div className={styles.container}>
          <div className={styles.thumbnail}>
            <img src={thumbnail} className={styles.image} alt="" />
          </div>
          <h3 className={styles.title}>
            {title}
          </h3>
          <div className={styles.extra}>
            <span className={styles.time}>
              {time}
            </span>
          </div>
        </div>
  )
}

export default RenderListItem01