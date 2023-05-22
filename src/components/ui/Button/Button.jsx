import { memo } from "react";
import styles from "./Button.module.css";

const Button = memo(function Button({
  type = "button",
  variant = "standart",
  children,
  onClick,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${styles.main} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled ? "disabled" : ""}
      {...props}
    >
      {children}
    </button>
  );
});
export default Button;
