import { useEffect, useState } from "react";
import AccompanyingLetterTextButton from "../AccompanyingLetterTextButton/AccompanyingLetterTextButton";
import styles from "./AccompanyingLetter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button/Button";
import Modal from "../Modal/Modal";
import Input from "../UI/Input/Input";

function AccompanyingLetter() {
  const [activeModal, setActiveModal] = useState(false);
  const [activateButtonModal, setActivateButtonModal] = useState("");

  const [textButtons, setTextButton] = useState([]);
  const [textStart, setTextStart] = useState(
    `Здравствуйте!\nМеня зовут Борис. Я классный frontend-разработчик, потому что:\n`
  );
  const [textEnd, setTextEnd] = useState(
    `Мой ТГ: @sdy1417.\nБуду очень рад познакомиться!`
  );
  const [value, setValue] = useState(`${textStart}${textEnd}`);

  const dispatch = useDispatch();

  const message = useSelector((state) => state.message);
  const card = useSelector((state) => state.currentCard);

  const description =
    useSelector((state) => state.fullCurrentCard.description) || "";

  useEffect(() => {
    setValue(`${textStart}${textButtons.join("")}${textEnd}`);
  }, [textStart, textButtons, textEnd]);

  useEffect(() => {
    dispatch({ type: "MESSAGE", message: value });
  }, [value]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    
    const initialButtonsText = [
      `проактивен и горю своей работой`,
      `беру на себя ответственность`,
      `умею декомпозировать задачи, предвидеть проблемы и вносить вклад в совершенствование процессов`,
      `готов быть наставником для коллег`,
      `эффективно общаюсь с командой разработки и смежниками`,
      `люблю талантливых и оригинальных людей и стремлюсь к высоким результатам`,
      `не боюсь трудностей`,
    ];

    const possibleWordsForButtons = [
      "React",
      "Vue",
      "Vite",
      "Webpach",
      "scss",
      "Redux",
    ];

    for (let possibleWordForButton of possibleWordsForButtons) {
      if (
        description
          .toLowerCase()
          .includes(possibleWordForButton.toLowerCase())
      ) {
        initialButtonsText.unshift(
          `Имею опыт работы с ${possibleWordForButton}`
        );
      }
    }

    setButtons(initialButtonsText);
    setTextButton([]);
  }, [description]);

  const handleClick = (event) => {
    const button = event.target.innerText;
    const text = `- ${button}\n`;

    if (textButtons.includes(text)) {
      const updatedText = textButtons.filter((item) => item !== text);
      setTextButton(updatedText);
    } else {
      setTextButton((prev) => [...prev, text]);
    }
  };

  const handleClickChanger = (event) => {
    setActiveModal(true);
    setActivateButtonModal(event.target.innerText);
  };

  return (
    <>
      <div className={styles.container}>
        <Modal
          active={activeModal}
          setActive={setActiveModal}
          activateButtonModal={activateButtonModal}
          setTextStart={setTextStart}
          setTextEnd={setTextEnd}
          textStart={textStart}
          textEnd={textEnd}
        />
        <div className={styles.changeButons}>
          <Button handleClick={handleClickChanger} size="maxWidth">
            Изменение приветствия
          </Button>
          <Button handleClick={handleClickChanger} size="maxWidth">
            Изменение прощания
          </Button>
        </div>
        <Input disabled={true} value={value} size="middle" />

        <ul className={styles.buttonsList}>
          {buttons.map((buttonText, id) => {
            return (
              <div onClick={handleClick} key={id}>
                <AccompanyingLetterTextButton description={description} >
                  {buttonText}
                </AccompanyingLetterTextButton>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default AccompanyingLetter;
