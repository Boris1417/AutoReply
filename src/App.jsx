import "./styles/App.css";
import CardList from "./components/CardList/CardList.jsx";
import AccompanyingLetter from "./components/AccompanyingLetter/AccompanyingLetter.jsx";
import Header from "./components/Header/Header.jsx";
import SendButtons from "./components/SendButtons/SendButtons.jsx";
import { useEffect } from "react";
import { getUserAccessToken } from "./api/authorize.js";
import { getResumes } from "./api/index.js";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userAuthCode = params.get("code");
    const saveTokens = async () => {
      const { access_token, refresh_token } =
        (await getUserAccessToken(userAuthCode)) ?? {};

      localStorage.setItem("userAccessToken", access_token);
      localStorage.setItem("userRefreshToken", refresh_token);
      window.location.replace("/");
    };

    const saveResumeId = async () => {
      const resumes = (await getResumes()) ?? {};
      localStorage.setItem("userResumeId", resumes[0].id);
    };

    if (userAuthCode) {
      saveTokens();
    }

    if (localStorage.getItem("userAccessToken")) {
      saveResumeId();
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <CardList />
        <AccompanyingLetter />
        <SendButtons />
      </div>
    </>
  );
}

export default App;
