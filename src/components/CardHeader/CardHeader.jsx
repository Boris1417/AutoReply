import styles from "./CardHeader.module.scss";

function CardHeader({ name, employer, url }) {
  let src = employer?.logo_urls?.["90"] ?? '/notFoundVacancy.svg'
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {name}
      </div>
      <div className={styles.image}>
        <a href={url} target="_blank">
          <img src={src} alt="" />
        </a>
      </div>
    </div>
  );
}

export default CardHeader;
