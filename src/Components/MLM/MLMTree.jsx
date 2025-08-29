import React from "react";
import { Link } from "react-router-dom";

const MLMCard = ({ label, amount, link }) => (
  <Link
    to={link}
    className="shadow rounded-xl p-4 flex flex-col items-center w-36 cursor-pointer hover:scale-105 transition-transform"
    style={{
      background: "linear-gradient(135deg, #013220, #083A06)",
      border: "1px solid #FFD700",
      color: "#FFD700",
      textDecoration: "none",
    }}
  >
    <span className="font-medium text-center">{label}</span>
    <span className="text-lg font-bold">AED {amount.toFixed(2)}</span>
  </Link>
);

export default function MLMTree() {
  const bonusTypes = [
    { label: "DDR", amount: 0, link: "/ddr" },
    { label: "CRR", amount: 0, link: "/crr" },
    { label: "BBR", amount: 0, link: "/bbr" },
    { label: "HLR", amount: 0, link: "/hlr" },
    { label: "COUNTRY Ambassador", amount: 0, link: "/RegionalAmbassador" },
  ];

  return (
    <div
      className="min-h-screen mb-10 flex flex-col items-center p-6 mt-20 transition-colors duration-300"
      style={{ backgroundColor: "#083A06", color: "#FFD700" }}
    >
      <h1 className="text-2xl font-bold mb-6">MLM Bonuses</h1>

      {/* Top summary */}
      <div
        className="grid grid-cols-2 gap-6 rounded-2xl p-6 w-full max-w-lg mb-6 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <div>
          <p className="text-sm">Total Earned (Lifetime)</p>
          <p className="text-3xl font-bold text-yellow-400">AED 0.00</p>
        </div>
        <div>
          <p className="text-sm">Available Balance</p>
          <p className="text-3xl font-bold text-yellow-400">AED 0.00</p>
        </div>
      </div>

      {/* Bonus cards */}
      <div className="flex gap-4 flex-wrap justify-center">
        {bonusTypes.map((bonus, idx) => (
          <MLMCard
            key={idx}
            label={bonus.label}
            amount={bonus.amount}
            link={bonus.link}
          />
        ))}
      </div>
    </div>
  );
}
