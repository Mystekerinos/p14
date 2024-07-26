import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addEmployee: (state, action) => {
      if (!state.employees) {
        state.employees = [];
      }
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});

export const { addEmployee, deleteEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
