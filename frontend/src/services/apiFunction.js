import api from "./index";

export const login = (credential) => {
  return api.post("/login", credential);
};

export const uploadStudentData = (data) => {
  return api.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllStudentData = () => {
  return api.get("/data");
};
export const downloadResume = (id) => {
  return api.get(`/download/${id}`, {
    responseType: "blob",
  });
};
