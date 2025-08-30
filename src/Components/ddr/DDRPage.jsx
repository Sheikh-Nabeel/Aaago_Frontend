import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMlmDashboard, selectMlmDashboard, selectMlmLoading } from "../../store/mlmSlice";
import { fetchDdrLeaderboard, selectDdrLeaderboard, selectDdrLeaderboardLoading } from "../../store/ddrSlice";
import { selectUser } from "../../store/userSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mlmDashboard = useSelector(selectMlmDashboard);
  const isLoading = useSelector(selectMlmLoading);
  const user = useSelector(selectUser);
  const apiLeaderboard = useSelector(selectDdrLeaderboard);
  const isLeaderboardLoading = useSelector(selectDdrLeaderboardLoading);
  const [expandedLevel, setExpandedLevel] = useState(null);
  
  // Fetch MLM dashboard data and leaderboard on component mount
  useEffect(() => {
    if (!mlmDashboard) {
      dispatch(fetchMlmDashboard());
    }
    
    // Fetch leaderboard data
    dispatch(fetchDdrLeaderboard());
  }, [dispatch, mlmDashboard]);
  
  // Extract data from MLM dashboard
  const totalEarned = mlmDashboard?.ddr?.earnings?.total || 0;
  const availableBalance = mlmDashboard?.wallet?.currentBalance || 0;
  const joinDate = mlmDashboard?.user?.joinedAt ? new Date(mlmDashboard.user.joinedAt).toISOString().split('T')[0] : "";
  
  // Create level earnings array from MLM dashboard data
  const levelEarnings = [
    {
      level: "L1",
      amount: mlmDashboard?.ddr?.earnings?.level1 || 0,
      history: [], // API doesn't provide history yet
    },
    {
      level: "L2",
      amount: mlmDashboard?.ddr?.earnings?.level2 || 0,
      history: [],
    },
    { 
      level: "L3", 
      amount: mlmDashboard?.ddr?.earnings?.level3 || 0, 
      history: [] 
    },
    { 
      level: "L4", 
      amount: mlmDashboard?.ddr?.earnings?.level4 || 0, 
      history: [] 
    },
  ];
  
  // Use API leaderboard data if available, otherwise use placeholder
  const leaderboard = apiLeaderboard?.topEarners && apiLeaderboard.topEarners.length > 0 
    ? apiLeaderboard.topEarners.map((entry) => ({
        rank: entry.rank,
        name: entry.name,
        username: entry.username ? `@${entry.username}` : "",
        amount: entry.earnings,
        isCurrentUser: entry.isCurrentUser || false,
        levelBreakdown: entry.levelBreakdown
      }))
    : [
        { rank: 1, name: "Ali Khan", username: "@ali", amount: 15200 },
        { rank: 2, name: "Maria Sohail", username: "@maria", amount: 14750 },
        { rank: 3, name: "Zain Malik", username: "@zain", amount: 13900 },
        { rank: 4, name: "Fatima Noor", username: "@fatima", amount: 13200 },
        { rank: 5, name: "John Smith", username: "@john", amount: 12800 },
        { rank: 6, name: user?.firstName ? `${user.firstName} ${user.lastName || ''}` : "You", username: user?.username ? `@${user.username}` : "@you", amount: totalEarned, isCurrentUser: true },
      ];
      
  // Get leaderboard title and tip from API if available
  const leaderboardTitle = apiLeaderboard?.title || "Leaderboard";
  const leaderboardTip = apiLeaderboard?.tip || "💡 \"Active L1–L4 growth boosts all levels and increases your DDR income!\"";


  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="w-[95%] mx-auto rounded-lg md:w-[100%] md:min-h-screen mb-10 flex flex-col items-center justify-center p-6 mt-20"
        style={{ backgroundColor: "#083A06", color: "#FFD700" }}>
        <div className="text-2xl font-bold">Loading DDR data...</div>
      </div>
    );
  }

  return (
    <div
      className="w-[95%] mx-auto rounded-lg md:w-[100%] md:min-h-screen mb-10 flex flex-col items-center p-6 mt-20 transition-colors duration-300"
      style={{ backgroundColor: "#083A06", color: "#FFD700" }}
    >
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: "rgba(1, 50, 32, 0.85)",
            border: "1px solid #FFD700",
            color: "#FFD700",
          }}
        >
          ← Back
        </button>
      </div>

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
        <h2 className="text-xl font-bold mb-4">{leaderboardTitle || "Leaderboard"}</h2>
        <div
          className="rounded-lg shadow-lg max-h-72 overflow-y-auto"
          style={{
            backgroundColor: "rgba(1, 50, 32, 0.85)",
            border: "1px solid #FFD700",
          }}
        >
          {isLeaderboardLoading ? (
            <div className="flex justify-center items-center p-6">
              <p>Loading leaderboard data...</p>
            </div>
          ) : leaderboard.length > 0 ? (
            leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex justify-between px-4 py-2 ${
                  entry.isCurrentUser
                    ? "bg-yellow-900 font-bold sticky top-0"
                    : ""
                }`}
              >
                <span>{entry.rank}</span>
                <span>
                  {entry.name}{" "}
                  <small className="text-gray-300">{entry.username}</small>
                </span>
                <span>AED {entry.amount.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center p-6">
              <p>No leaderboard data available</p>
            </div>
          )}
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
          {leaderboardTip}
        </p>
      </div>
    </div>
  );
}
