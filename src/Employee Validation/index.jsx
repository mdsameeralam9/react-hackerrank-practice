import React, { useMemo, useState } from "react";

const isNotFuture = (value) => {
  if (!value) return false;
  return new Date(value) <= new Date().setHours(0, 0, 0, 0);
};

const validateField = (name, value) => {
  switch (name) {
    case "name":
      return value.length >= 4;
    case "email":
      return value.includes("@") && value.includes(".");
    case "employeeId":
      return value.length === 6;
    case "joiningDate":
      return isNotFuture(value);
    default:
      return false;
  }
};

function EmployeeValidationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    joiningDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const validations = useMemo(() => {
    const results = {};
    Object.keys(formData).forEach((key) => {
      results[`is${key.charAt(0).toUpperCase() + key.slice(1)}Valid`] =
        validateField(key, formData[key]);
    });
    results.isBtnValid = Object.values(results).every(Boolean);
    return results;
  }, [formData]);

  const handleSubmit = () => {
    setFormData({ name: "", email: "", employeeId: "", joiningDate: "" });
  };

  const fields = [
    {
      name: "name",
      placeholder: "Name",
      error:
        "Name must be at least 4 characters long and only contain letters and spaces",
    },
    {
      name: "email",
      placeholder: "Email",
      error: "Email must be a valid email address",
    },
    {
      name: "employeeId",
      placeholder: "Employee ID",
      error: "Employee ID must be exactly 6 digits",
    },
    {
      name: "joiningDate",
      placeholder: "Joining Date",
      type: "date",
      error: "Joining Date cannot be in the future",
    },
  ];

  return (
    <div className="layout-column align-items-center mt-20">
      {fields.map(({ name, placeholder, type = "text", error }) => (
        <div
          key={name}
          className="layout-column align-items-start mb-10 w-50"
          data-testid={`input-${name}`}
        >
          <input
            className="w-100"
            type={type}
            name={name}
            value={formData[name]}
            placeholder={placeholder}
            data-testid={name === "name" ? "input-name-test" : undefined}
            onChange={handleChange}
          />
          {!validations[
            `is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`
          ] && <p className="error mt-2">{error}</p>}
        </div>
      ))}
      <button
        disabled={!validations.isBtnValid}
        onClick={handleSubmit}
        data-testid="submit-btn"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
}

export default EmployeeValidationForm;
