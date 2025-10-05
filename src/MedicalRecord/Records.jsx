import React from "react";

const formatDateUTC_DDMMYYYY = (tsMs) => {
  const d = new Date(Number(tsMs));
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

function Records({ selectedRecord, handleNext }) {
  const first = selectedRecord?.data?.[0];

  return (
    <div className="patient-profile-container" id="profile-view">
      <div className="layout-row justify-content-center">
        <div id="patient-profile" data-testid="patient-profile" className="mx-auto">
          {/* Test expects: name, DOB: <dd-mm-yyyy>, Height: <n> cm */}
          <h4 id="patient-name">{first?.userName ?? ""}</h4>
          <h5 id="patient-dob">DOB: {first?.userDob ?? ""}</h5>
          <h5 id="patient-height">
            Height: {first?.meta?.height != null ? `${first.meta.height} cm` : ""}
          </h5>
        </div>

        <button className="mt-10 mr-10" data-testid="next-btn" onClick={handleNext}>
          Next
        </button>
      </div>

      <table id="patient-records-table">
        <thead id="table-header">
          <tr>
            <th>SL</th>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Weight</th>
            <th>Doctor</th>
          </tr>
        </thead>
        {/* Tests iterate tbody rows via data-testid="patient-table" */}
        <tbody id="table-body" data-testid="patient-table">
          {selectedRecord?.data?.map((r, idx) => (
            <tr key={r.id ?? idx}>
              <td>{idx + 1}</td>
              <td>{formatDateUTC_DDMMYYYY(r.timestamp)}</td>
              <td>{r?.diagnosis?.name}</td>
              <td>{r?.meta?.weight}</td>
              <td>{r?.doctor?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Records;
