import React, { useMemo, useState } from "react";

const getCurrentDate = () => {
  const date = new Date();
  return date.getFullYear();
};

const isJoiningDateValid = (value) => {
  if (!value) return false;
  const currentYear = getCurrentDate();
  const [yearValue] = value.split("-");
  return parseInt(yearValue) < parseInt(currentYear, 10);
};

function EmployeeValidationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    joiningDate: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const { isNameValid, isEmailValid, isEmployeeIdValid, isJoiningDateValid: joiningDateValid, isBtnValid } = useMemo(() => {
    const { name, email, employeeId, joiningDate } = formData;
    
    const isNameValid = name.length >= 4;
    const isEmailValid = email.includes("@") && email.includes(".");
    const isEmployeeIdValid = employeeId.length === 6;
    const joiningDateValid = isJoiningDateValid(joiningDate);
    const isBtnValid = isNameValid && isEmailValid && isEmployeeIdValid && joiningDateValid;
    
    return { isNameValid, isEmailValid, isEmployeeIdValid, isJoiningDateValid: joiningDateValid, isBtnValid };
  }, [formData]);

  const handleSubmit = () => {
    setFormData({ name: "", email: "", employeeId: "", joiningDate: "" });
  };

  return (
    <div className="layout-column align-items-center mt-20">
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-name">
        <input
          className="w-100"
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          data-testid="input-name-test"
          onChange={handleChange}
        />
        {!isNameValid && <p className="error mt-2">Name must be at least 4 characters long and only contain letters and spaces</p>}
      </div>
      
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-email">
        <input
          className="w-100"
          type="text"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        {!isEmailValid && <p className="error mt-2">Email must be a valid email address</p>}
      </div>
      
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-employee-id">
        <input
          className="w-100"
          type="text"
          name="employeeId"
          value={formData.employeeId}
          placeholder="Employee ID"
          onChange={handleChange}
        />
        {!isEmployeeIdValid && <p className="error mt-2">Employee ID must be exactly 6 digits</p>}
      </div>
      
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-joining-date">
        <input
          className="w-100"
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          placeholder="Joining Date"
          onChange={handleChange}
        />
        {!joiningDateValid && <p className="error mt-2">Joining Date cannot be in the future</p>}
      </div>
      
      <button disabled={!isBtnValid} onClick={handleSubmit} data-testid="submit-btn" type="submit">
        Submit
      </button>
    </div>
  );
}

export default EmployeeValidationForm;
