import axios from "axios";

const searchParams = {
  text: "Biolog",
  search_field: "name",
  period: 1,
  per_page: 99,
};

const hhAxiosInstance = axios.create({
  baseURL: "https://api.hh.ru",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userAccessToken")}`,
    "Content-Type": "application/json",
    "HH-User-Agent": "MyApp",
  },
});

export const getVacancies = async () => {
  const {
    data: { pages },
  } = await hhAxiosInstance.get("/vacancies", {
    params: searchParams,
  });

  const items = [];

  for (let page = 0; page < pages; page++) {
    const { data } = await hhAxiosInstance.get("/vacancies", {
      params: {
        ...searchParams,
        page,
      },
    });
    items.push(...data.items);
  }

  return items;
};

export const getResumes = async () => {
  const userAccessToken = localStorage.getItem("userAccessToken");
  const response = await axios.get("https://api.hh.ru/resumes/mine", {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      "HH-User-Agent": "myAPP",
    },
  });
  return response.data.items;
};

export const getInfoOfVacancy = async (vacancy_id) => {
  const userAccessToken = localStorage.getItem("userAccessToken");
  if (!userAccessToken) return;
  const responce = await axios.get(
    `https://api.hh.ru/vacancies/${vacancy_id}`,
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "HH-User-Agent": "myAPP",
      },
    }
  );
  return responce.data;
};

export const applyForVacancy = async ({
  vacancyId,
  resumeId = localStorage.getItem("userResumeId"),
  message = "",
}) => {
  const userAccessToken = localStorage.getItem("userAccessToken");

  const formData = new FormData();
  formData.append("vacancy_id", vacancyId);
  formData.append("resume_id", resumeId);
  formData.append("message", message);
  try {
    const response = await axios.post(
      "https://api.hh.ru/negotiations",
      formData,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
          "HH-User-Agent": "myAPP",
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (err) {
    console.log(Ошибка, err.message);
  }
};

export const getNumberActiveResponce = async () => {
  const userAccessToken = localStorage.getItem("userAccessToken");

  const response = await axios.get("https://api.hh.ru/negotiations", {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      "HH-User-Agent": "myAPP",
    },
    params: {
      status: "active",
      with_job_search_status: "true",
    },
  });
  return response.data;
};
