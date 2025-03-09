import styles from "./CardSearch.module.scss";
import CardSortButton, {
  buttonOptions,
} from "../CardSortButton/CardSortButton";
import CardRefreshButtons from "../CardRefreshButtons/CardRefreshButtons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CardSearch = ({ refreshList, vacancies, setSorted, sorted, loading }) => {
  const [sortDate, setSortDate] = useState(buttonOptions.default);
  const [sortDist, setSortDist] = useState(buttonOptions.default);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!loading) {
    sortQueryFunction();
    }
  }, [query, sortDist, sortDate, loading]);

  useEffect(() => {
    if (!loading) {
      sortByOptions();
    }
  }, [sortDist, sortDate, loading]);


  useEffect(() => {
    dispatch({ type: "CURRENT_CARD", currentCard: {} });
  }, [query, sortDist, sortDate]);
  const dispatch = useDispatch();

  // Меняет Query на актуальную строку с инпута
  const querySort = (event) => {
    setQuery(event.target.value);
  };

  // Сортирует vacancies по Query и устанавлиет его в sorted
  const sortQueryFunction = () => {
    const sortedVacancy = vacancies.filter(
      (v) =>
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.employer.name.toLowerCase().includes(query.toLowerCase())
    );
    setSorted(sortedVacancy);
  };

  // Меняет состояние кнопки Даты при клике и меняет состояние смежной кнопки на дефолт
  const sortDateFunction = () => {
    setSortDist(buttonOptions.default);
    if (
      sortDate === buttonOptions.default ||
      sortDate === buttonOptions.activeReverse
    ) {
      setSortDate(buttonOptions.active);
    } else {
      setSortDate(buttonOptions.activeReverse);
    }
  };

  // Сортирует по дате и меняет sorted
  const sortByDate = () => {
    if (sortDate === buttonOptions.active) {
      setSorted([
        ...sorted
          .sort(
            (a, b) => new Date(a["published_at"]) - new Date(b["published_at"])
          )
          .reverse(),
      ]);
    } else if (sortDate === buttonOptions.activeReverse) {
      setSorted([
        ...sorted.sort(
          (a, b) => new Date(a["published_at"]) - new Date(b["published_at"])
        ),
      ]);
    }
  };

  // Меняет состояние кнопки Удаленки при клике и меняет состояние смежной кнопки на дефолт
  const sortDistFunction = () => {
    setSortDate(buttonOptions.default);
    if (
      sortDist === buttonOptions.default ||
      sortDist === buttonOptions.activeReverse
    ) {
      setSortDist(buttonOptions.active);
    } else {
      setSortDist(buttonOptions.activeReverse);
    }
  };

  // Сортирует по удаленке и меняет sorted
  const sortByDist = () => {
    const workFormatDist = "удалённо";
    const workFormatHybrid = "гибрид";
    const workFormatOffice = "работодателя"; // на месте работодателя
    const includesFormat = (format, vacancy) => {
      return vacancy["work_format"]?.[0]?.["name"]
        .toLowerCase()
        .includes(format);
    };

    const sortWithDist = sorted.filter((v) =>
      includesFormat(workFormatDist, v)
    );

    const sortHybrid = sorted.filter((v) =>
      includesFormat(workFormatHybrid, v)
    );

    const sortNoDist = sorted.filter((v) =>
      includesFormat(workFormatOffice, v)
    );

    const sortNoType = sorted.filter((v) => !v?.["work_format"]?.[0]?.["name"]);
    if (
      sortDist === buttonOptions.default ||
      sortDist === buttonOptions.active
    ) {
      setSorted([...sortWithDist, ...sortHybrid, ...sortNoDist, ...sortNoType]);
    } else {
      setSorted([...sortNoDist, ...sortHybrid, ...sortWithDist, ...sortNoType]);
    }
  };

  // Чекает состояние кнопок и если не равна дефолтку вызвает вызвает функцию sortBy**
  const sortByOptions = () => {
    if (sortDate !== buttonOptions.default) {
      sortByDate();
    }

    if (sortDist !== buttonOptions.default) {
      sortByDist();
    }
  };

  // Ждёт refreshList и вызывает sortByOptions
  const refreshAndSort = async () => {
    await refreshList();
    sortQueryFunction();
    sortByOptions();
  };

  // Устанавлиет состояние кнопок на дефолт, обновляет sorted до vacancies, query на пустую строку
  const getAllVacancy = () => {
    setSortDate(buttonOptions.default);
    setSortDist(buttonOptions.default);
    setQuery("");
    setSorted(vacancies);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.icon}>
          <img src="/search.svg" alt="" />
        </div>
        <input
          className={styles.input}
          value={query}
          placeholder={"Поиск"}
          onChange={querySort}
        />
        <div className={styles.countVacancy}>{sorted.length || 0}</div>
      </div>
      <div className={styles.sort}>
        <div className={styles.buttonsArea}>
          Сортировка по
          <div>
            <CardSortButton
              handleClickFn={sortDateFunction}
              option={sortDate}
              size="maxInFlex"
            >
              Новизне
            </CardSortButton>
          </div>
          <div>
            <CardSortButton handleClickFn={sortDistFunction} option={sortDist}>
              Наличию удалёнки
            </CardSortButton>
          </div>
          <div>
            <CardSortButton handleClickFn={getAllVacancy} option={"default"}>
              Все
            </CardSortButton>
          </div>
        </div>
        <CardRefreshButtons refreshList={refreshAndSort} />
      </div>
    </div>
  );
};
export default CardSearch;
