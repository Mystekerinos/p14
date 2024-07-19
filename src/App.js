// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CreateEmployee from "./pages/createEmployee/CreateEmployee";
import EmployeeList from "./pages/employeeList/EmployeeList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employee-list" />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
};

export default App;
