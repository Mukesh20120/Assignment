import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  response=>response,
  error => {
    if (error.status === "401") {
      setAuthToken(undefined);
    }
    return Promise.reject(error);
  }
);


export default api;