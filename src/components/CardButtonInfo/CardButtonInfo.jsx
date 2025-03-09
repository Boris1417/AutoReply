import { useState } from "react";
import styles from "./CardButtonInfo.module.scss";
import Button from "../UI/Button/Button";

function CardButtonInfo({ description }) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prevState) => !prevState);
  };
  return (
    <div className={styles.button}>
      <Button
        handleClick={handleClick}
        color="lightBlue"
        size="maxWidth"
        hasActive={click}
      >
        <div>Информация</div>
        {click ? (
          <img src="/arrowDown.svg" alt="" />
        ) : (
          <img src="/arrowUp.svg" alt="" />
        )}
      </Button>
      {click && <div className={styles.description}>{description}</div>}
    </div>
  );
}
export default CardButtonInfo;
