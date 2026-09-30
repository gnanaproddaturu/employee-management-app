

import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

export default apiClient;