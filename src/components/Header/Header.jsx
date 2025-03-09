import styles from "./Header.module.scss";
import { getUserAuthorizationCode } from "../../api/authorize.js";
import Button from "../UI/Button/Button.jsx";

function Header() {
  const disabled = localStorage.getItem("userAccessToken") ? true : false;
  
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.companyName}>
          <img src="/jobCompany.svg" alt="" />
          <div>AutoReply</div>
        </div>
        <div className={styles.button}>
          <Button
            handleClick={getUserAuthorizationCode}
            color="purple"
            size="content"
            disabled={disabled}
          >
            Авторизация
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
