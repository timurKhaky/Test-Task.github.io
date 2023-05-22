import { memo } from "react";
import styles from "./Input.module.css";

const Input = memo(function Input({
  type = "tel",
  variant = "standart",

  placeholder,
  onChange,

  value,
  ...props
}) {
  return (
    <input
      type={type}
      className={styles[variant]}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
});
export default Input;
