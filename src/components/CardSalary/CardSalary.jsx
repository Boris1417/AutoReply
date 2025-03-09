import styles from "./CardSalary.module.scss";

function CardSalary({ salary, workFormat }) {
  let from = null;
  let to = null;
  let currency = null;
  salary && ({ from, to, currency } = salary);
  const format = workFormat?.[0]?.["name"] || "не указан";
  const formatColor = { color: "black" };
  switch (format) {
    case "На месте работодателя":
      formatColor.color = "red";
      break;
    case "Гибрид":
      formatColor.color = "orange";
      break;
    case "Удалённо":
      formatColor.color = "green";
      break;
  }

  return (
    <>
      <div className={styles.salary}>
        {from && <div> от {from} </div>}
        {to && <div> до {to} </div>}
        <div>{currency}</div>
      </div>
      <div className={styles.format} style={formatColor}>
        Формат работы: {format.toLowerCase()}
      </div>
    </>
  );
}

export default CardSalary;
