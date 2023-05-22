import { useState } from "react";
import styles from "./UserItem.module.css";

export default function UserItem({ item, onChange }) {
  const [description, name, value] = item;
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    return (
      <div className={styles.item}>
        <div> {item[0]}:</div>
        <input
          value={value}
          name={name}
          onChange={onChange}
          onBlur={() => setIsActive(false)}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setIsActive(true)} className={styles.item}>
      <span>{description}:</span> <span>{value}</span>
    </div>
  );
}
