import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useEmployeeStore from "../../store/employee.store";
import { useNavigate } from "react-router-dom";
import "../../assets/css/EmployeeList.css";

const EmployeeList = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const handleCreateEmployee = () => {
    navigate("/create-employee");
  };

  const columnDefs = useMemo(
    () => [
      { headerName: "First Name", field: "firstName" },
      { headerName: "Last Name", field: "lastName" },
      { headerName: "Start Date", field: "startDate" },
      { headerName: "Department", field: "department" },
      { headerName: "Date of Birth", field: "dateOfBirth" },
      { headerName: "Street", field: "street" },
      { headerName: "City", field: "city" },
      { headerName: "State", field: "state" },
      { headerName: "Zip Code", field: "zipCode" },
    ],
    []
  );

  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    // Filtrage par terme de recherche
    if (searchTerm) {
      const normalizedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(normalizedSearch) ||
          employee.lastName.toLowerCase().includes(normalizedSearch)
      );
    }

    // Filtrage par département
    if (departmentFilter) {
      filtered = filtered.filter(
        (employee) => employee.department === departmentFilter
      );
    }

    return filtered;
  }, [employees, searchTerm, departmentFilter]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDepartmentFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  return (
    <div className="employee-list-container">
      <h2 className="centered-title">Employee List</h2>

      {/* Champ de recherche */}
      <div className="filter-container">
        <div>
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Filtre par département */}
        <div>
          <span>Select employees by department:</span>
          <label>
            <input
              type="radio"
              name="departmentFilter"
              value=""
              onChange={handleDepartmentFilterChange}
              checked={!departmentFilter}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="departmentFilter"
              value="Sales"
              onChange={handleDepartmentFilterChange}
              checked={departmentFilter === "Sales"}
            />
            Sales
          </label>
          <label>
            <input
              type="radio"
              name="departmentFilter"
              value="Marketing"
              onChange={handleDepartmentFilterChange}
              checked={departmentFilter === "Marketing"}
            />
            Marketing
          </label>
          <label>
            <input
              type="radio"
              name="departmentFilter"
              value="Engineering"
              onChange={handleDepartmentFilterChange}
              checked={departmentFilter === "Engineering"}
            />
            Engineering
          </label>
          <label>
            <input
              type="radio"
              name="departmentFilter"
              value="Human Resources"
              onChange={handleDepartmentFilterChange}
              checked={departmentFilter === "Human Resources"}
            />
            Human Resources
          </label>
          <label>
            <input
              type="radio"
              name="departmentFilter"
              value="Legal"
              onChange={handleDepartmentFilterChange}
              checked={departmentFilter === "Legal"}
            />
            Legal
          </label>
        </div>
      </div>

      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={filteredEmployees}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      <div className="button-container">
        <button onClick={handleCreateEmployee}>Create New Employee</button>
      </div>
    </div>
  );
};

export default EmployeeList;
