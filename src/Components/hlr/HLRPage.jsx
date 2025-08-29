import React, { useState } from "react";

// Reusable Progress Bar Component
const ProgressBar = ({ label, value, max }) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        <span>
          {value.toLocaleString()} / {max.toLocaleString()} (
          {percent.toFixed(0)}%)
        </span>
      </div>
      <div className="w-full h-4 rounded-full bg-yellow-900 overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function HLRPage() {
  // Mock data (replace with API later)
  const pgp = { value: 120000, max: 200000 };
  const tgp = { value: 4200000, max: 6000000 };

  const leaderboard = [
    { rank: 1, name: "Ali Khan", country: "🇦🇪 UAE", earnings: 60000 },
    { rank: 2, name: "Maria Sohail", country: "🇵🇰 Pakistan", earnings: 60000 },
    {
      rank: 3,
      name: "Zain Malik",
      country: "🇸🇦 Saudi Arabia",
      earnings: 60000,
    },
    { rank: 4, name: "Fatima Noor", country: "🇮🇳 India", earnings: null },
    { rank: 5, name: "John Smith", country: "🇬🇧 UK", earnings: null },
  ];

  const [showAll, setShowAll] = useState(false);

  return (
    <div
      className="w-[95%] mx-auto rounded-lg md:w-[100%] md:min-h-screen flex flex-col items-center p-6 mt-20 transition-colors duration-300 mb-10"
      style={{ backgroundColor: "#083A06", color: "#FFD700" }}
    >
      <h1 className="text-2xl font-bold my-6 text-center">
        🏆 HonorPay Loyalty Rewards (HLR)
      </h1>

      {/* Reward Conditions */}
      <div
        className="rounded-2xl p-6 w-full max-w-5xl mb-8 shadow-lg text-left"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h2 className="text-xl font-bold mb-3">🎯 Reward Conditions</h2>
        <ul className="list-disc ml-6 text-sm leading-6">
          <li>One-time reward given at retirement (Age 55).</li>
          <li>Or instantly if qualified and passed away.</li>
          <li>
            Required PGP: <b>200,000</b>
          </li>
          <li>
            Required TGP: <b>6,000,000</b>
          </li>
        </ul>
      </div>

      {/* Requirements Progress */}
      <div
        className="rounded-2xl p-6 w-full max-w-5xl mb-8 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h2 className="text-xl font-bold mb-4">📊 Your Progress</h2>
        <ProgressBar label="PGP Progress" value={pgp.value} max={pgp.max} />
        <ProgressBar label="TGP Progress" value={tgp.value} max={tgp.max} />
        <p className="mt-2 italic text-sm text-gray-200">
          ▓▓▓▓▓▓▓▓░░░░{" "}
          {(((pgp.value / pgp.max + tgp.value / tgp.max) / 2) * 100).toFixed(0)}
          % Complete
        </p>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-5xl mb-10">
        <h2 className="text-xl font-bold mb-4">
          🏅 Leaderboard – Qualified Members
        </h2>
        <div
          className="rounded-lg shadow-lg max-h-72 overflow-y-auto"
          style={{
            backgroundColor: "rgba(1, 50, 32, 0.85)",
            border: "1px solid #FFD700",
          }}
        >
          {(showAll ? leaderboard : leaderboard.slice(0, 5)).map((entry) => (
            <div
              key={entry.rank}
              className="flex justify-between px-4 py-2 border-b border-yellow-900"
            >
              <span>{entry.rank}.</span>
              <span>
                {entry.name} – {entry.country}
              </span>
              <span>
                {entry.earnings
                  ? `AED ${entry.earnings.toLocaleString()}`
                  : "—"}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm italic">
          Total Qualified: <b>137 Members</b>
        </p>
        <button
          className="mt-3 text-sm underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      {/* Motivational Tip */}
      <div
        className="rounded-xl p-4 text-center max-w-3xl shadow-lg mb-5"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <p className="italic">
          💡 Tip: Boost your TGP by mentoring active leaders in your team.
        </p>
      </div>
    </div>
  );
}
