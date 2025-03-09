import { useDispatch, useSelector } from "react-redux";
import styles from "./SendButtons.module.scss";
import { applyForVacancy } from "../../api/index.js";
import Button from "../UI/Button/Button.jsx";
import { useState } from "react";
import { Loader } from "../Loader/Loader.jsx";
import { getNumberActiveResponce } from "../../api/index.js";
import { getInfoOfVacancy } from "../../api/index.js";

function SendButtons() {
  const [loading, setLoading] = useState("");

  const dispatch = useDispatch();

  const fullCurrentCard = useSelector((state) => state.fullCurrentCard);
  const { id: currentVacancyId } = useSelector((state) => state.currentCard);
  const message = useSelector((state) => state.message);
  const sortedVacancies = useSelector((state) => state.sorted);
  const applyVacancies = useSelector((state) => state.respondedVacancies);

  const buttonOneDisabled =
    currentVacancyId && fullCurrentCard?.relations?.length == 0 ? false : true;
  const buttonTwoDisabled = sortedVacancies.length ? false : true;

  const handleClickSendOne = async () => {
    if (fullCurrentCard?.relations?.length == 0) {
      setLoading(true);
      await applyForVacancy({
        vacancyId: currentVacancyId,
        message: message,
      });
      const respondedVacancies = await getNumberActiveResponce();
      dispatch({
        type: "RESPONDED_VACANCIES",
        respondedVacancies: respondedVacancies?.found || 0,
      });
      setLoading(false);
    }
  };

  const handleClickSendAll = async () => {
    setLoading(true);

    for (let vacancy of sortedVacancies) {
      const fullCurrentCard = await getInfoOfVacancy(vacancy.id);
      if (fullCurrentCard?.relations?.length == 0) {
        await applyForVacancy({
          vacancyId: vacancy.id,
          message: message,
        });
      }
    }

    const respondedVacancies = await getNumberActiveResponce();
    dispatch({
      type: "RESPONDED_VACANCIES",
      respondedVacancies: respondedVacancies?.found || 0,
    });
    setLoading(false);
  };

  return (
    <div className={styles.right}>
      <Button
        color="orange"
        size="maxWidth"
        form="big"
        handleClick={handleClickSendOne}
        disabled={buttonOneDisabled}
      >
        Отправка текущей вакансии
      </Button>
      <Button
        color="orange"
        size="maxWidth"
        form="big"
        disabled={buttonTwoDisabled}
        handleClick={handleClickSendAll}
      >
        Отправка всех вакансии
      </Button>
      <div className={styles.count}>
        Количество отправленных вакансий:
        {applyVacancies}
      </div>
      {loading ? <Loader /> : null}
    </div>
  );
}
export default SendButtons;
