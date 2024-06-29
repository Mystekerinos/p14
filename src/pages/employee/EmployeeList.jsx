import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useEmployeeStore from "../../store/employee.store";
import { useNavigate } from "react-router-dom";
import "../../assets/css/EmployeeList.css";

const EmployeeList = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const navigate = useNavigate();

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

  return (
    <div className="employee-list-container">
      <h2 className="centered-title">Employee List</h2>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={employees}
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
