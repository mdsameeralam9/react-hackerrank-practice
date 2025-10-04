import React, { useState, useMemo } from "react";

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
    if (!inputText.trim()) return "";
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

  const optimisedOmitedText = useMemo(() => getProcessedText(inputText), [inputText])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Word Omitter</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
          <textarea
            placeholder="Type here..."
            value={inputText}
            onChange={handleInputChange}
            data-testid="input-area"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
          />
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={toggleOmitWords} 
            data-testid="action-btn"
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            {!omitWords ? "Show All Words" : "Omit Words"}
          </button>
          <button 
            onClick={clearFields} 
            data-testid="clear-btn"
            className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-700 mb-2">Output:</h2>
          <div className="bg-gray-50 border border-gray-200 rounded p-4 min-h-[100px]">
            <p data-testid="output-text" className="text-gray-700 whitespace-pre-wrap">
              {omitWords ? inputText : optimisedOmitedText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordOmitter;
