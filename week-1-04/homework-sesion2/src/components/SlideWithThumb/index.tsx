import React, { useState } from "react";
import SlideWithThumbItem from "./SlideWithThumbItem";
import styles from "./SlideWithThumbItem.module.css";

interface Props {
  id: number;
  src: string;
  alt: string;
}

const SlideWithThumb = ({ images }: { images: Props[] }) => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.container}>
        <button onClick={prev} className={styles.button}>
          {"<"}
        </button>
        {images.length > 0 && (
          <div style={{ margin: "30px 0" }}>
            <img
              src={images[current].src}
              alt={images[current].alt}
              style={{ width: 300, height: 300, objectFit: "contain" }}
            />
          </div>
        )}
        <button onClick={next} className={styles.button}>
          {">"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 30,
          gap: 20,
        }}
      >
        {images.length > 0 &&
          images.map((image, idx) => {
            return (
              <div key={image.id} onClick={() => setCurrent(idx)}>
                <SlideWithThumbItem
                  src={image.src}
                  alt={image.alt}
                  active={idx === current}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SlideWithThumb;
