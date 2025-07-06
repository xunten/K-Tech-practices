import RenderListItem01 from "./RenderListItem01";
import styles from "./RenderList01.module.css";

interface Props {
    id: number;
    thumbnail: string;
    title: string;
    time: string;
}

const RenderList01 = ({ data }: {data: Props[]}) => {
  return (
    <div className={styles.containerList}>
      {data.length > 0 && 
      data.map((tintuc) => {
        return (
          <RenderListItem01 
          key={tintuc.id} 
          thumbnail={tintuc.thumbnail} 
          title={tintuc.title} 
          time={tintuc.time} />
        );
      })}
    </div>
);
};

export default RenderList01;
