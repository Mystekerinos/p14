import React, { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../reducers/employeesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/employeeList.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const handleCreateEmployee = useCallback(() => {
    navigate("/create-employee");
  }, [navigate]);

  const handleDelete = useCallback(
    (employee) => {
      if (
        window.confirm(
          `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
        )
      ) {
        dispatch(deleteEmployee(employee.id));
      }
    },
    [dispatch]
  );

  const columnDefs = useMemo(
    () => [
      { headerName: "First Name", field: "firstName", sortable: true },
      { headerName: "Last Name", field: "lastName", sortable: true },
      {
        headerName: "Start Date",
        field: "startDate",
        sortable: true,
        valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
      },
      { headerName: "Department", field: "department", sortable: true },
      {
        headerName: "Date of Birth",
        field: "dateOfBirth",
        sortable: true,
        valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
      },
      { headerName: "Street", field: "street" },
      { headerName: "City", field: "city" },
      { headerName: "State", field: "state" },
      { headerName: "Zip Code", field: "zipCode" },
      {
        headerName: "Actions",
        field: "actions",
        cellRendererFramework: ({ data }) => (
          <button className="delete-button" onClick={() => handleDelete(data)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        ),
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

  return (
    <div className="employee-list-container">
      <h2 className="centered-title">Current Employees</h2>

      <div className="filter-container">
        <div>
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <span>Select employees by department:</span>
          {[
            "",
            "Sales",
            "Marketing",
            "Engineering",
            "Human Resources",
            "Legal",
          ].map((dept) => (
            <label key={dept}>
              <input
                type="radio"
                name="departmentFilter"
                value={dept}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                checked={departmentFilter === dept}
              />
              {dept || "All"}
            </label>
          ))}
        </div>
      </div>

      <div className="page-size-container">
        <label htmlFor="pageSize">Show </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span> entries</span>
      </div>

      <div className="ag-theme-alpine custom-grid">
        <AgGridReact
          rowData={filteredEmployees}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={pageSize}
        />
      </div>

      <div className="button-container">
        <button onClick={handleCreateEmployee}>Create New Employee</button>
      </div>
    </div>
  );
};

export default EmployeeList;
