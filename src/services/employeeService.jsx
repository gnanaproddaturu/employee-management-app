

import apiClient from "./apiClient";

export const employeeService = {
  getAll: async () => {
    const { data } =
      await apiClient.get("/employee");

    return data;
  },

  getById: async (id) => {
    const { data } =
      await apiClient.get(`/employee/${id}`);

    return data;
  },

  create: async (employee) => {
    const { data } =
      await apiClient.post(
        "/employee",
        employee
      );

    return data;
  },

  update: async (id, employee) => {
    const { data } =
      await apiClient.put(
        `/employee/${id}`,
        employee
      );

    return data;
  },

  remove: async (id) => {
    await apiClient.delete(
      `/employee/${id}`
    );

    return id;
  },
};