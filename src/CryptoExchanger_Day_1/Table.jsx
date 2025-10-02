import React, { memo } from "react";

function Table({ updatedCryptocurrencyList = [] }) {
  return (
    <div className="card card-text mt-10 mx-4">
      <table className="mb-0">
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Exchange Rate</th>
            <th>Number of Coins</th>
          </tr>
        </thead>
        <tbody data-testid="exchange-data">
          {updatedCryptocurrencyList.map((item) => (
            <tr key={item.code}>
              <td>{item.name}</td>
              <td>1 USD = {item.rate} {item.code}</td>
              <td>{item.coins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default memo(Table);
