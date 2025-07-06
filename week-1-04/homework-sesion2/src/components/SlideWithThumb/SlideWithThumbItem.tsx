import React from "react";
import styles from "./SlideWithThumbItem.module.css";

interface Props {
  src: string;
  alt: string;
  active: boolean;
}

const SlideWithThumbItem = ({ src, alt, active }: Props) => (
  <div className={`${styles.thumb} ${active ? styles.active : ""}`}>
    <img src={src} alt={alt} className={styles.imgThumb} />
  </div>
);

export default SlideWithThumbItem;
