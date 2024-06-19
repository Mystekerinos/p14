import create from "zustand";

export const useEmployeeStore = create((set) => ({
  employees: JSON.parse(localStorage.getItem("employees")) || [],
  setEmployees: (newEmployees) => {
    localStorage.setItem("employees", JSON.stringify(newEmployees));
    set({ employees: newEmployees });
  },
}));
