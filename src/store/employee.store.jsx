import create from "zustand";

export const useEmployeeStore = create((set) => ({
  employees: JSON.parse(localStorage.getItem("employees")) || [],
  setEmployees: (employees) => set({ employees }),
}));
