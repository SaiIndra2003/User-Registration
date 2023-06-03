import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const registerUser = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
