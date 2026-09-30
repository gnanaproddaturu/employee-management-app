

import apiClient from "./apiClient";

export const countryService = {
  getAll: async () => {
    const { data } =
      await apiClient.get("/country");

    return data;
  },
};