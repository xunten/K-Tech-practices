import { useState } from 'react';
import styles from './ButtonTabs.module.css';

interface TabItem {
  id: number;
  title: string;
  content: string;
}

const ButtonTabs = ({ data }: { data: TabItem[] }) => {
  const [activeFilled, setActiveFilled] = useState(1);
  const [activeUnderline, setActiveUnderline] = useState(1);

  const contentFilled = data.find((tab) => tab.id === activeFilled)?.content;
  const contentUnderline = data.find((tab) => tab.id === activeUnderline)?.content;

  return (
    <div className={styles.wrapper}>

      <div className={styles.tabList_filled}>
        {data.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${styles.filled} ${
              activeFilled === tab.id ? styles.active : ''
            }`}
            onClick={() => setActiveFilled(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        <p className={styles.tabText}>{contentFilled}</p>
      </div>

      <div className={styles.tabList_underline}>
        {data.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${styles.underline} ${
              activeUnderline === tab.id ? styles.active : ''
            }`}
            onClick={() => setActiveUnderline(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        <p className={styles.tabText}>{contentUnderline}</p>
      </div>
    </div>
  );
};

export default ButtonTabs;
