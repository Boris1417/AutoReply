import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import Button from "../../components/UI/Button/Button.jsx";
import Input from "../../components/UI/Input/Input.jsx";
import { useEffect, useState } from "react";
function Modal({
  active,
  setActive,
  activateButtonModal,
  setTextStart,
  setTextEnd,
  textStart,
  textEnd,
}) {
  const [value, setValue] = useState("");
  const style = active ? `${styles.modal} ${styles.active}` : `${styles.modal}`;
  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };
  const handleClickButton = () => {
    if (activateButtonModal === "Изменение прощания") {
      setTextEnd(value);
    } else if (activateButtonModal === "Изменение приветствия") {
      setTextStart(value);
    }
    setActive(false);
  };
  useEffect(() => {
    setValue(
      activateButtonModal === "Изменение приветствия" ? textStart : textEnd
    );
  }, [activateButtonModal]);
  return createPortal(
    <div className={style}>
      <div
        className={styles.modalContent}
        onClick={(event) => event.stopPropagation()}
      >
        <Input value={value} onChange={handleChangeInput} size="maxInFlex" />

        <Button handleClick={handleClickButton} color="green" size="maxWidth">
          Подтвердить
        </Button>

        <Button handleClick={() => setActive(false)} color="green" size="maxWidth">
          Отмена
        </Button>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
