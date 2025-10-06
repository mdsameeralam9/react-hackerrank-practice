import React, { useMemo, useState } from "react";

const isNotFuture_local = (value) => {
  if (!value) return false;
  const [y, m, d] = value.split("-").map(Number);
  const selectedMs = new Date(y, (m ?? 1) - 1, d ?? 1).getTime()
  const now = new Date();
  const todayMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return selectedMs <= todayMs;
};


function EmployeeValidationForm() {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    employeeId: "",
    joiningDate: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormdata(f => ({ ...f, [name]: value }))
  }

  const { isNameValid, isEmailvalid, isEmployeeIdvalid, isJoiningDateValid, isBtnValid } = useMemo(() => {
    let isNameValid = false, isEmailvalid = false, isEmployeeIdvalid = false, isJoiningDateValid = false, isBtnValid = false;
    const { name = '', email = '', employeeId = '', joiningDate = '' } = formData;
    if (name.length >= 4) {
      isNameValid = true
    };

    if (email.includes("@") && email.includes(".")) {
      isEmailvalid = true
    };

    if (employeeId.length === 6) {
      isEmployeeIdvalid = true
    };

    if (isNotFuture_local(joiningDate)) {
      isJoiningDateValid = true
    };

    isBtnValid = isNameValid && isEmailvalid && isEmployeeIdvalid && isJoiningDateValid
    return { isNameValid, isEmailvalid, isEmployeeIdvalid, isJoiningDateValid, isBtnValid }
  }, [formData])


  const handleSubmit = () => {
    setFormdata({
      name: "",
      email: "",
      employeeId: "",
      joiningDate: ""
    })
  }

  return (
    <div className="layout-column align-items-center mt-20 ">
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
        {!isNameValid && <p className="error mt-2">
          Name must be at least 4 characters long and only contain letters and spaces
        </p>}
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
        {!isEmailvalid && <p className="error mt-2">Email must be a valid email address</p>}
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
        {!isEmployeeIdvalid && <p className="error mt-2">Employee ID must be exactly 6 digits</p>}
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
        {!isJoiningDateValid && <p className="error mt-2">Joining Date cannot be in the future</p>}
      </div>
      <button disabled={!isBtnValid} onClick={handleSubmit} data-testid="submit-btn" type="submit" >
        Submit
      </button>
    </div>
  );
}

export default EmployeeValidationForm;
