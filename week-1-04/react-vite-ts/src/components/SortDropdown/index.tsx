import { useState } from "react";
import styles from "./SortDropdown.module.css";
import { IoClose } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";

interface Option {
  id: number;
  label: string;
}

const SortDropdown = ({ data }: { data: Option[] }) => {
  const [options] = useState<Option[]>(data);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {selected ? selected.label : "Sắp xếp"} <FaCaretDown />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <IoClose />
          </button>
          {options.length > 0 &&
            options.map((option) => {
              return (
                <div
                  key={option.id}
                  className={styles.option}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              );
              // <div
              //   key={option.id}
              //   className={styles.option}
              //   onClick={() => handleSelect(option)}
              // >
              //   {option.label}
              // </div>
            })}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
