import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/createEmployee.css";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../reducers/employeesSlice";
import { Modal } from "react-custom-modals";

const states = [
  { abbreviation: "AL", name: "Alabama" },
  { abbreviation: "AK", name: "Alaska" },
  { abbreviation: "AZ", name: "Arizona" },
  { abbreviation: "AR", name: "Arkansas" },
  { abbreviation: "CA", name: "California" },
  { abbreviation: "CO", name: "Colorado" },
  { abbreviation: "CT", name: "Connecticut" },
  { abbreviation: "DE", name: "Delaware" },
  { abbreviation: "FL", name: "Florida" },
  { abbreviation: "GA", name: "Georgia" },
  { abbreviation: "HI", name: "Hawaii" },
  { abbreviation: "ID", name: "Idaho" },
  { abbreviation: "IL", name: "Illinois" },
  { abbreviation: "IN", name: "Indiana" },
  { abbreviation: "IA", name: "Iowa" },
  { abbreviation: "KS", name: "Kansas" },
  { abbreviation: "KY", name: "Kentucky" },
  { abbreviation: "LA", name: "Louisiana" },
  { abbreviation: "ME", name: "Maine" },
  { abbreviation: "MD", name: "Maryland" },
  { abbreviation: "MA", name: "Massachusetts" },
  { abbreviation: "MI", name: "Michigan" },
  { abbreviation: "MN", name: "Minnesota" },
  { abbreviation: "MS", name: "Mississippi" },
  { abbreviation: "MO", name: "Missouri" },
  { abbreviation: "MT", name: "Montana" },
  { abbreviation: "NE", name: "Nebraska" },
  { abbreviation: "NV", name: "Nevada" },
  { abbreviation: "NH", name: "New Hampshire" },
  { abbreviation: "NJ", name: "New Jersey" },
  { abbreviation: "NM", name: "New Mexico" },
  { abbreviation: "NY", name: "New York" },
  { abbreviation: "NC", name: "North Carolina" },
  { abbreviation: "ND", name: "North Dakota" },
  { abbreviation: "OH", name: "Ohio" },
  { abbreviation: "OK", name: "Oklahoma" },
  { abbreviation: "OR", name: "Oregon" },
  { abbreviation: "PA", name: "Pennsylvania" },
  { abbreviation: "RI", name: "Rhode Island" },
  { abbreviation: "SC", name: "South Carolina" },
  { abbreviation: "SD", name: "South Dakota" },
  { abbreviation: "TN", name: "Tennessee" },
  { abbreviation: "TX", name: "Texas" },
  { abbreviation: "UT", name: "Utah" },
  { abbreviation: "VT", name: "Vermont" },
  { abbreviation: "VA", name: "Virginia" },
  { abbreviation: "WA", name: "Washington" },
  { abbreviation: "WV", name: "West Virginia" },
  { abbreviation: "WI", name: "Wisconsin" },
  { abbreviation: "WY", name: "Wyoming" },
];

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
  const [showDobCalendar, setShowDobCalendar] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    startDate: false,
    street: false,
    city: false,
    state: false,
    zipCode: false,
    department: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    if (validateForm()) {
      const newEmployee = {
        id: Math.random().toString(36).substr(2, 9),
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : "",
        startDate: startDate ? startDate.toISOString().split("T")[0] : "",
        street,
        city,
        state,
        zipCode,
        department,
      };

      dispatch(addEmployee(newEmployee));
      setModalIsOpen(true);
      resetForm();
    }
  };

  const validateForm = () => {
    const errors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
      dateOfBirth: !dateOfBirth,
      startDate: !startDate,
      street: street.trim() === "",
      city: city.trim() === "",
      state: state.trim() === "",
      zipCode: zipCode.trim() === "",
      department: department.trim() === "",
    };

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth(null);
    setStartDate(null);
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setDepartment("");
    setFormErrors({
      firstName: false,
      lastName: false,
      dateOfBirth: false,
      startDate: false,
      street: false,
      city: false,
      state: false,
      zipCode: false,
      department: false,
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/employee-list");
  };

  return (
    <div className="container">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <a href="/employee-list">View Current Employees</a>
      <h2 className="title">Create Employee</h2>
      <form>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {formErrors.firstName && (
          <p className="error">Please enter First Name</p>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {formErrors.lastName && <p className="error">Please enter Last Name</p>}

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="text"
          value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ""}
          onClick={() => setShowDobCalendar(true)}
          readOnly
        />
        {showDobCalendar && (
          <div>
            <Calendar
              onChange={(date) => {
                setDateOfBirth(date);
                setShowDobCalendar(false);
              }}
              value={dateOfBirth}
            />
          </div>
        )}
        {formErrors.dateOfBirth && (
          <p className="error">Please select Date of Birth</p>
        )}

        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="text"
          value={startDate ? startDate.toLocaleDateString() : ""}
          onClick={() => setShowStartCalendar(true)}
          readOnly
        />
        {showStartCalendar && (
          <div>
            <Calendar
              onChange={(date) => {
                setStartDate(date);
                setShowStartCalendar(false);
              }}
              value={startDate}
            />
          </div>
        )}
        {formErrors.startDate && (
          <p className="error">Please select Start Date</p>
        )}

        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        {formErrors.street && <p className="error">Please enter Street</p>}

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {formErrors.city && <p className="error">Please enter City</p>}

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
        {formErrors.state && <p className="error">Please select a State</p>}

        <label htmlFor="zipCode">Zip Code</label>
        <input
          id="zipCode"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        {formErrors.zipCode && <p className="error">Please enter Zip Code</p>}

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
        {formErrors.department && (
          <p className="error">Please select a Department</p>
        )}

        <div className="button-container">
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>

      {modalIsOpen && (
        <Modal
          message="Employee Created!"
          onClose={closeModal}
          showCloseButton={false}
          backgroundColor="#f0f0f0"
          closeOnOutsideClick={true}
        />
      )}
    </div>
  );
};

export default CreateEmployee;
