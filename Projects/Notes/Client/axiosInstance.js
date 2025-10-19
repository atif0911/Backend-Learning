import axios from "axios";

export const notesBaseUrl = axios.create({
  baseURL: "http://localhost:8000/notes",
});

export const userBaseUrl = axios.create({
  baseURL: "http://localhost:8000/user",
});

notesBaseUrl.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("userAuth");
    const token = JSON.parse(authToken)?.Token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Auth_Req_Error: ", error);
  }
);

notesBaseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userAuth");
      window.location.href = "/login";
    }
  }
);
