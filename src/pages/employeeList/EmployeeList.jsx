import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "../../slices/employeesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/EmployeeList.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleCreateEmployee = () => {
    navigate("/create-employee");
  };

  const handleDelete = (employee) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
      )
    ) {
      dispatch(deleteEmployee(employee.id));
    }
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
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params) => {
          const handleDeleteClick = () => handleDelete(params.data);

          return (
            <button className="delete-button" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          );
        },
      },
    ],
    [handleDelete]
  );

  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    if (searchTerm) {
      const normalizedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(normalizedSearch) ||
          employee.lastName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter(
        (employee) => employee.department === departmentFilter
      );
    }

    return filtered;
  }, [employees, searchTerm, departmentFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
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

      {/* Ag-Grid Table */}
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
