import axios from "axios";
import { getToken } from "./auth";
import history from "./history/history";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
},
function () {
  localStorage.removeItem("@latineuropadigital-Token");
  localStorage.removeItem("@latineuropadigital-User");

  history.push("/");

});



api.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.message === "Network Error") {
      localStorage.removeItem("@latineuropadigital-Token");
      localStorage.removeItem("@latineuropadigital-User");

      history.push("/");
      return;
    }
    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem("@latineuropadigital-Token");
      localStorage.removeItem("@latineuropadigital-User");
      history.push("/");
    }
    return Promise.reject(error.response.data);
  }
); 
export default api;