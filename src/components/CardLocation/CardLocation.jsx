import styles from "./CardLocation.module.scss";

function CardLocation({ address, employerName }) {
  const { city } = address ?? {};

  return (
    <div className={styles.location}>
      <div>{employerName}</div>
      <div className={styles.city}>{city ?? "Не указан"}</div>
    </div>
  );
}

export default CardLocation;
