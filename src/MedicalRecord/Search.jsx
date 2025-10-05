import React, { useState } from "react";
import medical_records from "../medicalRecords";

function Search({ setRecordId }) {
  const [selected, setSelected] = useState("");

  const showSelectedRecord = () => {
    if (!selected) {
      alert("Please select a patient name");
      return;
    }
    setRecordId(selected);
  };

  return (
    <div className="layout-row align-items-baseline select-form-container">
      <div className="select">
        <select
          data-testid="patient-name"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="" disabled>
            Select Patient
          </option>
          {/* Order must reflect array order to match test children[1..3] */}
          {medical_records.map((record) => (
            <option key={record.id} value={String(record.id)}>
              {record.data[0].userName}
            </option>
          ))}
        </select>
      </div>

      <button type="button" data-testid="show" onClick={showSelectedRecord}>
        Show
      </button>
    </div>
  );
}

export default Search;
