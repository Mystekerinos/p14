import React, { useState, useMemo, useCallback } from "react";
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
  const [pageSize, setPageSize] = useState(5);

  const handleCreateEmployee = () => {
    navigate("/create-employee");
  };

  const columnDefs = useMemo(
    () => [
      { headerName: "First Name", field: "firstName", sortable: true },
      { headerName: "Last Name", field: "lastName", sortable: true },
      {
        headerName: "Start Date",
        field: "startDate",
        sortable: true,
        valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
      },
      { headerName: "Department", field: "department", sortable: true },
      {
        headerName: "Date of Birth",
        field: "dateOfBirth",
        sortable: true,
        valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
      },
      { headerName: "Street", field: "street" },
      { headerName: "City", field: "city" },
      { headerName: "State", field: "state" },
      { headerName: "Zip Code", field: "zipCode" },
      {
        headerName: "",
        field: "actions",
        cellRendererFramework: (params) => (
          <div>
            <button onClick={() => handleDelete(params.data)}>Delete</button>
            <button onClick={() => handleUpdate(params.data)}>Update</button>
          </div>
        ),
      },
    ],
    []
  );

  const handleDelete = useCallback((employee) => {
    // Your delete logic here
    console.log("Delete employee", employee);
  }, []);

  const handleUpdate = useCallback((employee) => {
    // Your update logic here
    console.log("Update employee", employee);
  }, []);

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

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <div className="employee-list-container">
      <h2 className="centered-title">Current Employees</h2>

      {/* Search and Filter */}
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

      {/* Page Size */}
      <div className="page-size-container">
        <label htmlFor="pageSize">Show </label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <span> entries</span>
      </div>

      {/* Table */}
      <div className="ag-theme-alpine custom-grid">
        <AgGridReact
          rowData={filteredEmployees}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={pageSize}
        />
      </div>

      {/* Create Button */}
      <div className="button-container">
        <button onClick={handleCreateEmployee}>Create New Employee</button>
      </div>
    </div>
  );
};

export default EmployeeList;
