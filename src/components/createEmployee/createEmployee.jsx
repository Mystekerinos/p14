import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateEmployee.css";
import Modal from "react-modal";
import { useEmployeeStore } from "@store/employee.store";

const CreateEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { setEmployees } = useEmployeeStore((state) => ({
    setEmployees: state.setEmployees,
  }));

  const handleSave = () => {
    const newEmployee = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      street,
      city,
      state,
      zipCode,
      department,
    };

    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <a href="/employee-list">View Current Employees</a>
      <h2>Create Employee</h2>
      <form id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <DatePicker
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
          dateFormat="MM/dd/yyyy"
          id="date-of-birth"
        />

        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
          id="start-date"
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label htmlFor="state">State</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {/* Populate this with state options */}
            <option value="">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            {/* Add more states as needed */}
          </select>

          <label htmlFor="zip-code">Zip Code</label>
          <input
            type="number"
            id="zip-code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
      </form>

      <button onClick={handleSave}>Save</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Created"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Employee Created!</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default CreateEmployee;
