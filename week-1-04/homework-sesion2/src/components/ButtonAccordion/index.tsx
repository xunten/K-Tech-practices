import { useState } from "react";
import styles from "./ButtonAccordion.module.css";

interface Item {
  id: number;
  title: string;
  content: string;
}

const ButtonAccordion = ({ data }: { data: Item[] }) => {
  const [activeSingle, setActiveSingle] = useState(1);
  const [activeMulti, setActiveMulti] = useState<number[]>([]);

  const toggleSingle = (id: number) => setActiveSingle(id);
  const toggleMulti = (id: number) =>
    setActiveMulti((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const renderBlock = (
    title: string,
    type: "single" | "multi",
    active: number | number[],
    toggle: (id: number) => void
  ) => (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      {data.map((item) => {
        const isActive =
          type === "single"
            ? active === item.id
            : (active as number[]).includes(item.id);

        return (
          <div key={item.id} className={styles.item}>
            <button
              className={`${styles.header} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => toggle(item.id)}
            >
              {item.title}
            </button>
            {isActive && (
              <div className={styles.body}>
                <p>{item.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={styles.grid}>
      {renderBlock("Single Accordions", "single", activeSingle, toggleSingle)}
      {renderBlock("Multi Accordions", "multi", activeMulti, toggleMulti)}
    </div>
  );
};

export default ButtonAccordion;
