import React from "react";
import App from "./index";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import medical_records from "./medicalRecords";

// silence React warnings in test output if any
global.console.error = jest.fn();

const renderApp = () => render(<App />);

afterEach(() => {
  cleanup();
});

const dateRegex = /(\d{2}\/\d{2}\/\d{4})/;

it("Test Initial Loading of the App", () => {
  const { getByTestId, queryByTestId } = renderApp();
  const patientProfile = queryByTestId("patient-profile");
  const patientTable = queryByTestId("patient-table");
  const patientName = getByTestId("patient-name");
  const nextBtn = queryByTestId("next-btn");

  expect(patientProfile).not.toBeInTheDocument();
  expect(patientTable).not.toBeInTheDocument();
  expect(nextBtn).not.toBeInTheDocument();

  // select options order and attributes
  expect(patientName.children[0]).toHaveTextContent("Select Patient");
  expect(patientName.children[0]).toHaveAttribute("disabled");
  expect(patientName.children[1]).toHaveTextContent("John Oliver");
  expect(patientName.children[2]).toHaveTextContent("Bob Martin");
  expect(patientName.children[3]).toHaveTextContent("Helena Fernandez");
});

it("Show alert on clicking show button if no patient is selected", () => {
  const { getByTestId } = renderApp();
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  const showBtn = getByTestId("show");

  fireEvent.click(showBtn);

  expect(alertMock).toHaveBeenCalledWith("Please select a patient name");
  alertMock.mockRestore();
});

it("Test getting patient details", () => {
  const { getByTestId, queryByTestId } = renderApp();
  const patientName = getByTestId("patient-name");
  const showBtn = getByTestId("show");

  // choose first patient (id "1")
  fireEvent.change(patientName, { target: { value: "1" } });
  fireEvent.click(showBtn);

  const patientProfile = queryByTestId("patient-profile");
  const patientTable = queryByTestId("patient-table");

  expect(patientProfile).toBeInTheDocument();
  expect(patientTable).toBeInTheDocument();

  // profile fields
  expect(patientProfile.children[0]).toHaveTextContent("John Oliver");
  expect(patientProfile.children[1]).toHaveTextContent("DOB: 02-01-1986");
  expect(patientProfile.children[2]).toHaveTextContent("Height: 168 cm");

  // table rows assertions for patient[0]
  for (let i = 0; i < medical_records[0].data.length; i++) {
    expect(patientTable.children[i].children[0]).toHaveTextContent(i + 1);
    expect(patientTable.children[i].children[1].textContent).toMatch(dateRegex);
    expect(patientTable.children[i].children[2]).toHaveTextContent(
      medical_records[0].data[i].diagnosis.name
    );
    expect(patientTable.children[i].children[3]).toHaveTextContent(
      medical_records[0].data[i].meta.weight
    );
    expect(patientTable.children[i].children[4]).toHaveTextContent(
      medical_records[0].data[i].doctor.name
    );
  }
});

it("Clicking the next button should display next patient", () => {
  const { getByTestId, queryByTestId } = renderApp();
  const showBtn = getByTestId("show");
  const patientName = getByTestId("patient-name");

  fireEvent.change(patientName, { target: { value: "1" } });
  fireEvent.click(showBtn);

  const patientProfile = queryByTestId("patient-profile");
  const patientTable = queryByTestId("patient-table");
  const nextBtn = queryByTestId("next-btn");

  // after first next => patient index 1 (Bob Martin)
  fireEvent.click(nextBtn);
  expect(patientProfile.children[0]).toHaveTextContent("Bob Martin");
  expect(patientProfile.children[1]).toHaveTextContent("DOB: 14-09-1989");
  expect(patientProfile.children[2]).toHaveTextContent("Height: 174 cm");

  for (let i = 0; i < medical_records[1].data.length; i++) {
    expect(patientTable.children[i].children[0]).toHaveTextContent(i + 1);
    expect(patientTable.children[i].children[1].textContent).toMatch(dateRegex);
    expect(patientTable.children[i].children[2]).toHaveTextContent(
      medical_records[1].data[i].diagnosis.name
    );
    expect(patientTable.children[i].children[3]).toHaveTextContent(
      medical_records[1].data[i].meta.weight
    );
    expect(patientTable.children[i].children[4]).toHaveTextContent(
      medical_records[1].data[i].doctor.name
    );
  }

  // click twice more => index 2 (Helena) then wrap back to index 0 (John)
  fireEvent.click(nextBtn);
  fireEvent.click(nextBtn);

  expect(patientProfile.children[0]).toHaveTextContent("John Oliver");
  expect(patientProfile.children[1]).toHaveTextContent("DOB: 02-01-1986");
  expect(patientProfile.children[2]).toHaveTextContent("Height: 168 cm");

  for (let i = 0; i < medical_records[0].data.length; i++) {
    expect(patientTable.children[i].children[0]).toHaveTextContent(i + 1);
    expect(patientTable.children[i].children[1].textContent).toMatch(dateRegex);
    expect(patientTable.children[i].children[2]).toHaveTextContent(
      medical_records[0].data[i].diagnosis.name
    );
    expect(patientTable.children[i].children[3]).toHaveTextContent(
      medical_records[0].data[i].meta.weight
    );
    expect(patientTable.children[i].children[4]).toHaveTextContent(
      medical_records[0].data[i].doctor.name
    );
  }
});
