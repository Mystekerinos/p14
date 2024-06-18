import DataTable from "@components/dataTable/DataTable";
import "./employees.css";
import { useEmployeeStore } from "@store/employee.store";

const Employees = () => {
  const employees = useEmployeeStore((state) => state.employees);

  return (
    <div className="employees">
      {employees.length === 0 ? (
        <p className="employees_empty">No employees found</p>
      ) : (
        <DataTable />
      )}
    </div>
  );
};

export default Employees;
