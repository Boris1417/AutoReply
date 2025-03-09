import styles from "./card.module.scss";
import CardButtonInfo from "../CardButtonInfo/CardButtonInfo.jsx";
import CardDate from "../CardDate/CardDate.jsx";
import CardHeader from "../CardHeader/CardHeader.jsx";
import CardLocation from "../CardLocation/CardLocation.jsx";
import CardSalary from "../CardSalary/CardSalary.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getInfoOfVacancy } from "../../api/index.js";
import { useState } from "react";

function Card({ card }) {
  const {
    id,
    name,
    salary,
    employer,
    address,
    created_at,
    alternate_url,
    work_format = null,
  } = card;
  const { name: employerName } = employer;

  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const currentCard = useSelector((state) => state.currentCard);

  const isFocused = currentCard?.id === id;

  const focusCard = isFocused
    ? `${styles.card} ${styles.focuscard}`
    : styles.card;

  const handleClick = async () => {
    dispatch({ type: "CURRENT_CARD", currentCard: card });

    const fullCard = await getInfoOfVacancy(id);
    setDescription(fullCard.description);

    dispatch({ type: "FULL_CURRENT_CARD", fullCurrentCard: fullCard });
  };
  // регулярное преобразует текст с тегами в просто текст
  return (
    <li onClick={handleClick} className={focusCard}>
      <CardHeader name={name} employer={employer} url={alternate_url} />
      <CardSalary salary={salary} workFormat={work_format} />
      <CardLocation address={address} employerName={employerName} />
      <CardDate created_at={created_at} />
      <CardButtonInfo description={description.replace(/<[^>]+>/g, "")} />
    </li>
  );
}

export default Card;
