import styles from "./CardList.module.scss";
import { getVacancies } from "../../api/index.js";
import { useCallback, useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import CardSearch from "../CardSearch/CardSearch.jsx";
import { Loader } from "../Loader/Loader.jsx";
import { useDispatch} from "react-redux";
import { getNumberActiveResponce } from "../../api/index.js";

function CardList() {
  const [vacancies, setVacancies] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    dispatch({ type: "SORTED_VACANCIES", sorted: sorted });
  }, [sorted]);

  const refreshList = useCallback(async () => {
    setLoading(true);
    await getVacancies().then((vacancies) => {
      setVacancies(vacancies);
      setSorted(vacancies);
      setLoading(false);
    });
    const respondedVacancies = await getNumberActiveResponce();
    dispatch({
      type: "RESPONDED_VACANCIES",
      respondedVacancies: respondedVacancies?.found || 0,
    });
  }, []);

  return (
    <div className={styles.left}>
      <CardSearch
        refreshList={refreshList}
        vacancies={vacancies}
        setSorted={setSorted}
        sorted={sorted}
        loading={loading}
      />
      <ul className={styles.ul}>
        {!loading ? (
          sorted.length > 0 ? (
            sorted.map((card) => <Card card={card} key={card?.id} />)
          ) : (
            <div className={styles.notVacancy}>Не найдено</div>
          )
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
}
export default CardList;
