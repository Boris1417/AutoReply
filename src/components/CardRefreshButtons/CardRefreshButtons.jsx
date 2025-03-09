import styles from "./CardRefreshButtons.module.scss";
import { memo } from "react";
import { useRef, useState } from "react";
const CardRefreshButtons = memo(({ refreshList }) => {
  
  const [refresh, setRefresh] = useState(false);
  const intervalRef = useRef(0);

  const toggleRefresh = () => {
    setRefresh((refresh) => {
      if (!refresh) {
        intervalRef.current = setInterval(refreshList, 2000);
      } else {
        clearInterval(intervalRef.current);
      }
      return !refresh;
    });
  };

  return (
    <div className={styles.containter}>
      <button className={styles.refresh} onClick={refreshList}>
        <img src="/oneRefresh.svg" alt="" />
      </button>
      <button className={styles.refresh} onClick={toggleRefresh}>
        {refresh ? (
          <img src="/periodRefreshOn.svg" alt="" />
        ) : (
          <img src="/periodRefreshOff.svg" alt="" />
        )}
      </button>
    </div>
  );
});

export default CardRefreshButtons;
