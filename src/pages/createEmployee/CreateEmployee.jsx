import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/createEmployee.css";
import Modal from "react-modal";
import { useEmployeeStore } from "../../store/employee.store";
import { states } from "../../store/state";

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
  const [showDobCalendar, setShowDobCalendar] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);

  const { setEmployees } = useEmployeeStore();

  const handleSave = () => {
    const newEmployee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      startDate: startDate.toLocaleDateString(),
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
        <input
          type="text"
          id="date-of-birth"
          value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ""}
          onFocus={() => setShowDobCalendar(true)}
          readOnly
        />
        {showDobCalendar && (
          <Calendar
            onChange={(date) => {
              setDateOfBirth(date);
              setShowDobCalendar(false);
            }}
            value={dateOfBirth}
          />
        )}

        <label htmlFor="start-date">Start Date</label>
        <input
          type="text"
          id="start-date"
          value={startDate ? startDate.toLocaleDateString() : ""}
          onFocus={() => setShowStartCalendar(true)}
          readOnly
        />
        {showStartCalendar && (
          <Calendar
            onChange={(date) => {
              setStartDate(date);
              setShowStartCalendar(false);
            }}
            value={startDate}
          />
        )}

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
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
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
          <option value="">Select Department</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
      </form>

      <div className="button-container">
        <button onClick={handleSave}>Save</button>
      </div>

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
