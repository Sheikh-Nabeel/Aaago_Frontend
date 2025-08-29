import React, { useState } from "react";

// Reusable small stat card
const DDRCard = ({ label, amount }) => (
  <div
    className="shadow rounded-xl p-4 flex flex-col items-center w-36 cursor-pointer hover:scale-105 transition-transform"
    style={{
      background: "linear-gradient(135deg, #013220, #083A06)",
      border: "1px solid #FFD700",
      color: "#FFD700",
    }}
  >
    <span className="font-medium text-center">{label}</span>
    <span className="text-lg font-bold">AED {amount.toFixed(2)}</span>
  </div>
);

export default function DDRPage() {
  // Mock Data (replace with API later)
  const totalEarned = 12400;
  const availableBalance = 500;
  const joinDate = "2023-06-01";

  const levelEarnings = [
    {
      level: "L1",
      amount: 500,
      history: [
        { date: "2025-08-01", source: "Ali123", amount: 200 },
        { date: "2025-08-10", source: "Fatima456", amount: 300 },
      ],
    },
    {
      level: "L2",
      amount: 3,
      history: [{ date: "2025-08-05", source: "Zain789", amount: 3 }],
    },
    { level: "L3", amount: 2, history: [] },
    { level: "L4", amount: 1, history: [] },
  ];

  const leaderboard = [
    { rank: 1, name: "Ali Khan", username: "@ali", amount: 15200 },
    { rank: 2, name: "Maria Sohail", username: "@maria", amount: 14750 },
    { rank: 3, name: "Zain Malik", username: "@zain", amount: 13900 },
    { rank: 4, name: "Fatima Noor", username: "@fatima", amount: 13200 },
    { rank: 5, name: "John Smith", username: "@john", amount: 12800 },
    { rank: 6, name: "You", username: "@you", amount: 12400 },
  ];

  const [expandedLevel, setExpandedLevel] = useState(null);

  return (
    <div
      className="w-[95%] mx-auto rounded-lg md:w-[100%] md:min-h-screen mb-10 flex flex-col items-center p-6 mt-20 transition-colors duration-300"
      style={{ backgroundColor: "#083A06", color: "#FFD700" }}
    >
      <h1 className="text-2xl font-bold my-6">
        {" "}
        🌙 DREAM DIVIDEND REWARDS (DDR)
      </h1>

      {/* Header Section */}
      <div
        className="grid grid-cols-3 gap-6 rounded-2xl p-6 w-full max-w-4xl mb-6 shadow-lg text-center"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <div>
          <p className="text-sm">Total Earned (Lifetime)</p>
          <p className="text-3xl font-bold text-yellow-400">
            AED {totalEarned.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm">Available Balance</p>
          <p className="text-3xl font-bold text-yellow-400">
            AED {availableBalance.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm">Joining Date</p>
          <p className="text-3xl font-bold text-yellow-400">{joinDate}</p>
        </div>
      </div>

      {/* Level Earnings Breakdown */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-xl font-bold mb-4">Level Earnings</h2>
        {levelEarnings.map((lvl, idx) => (
          <div
            key={idx}
            className="mb-3 p-4 rounded-lg shadow-lg cursor-pointer"
            style={{
              backgroundColor: "rgba(1, 50, 32, 0.85)",
              border: "1px solid #FFD700",
            }}
            onClick={() => setExpandedLevel(expandedLevel === idx ? null : idx)}
          >
            <div className="flex justify-between">
              <span>{lvl.level} Earned</span>
              <span className="font-bold">AED {lvl.amount}</span>
            </div>

            {/* Expandable History */}
            {expandedLevel === idx && (
              <div className="mt-3 max-h-40 overflow-y-auto text-sm">
                {lvl.history.length > 0 ? (
                  lvl.history.map((h, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-1 border-b border-yellow-700"
                    >
                      <span>{h.date}</span>
                      <span>{h.source}</span>
                      <span className="font-bold">AED {h.amount}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300">No history available.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
        <div
          className="rounded-lg shadow-lg max-h-72 overflow-y-auto"
          style={{
            backgroundColor: "rgba(1, 50, 32, 0.85)",
            border: "1px solid #FFD700",
          }}
        >
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex justify-between px-4 py-2 ${
                entry.name === "You"
                  ? "bg-yellow-900 font-bold sticky top-0"
                  : ""
              }`}
            >
              <span>{entry.rank}</span>
              <span>
                {entry.name}{" "}
                <small className="text-gray-300">{entry.username}</small>
              </span>
              <span>AED {entry.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Tip */}
      <div
        className="rounded-xl p-4 text-center max-w-2xl shadow-lg mb-4"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <p className="italic">
          💡 "Active L1–L4 growth boosts all levels and increases your DDR
          income!"
        </p>
      </div>
    </div>
  );
}
