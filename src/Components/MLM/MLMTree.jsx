import React from "react";

const MLMCard = ({ label, amount }) => (
  <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center w-36">
    <span className="text-gray-500 font-medium text-center">{label}</span>
    <span className="text-lg font-bold">${amount.toFixed(2)}</span>
  </div>
);

export default function MLMTree() {
  const bonusTypes = [
    { label: "DDR", amount: 0 },
    { label: "CRR", amount: 0 },
    { label: "BBR", amount: 0 },
    { label: "HLR", amount: 0 },
    { label: "COUNTRY Ambassador", amount: 0 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">MLM Bonuses</h1>

      {/* Top summary */}
      <div className="grid grid-cols-2 gap-6 bg-white shadow rounded-lg p-6 w-full max-w-lg mb-6">
        <div>
          <p className="text-gray-500">Total Earned (Lifetime)</p>
          <p className="text-3xl font-bold text-gray-800">$0</p>
        </div>
        <div>
          <p className="text-gray-500">Available Balance</p>
          <p className="text-3xl font-bold text-gray-800">$0</p>
        </div>
      </div>

      {/* Bonus cards */}
      <div className="flex gap-4 flex-wrap justify-center">
        {bonusTypes.map((bonus, idx) => (
          <MLMCard key={idx} label={bonus.label} amount={bonus.amount} />
        ))}
      </div>
    </div>
  );
}
