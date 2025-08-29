import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";

// Reusable Progress Bar
const ProgressBar = ({ label, value, max }) => {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        <span>{percent.toFixed(0)}% Achieved</span>
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

export default function RegionalAmbassador() {
  const [user] = useState({
    rank: "Warrior",
    rankNumber: 2,
    country: "Pakistan",
    countryCode: "PK",
    progress: 50,
    racePosition: 17,
  });

  const [regionalLeaderboard] = useState([
    { name: "Ali Khan", username: "@ali_k", rank: "Tycoon", achieved: 98, countryCode: "PK", dp: "https://placehold.co/40x40" },
    { name: "Maria Sohail", username: "@maria_s", rank: "Warrior", achieved: 92, countryCode: "AE", dp: "https://placehold.co/40x40" },
    { name: "Zain Malik", username: "@zmalik", rank: "Warrior", achieved: 88, countryCode: "QA", dp: "https://placehold.co/40x40" },
    { name: "Fatima Noor", username: "@fatima_n", rank: "Tycoon", achieved: 85, countryCode: "PK", dp: "https://placehold.co/40x40" },
    { name: "John Smith", username: "@john_s", rank: "Champion", achieved: 80, countryCode: "AE", dp: "https://placehold.co/40x40" },
    { name: "Sara Ahmed", username: "@sara_a", rank: "Warrior", achieved: 75, countryCode: "QA", dp: "https://placehold.co/40x40" },
    { name: "Omar Saeed", username: "@omar_s", rank: "Tycoon", achieved: 70, countryCode: "QA", dp: "https://placehold.co/40x40" },
    { name: "Aisha Khan", username: "@aisha_k", rank: "Champion", achieved: 65, countryCode: "PK", dp: "https://placehold.co/40x40" },
    { name: "Hassan Ali", username: "@hassan_a", rank: "Warrior", achieved: 60, countryCode: "AE", dp: "https://placehold.co/40x40" },
    { name: "Noor Fatima", username: "@noor_f", rank: "Warrior", achieved: 55, countryCode: "PK", dp: "https://placehold.co/40x40" },
  ]);

  const [globalAmbassadors] = useState([
    { name: "Sheikh Ahmad", country: "UAE", countryCode: "AE", rank: "Tycoon", dp: "https://placehold.co/40x40" },
    { name: "Ahmad Khan", country: "Pakistan", countryCode: "PK", rank: "Tycoon", dp: "https://placehold.co/40x40" },
    { name: "Omar Saeed", country: "Qatar", countryCode: "QA", rank: "Tycoon", dp: "https://placehold.co/40x40" },
  ]);

  const handleUpdateCountry = () => {
    // Placeholder for country update request
    alert("Country update request sent to admin for verification.");
  };

  return (
    <div
      className="w-[95%] mx-auto rounded-lg md:w-[100%] md:min-h-screen flex flex-col items-center p-6 mt-20 mb-10 transition-colors duration-300"
      style={{ backgroundColor: "#083A06", color: "#FFD700" }}
    >
      <h1 className="text-2xl font-bold my-6">
        🏆 Regional Ambassador Program
      </h1>

      {/* Earnings & Title Holder */}
      <div
        className="rounded-2xl p-6 w-full max-w-5xl mb-8 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Total Earnings</h2>
        <p className="text-lg">Regional Shares: <span className="font-bold">$1,250.00</span></p>
        <div className="flex items-center mt-4">
          <img
            src="https://placehold.co/40x40"
            alt="Title Holder"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex items-center">
            <ReactCountryFlag countryCode="AE" svg className="w-6 h-4 mr-2" />
            <div>
              <p className="font-bold">Title Holder: Sheikh Ahmad</p>
              <p className="text-sm text-gray-300">UAE</p>
            </div>
          </div>
          <button
            className="ml-4 text-sm bg-yellow-700 text-yellow-300 px-2 py-1 rounded-full"
            onClick={() => alert("Total Earnings Info: Regional shares based on performance metrics.")}
          >
            ℹ Info
          </button>
        </div>
      </div>

      {/* Your Progress */}
      <div
        className="rounded-2xl p-6 w-full max-w-5xl mb-8 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h2 className="text-xl font-bold mb-4">👤 Your Progress</h2>
        <div className="flex items-center mb-2">
          <p className="text-lg flex items-center">
            Your Current Rank: {user.rank} (Rank {user.rankNumber}){" "}
            <ReactCountryFlag countryCode="PK" svg className="w-6 h-4 ml-2" />
          </p>
          <button
            className="ml-4 text-sm bg-yellow-700 text-yellow-300 px-2 py-1 rounded-full"
            onClick={handleUpdateCountry}
          >
            🔄 Update Country
          </button>
        </div>
        <p className="text-lg mb-2">Victory Rank: Tycoon (Rank 3)</p>
        <ProgressBar label="Progress" value={user.progress} max={100} />
      </div>

      {/* Regional Race Leaderboard */}
      <div
        className="rounded-2xl p-6 w-full max-w-5xl mb-8 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h2 className="text-xl font-bold mb-4">🏁 Regional Race Leaderboard</h2>
        <div
          className="bg-yellow-700 text-yellow-300 px-4 py-2 rounded-lg mb-4 text-center font-bold"
        >
          Your Race Position: #{user.racePosition}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-700">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Achieved %</th>
              </tr>
            </thead>
            <tbody>
              {regionalLeaderboard.map((entry, index) => (
                <tr
                  key={index}
                  className={`border-b border-yellow-700 last:border-none ${
                    entry.name === "Your Name" ? "bg-yellow-800" : ""
                  }`}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 flex items-center">
                    <img
                      src={entry.dp}
                      alt={entry.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {entry.name} <ReactCountryFlag countryCode={entry.countryCode} svg className="w-6 h-4 ml-2" />
                  </td>
                  <td className="py-2 px-4">{entry.username}</td>
                  <td className="py-2 px-4">{entry.rank}</td>
                  <td className="py-2 px-4">{entry.achieved}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Ambassadors */}
      <div
        className="rounded-2xl p-6 w-full max-w-5xl mb-8 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h2 className="text-xl font-bold mb-4">🌍 Global Ambassadors</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {globalAmbassadors.map((ambassador, index) => (
              <div
                key={index}
                className="flex-none w-64 p-4 rounded-lg"
                style={{ backgroundColor: "rgba(1, 50, 32, 0.9)" }}
              >
                <img
                  src={ambassador.dp}
                  alt={ambassador.name}
                  className="w-10 h-10 rounded-full mb-2"
                />
                <p className="font-bold">{ambassador.name}</p>
                <div className="flex items-center">
                  <ReactCountryFlag countryCode={ambassador.countryCode} svg className="w-6 h-4 mr-2" />
                  <p className="text-sm text-gray-300">{ambassador.country}</p>
                </div>
                <p className="text-sm">{ambassador.rank}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Tip */}
      <div
        className="rounded-xl p-4 text-center max-w-3xl shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <p className="italic">
          💡 Tip: Ambassadors play a key role in expanding our network. Keep
          pushing to climb the ranks!
        </p>
      </div>
    </div>
  );
}