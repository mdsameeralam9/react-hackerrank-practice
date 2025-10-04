import React, { useMemo, useState, useCallback } from "react";
import Table from "./Table";
import { cryptocurrencyList } from "./cryptocurrency-list";

function CryptoExchanger() {
  const [inputValue, setInputValue] = useState("");              // string from input
  const [touched, setTouched] = useState(false);                 // replaces isMountPhase
  const availableBalance = 17042.67;

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    if (!touched) setTouched(true);
    setInputValue(value);
  }, [touched]);

  // Parse once to a number; NaN if invalid
  const amount = useMemo(() => Number(inputValue), [inputValue]);

  // Validation rules
  const errorMessage = useMemo(() => {
    // Empty input
    if (!inputValue) {
      return touched ? "Amount cannot be empty" : "";
    }
    if (Number.isNaN(amount)) {
      return "Amount must be a valid number";
    }
    if (amount <= 0.01) {                                      // 1 cent
      return "Amount must be greater than $0.01";
    }
    if (amount > availableBalance) {
      return "Amount cannot exceed the available balance";
    }
    return "";
  }, [inputValue, amount, availableBalance, touched]);          // include all deps

  const calculateNumberOfCoins = useCallback((exchangeRate, amountNum) => {
    if (Number.isNaN(amountNum)) return "n/a";
    const coinsNum = amountNum * Number(exchangeRate);
    if (!Number.isFinite(coinsNum)) return "n/a";
    return coinsNum.toFixed(8);                                 // string as display
  }, []);

  // Build display list; stable and recalculates only when needed
  const updatedCryptocurrencyList = useMemo(() => {
    // When no amount or there is an error, show default strings
    const showZero = !inputValue && touched;
    const showNA = !!errorMessage && inputValue;                // invalid but typed
    return cryptocurrencyList.map((item) => {
      let coins = "0.00000000";
      if (showNA) {
        coins = "n/a";
      } else if (!errorMessage && inputValue) {
        coins = calculateNumberOfCoins(item.rate, amount);
      } else if (showZero) {
        coins = "0.00000000";
      }
      return { ...item, coins };
    });
  }, [cryptocurrencyList, inputValue, amount, errorMessage, touched, calculateNumberOfCoins]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">CryptoRank Exchange</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="text-gray-700">I want to exchange $</span>
          <input
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-24 text-center"
            data-testid="amount-input"
            required
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={inputValue}
            onChange={handleChange}
          />
          <span className="text-gray-700">of my ${availableBalance}</span>
        </div>
        {errorMessage && (
          <p data-testid="error" className="text-red-600 text-sm mt-3 text-center">
            {errorMessage}
          </p>
        )}
      </div>
      
      <Table updatedCryptocurrencyList={updatedCryptocurrencyList} />
    </div>
  );
}

export default CryptoExchanger;