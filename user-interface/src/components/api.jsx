import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const registerUser = async (data) => {
  try {
    console.log(data);
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
