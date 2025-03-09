import styles from "./Button.module.scss";

function Button({
  children,
  handleClick,
  color = "green",
  hasActive = false,
  size,
  disabled,
  form,
}) {
  const style = [styles.button, styles[color], styles[size]];

  hasActive ? style.push(styles.hasActive) : null;
  form ? style.push(styles.big) : null;

  return (
    <button
      className={style.join(" ")}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Button;
