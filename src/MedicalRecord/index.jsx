import React, { useState, useMemo } from "react";
import Search from "./Search";
import Records from "./Records";
import medical_records from "./medicalRecords";

const title = "Patient Medical Records";

const App = () => {
  // Keep id as string to match the test which sets value "1"
  const [recordId, setRecordId] = useState(null);

  const selectedRecord = useMemo(() => {
    if (!recordId) return null;
    return medical_records.find((r) => String(r.id) === String(recordId)) || null;
  }, [recordId]);

  const handleNext = () => {
    // Cycle by array order and wrap back to first
    const ids = medical_records.map((r) => String(r.id));
    setRecordId((prevId) => {
      const curIdx = ids.indexOf(String(prevId));
      const nextIdx = (curIdx + 1) % ids.length;
      return ids[nextIdx];
    });
  };

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="content">
        {/* The test queries data-testid="patient-name" and clicks show */}
        <Search setRecordId={setRecordId} />
        {/* Only render profile/table after Show sets active id */}
        {selectedRecord && (
          <Records selectedRecord={selectedRecord} handleNext={handleNext} />
        )}
      </div>
    </div>
  );
};

export default App;
