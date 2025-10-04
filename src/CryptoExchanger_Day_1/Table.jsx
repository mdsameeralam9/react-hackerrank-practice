import React, { memo } from "react";

function Table({ updatedCryptocurrencyList = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cryptocurrency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Coins</th>
          </tr>
        </thead>
        <tbody data-testid="exchange-data" className="bg-white divide-y divide-gray-200">
          {updatedCryptocurrencyList.map((item) => (
            <tr key={item.code} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 USD = {item.rate} {item.code}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{item.coins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default memo(Table);
