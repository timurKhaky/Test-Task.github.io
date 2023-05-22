import Input from "../ui/Input/Input";
import styles from "./SearchBar.module.css";
import search from "../../assets/icons/search.svg";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { useState } from "react";
export default function SearchBar({ subject, changeSubject }) {
  const [value, setValue] = useState(subject);

  const debouncedValueLogging = useDebounce(changeSubject, 300);

  const handleChange = (e) => {
    setValue(e.target.value);
    debouncedValueLogging(e.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <Input value={value} onChange={handleChange} />
        <div className={styles.icon}>
          <img src={search} alt="search" width="51" height="41" />
        </div>
      </div>
    </>
  );
}
