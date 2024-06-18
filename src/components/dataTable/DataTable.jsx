import React, { useMemo } from "react";
import { useTable } from "react-table";
import { useEmployeeStore } from "@store/employee.store";
import "./DataTable.css";

const DataTable = () => {
  const employees = useEmployeeStore((state) => state.employees);

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Start Date", accessor: "startDate" },
      { Header: "Department", accessor: "department" },
      { Header: "Date of Birth", accessor: "dateOfBirth" },
      { Header: "Street", accessor: "street" },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
      { Header: "Zip Code", accessor: "zipCode" },
    ],
    []
  );

  const data = useMemo(() => employees, [employees]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="data-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
