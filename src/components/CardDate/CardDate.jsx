import styles from "./CardDate.module.scss";

function CardDate({created_at}) {
  const date = new Date(created_at).toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  
  const time = new Date(created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })
  
  return (
    <div className={styles.date}>
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
}

export default CardDate;
