import React from "react";
import "../../assets/css/EmployeeList.css";
import useEmployeeStore from "../../store/employee.store";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const navigate = useNavigate();

  const handleCreateEmployee = () => {
    navigate("/create-employee");
  };

  return (
    <div className="employee-list-container">
      <h2 className="centered-title">Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={handleCreateEmployee}>Create New Employee</button>
      </div>
    </div>
  );
};

export default EmployeeList;
