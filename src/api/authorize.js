import axios from "axios";

// получаем accessToken юзера
export const getUserAccessToken = async (userAuthCode) => {
  const response = await axios.post(
    "https://hh.ru/oauth/token",
    {
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      code: userAuthCode,
      grant_type: "authorization_code",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "myAPP",
      },
    }
  );

  return response.data;
};

// перебрасывает на сайт hh c формой логина
// возвращает обратно и указывает в ссылке auth code юзера
// получаем код юзера, который обменяем на accessToken юзера
export const getUserAuthorizationCode = async () => {
  window.location.replace(`https://hh.ru/oauth/authorize?response_type=code&
client_id=${import.meta.env.VITE_CLIENT_ID}`);
};

export const getAppAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://hh.ru/oauth/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("Access Token:", response.data.access_token);
    return response.data;
  } catch (error) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
  }
};