import styles from "./Input.module.scss";

function Input({ disabled = false, size, ...props }) {
  const style = [styles.input, styles[size]];
  
  return (
    <textarea
      disabled={disabled}
      type="text"
      className={style.join(" ")}
      {...props}
    />
  );
}

export default Input;
