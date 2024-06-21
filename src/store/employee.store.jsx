import create from "zustand";
import employeesData from "../data/employeesData";

export const useEmployeeStore = create((set) => ({
  employees: JSON.parse(localStorage.getItem("employees")) || employeesData,
  setEmployees: (newEmployees) => {
    localStorage.setItem("employees", JSON.stringify(newEmployees));
    set({ employees: newEmployees });
  },
}));
