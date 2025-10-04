import React, { useState } from "react";

const OMITTED_WORDS = ["a", "the", "and", "or", "but"];

function WordOmitter() {
  const [inputText, setInputText] = useState("");
  const [omitWords, setOmitWords] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const toggleOmitWords = () => {
    setOmitWords(!omitWords);
  };

  const clearFields = () => {
    // TODO: Add your changes here
    setInputText("");
  };

  const getProcessedText = (inputText) => {
    if (!inputText) return "";
    // TODO: Add your changes here;
    inputText = inputText.split(" ");
    let result = "";
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      if (!OMITTED_WORDS.includes(char)) {
        result += i === 0 ? `${char}` : ` ${char}`;
      }
    }
    return result;
  };

  return (
    <div className="omitter-wrapper">
      <textarea
        placeholder="Type here..."
        value={inputText}
        onChange={handleInputChange}
        data-testid="input-area"
      />
      <div>
        <button onClick={toggleOmitWords} data-testid="action-btn">
          {!omitWords ? "Show All Words" : "Omit Words"}
        </button>
        <button onClick={clearFields} data-testid="clear-btn">
          Clear
        </button>
      </div>
      <div>
        <h2>Output:</h2>
        <p data-testid="output-text">
          {omitWords ? inputText : getProcessedText(inputText)}
        </p>
      </div>
    </div>
  );
}

export default WordOmitter;
