import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCrrRankTracking, selectCrrRankTracking, selectCrrRankTrackingLoading } from "../../store/crrSlice";
import { fetchCrrLeaderboard, selectCrrLeaderboard, selectCrrLeaderboardLoading } from "../../store/crrSlice";
import { selectUser } from "../../store/userSlice";

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

export default function CRRPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const rankTrackingData = useSelector(selectCrrRankTracking);
  const isRankTrackingLoading = useSelector(selectCrrRankTrackingLoading);
  const leaderboardData = useSelector(selectCrrLeaderboard);
  const isLeaderboardLoading = useSelector(selectCrrLeaderboardLoading);
  
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    dispatch(fetchCrrRankTracking());
    dispatch(fetchCrrLeaderboard());
  }, [dispatch]);
  
  // Default values (used when API data is not available)
  const defaultTotalEarned = 0;
  const defaultAvailableBalance = 0;
  const defaultCrrWallet = 0;
  const defaultRanks = [
    { name: "Challenger", bonus: 1000, icon: "🥇", achieved: false },
    { name: "Warrior", bonus: 5000, icon: "🥈", achieved: false },
    { name: "Tycoon", bonus: 20000, icon: "🥉", achieved: false },
    { name: "Champion", bonus: 50000, icon: "🏅", achieved: false },
    { name: "Boss", bonus: 200000, icon: "🎖️", achieved: false },
  ];
  const defaultNextRank = "Challenger";
  const defaultPgp = { value: 0, max: 2500 };
  const defaultTgp = { value: 0, max: 50000 };
  const defaultDaysLeft = 30;
  
  // Extract data from API response or use defaults
  const totalEarned = 6000; // Replace with API data when available
  const availableBalance = 2000; // Replace with API data when available
  const crrWallet = 1500; // Replace with API data when available
  
  // Process rank tracking data
  const ranks = rankTrackingData?.rankTracking?.map(rank => ({
    name: rank.rank,
    bonus: rank.reward,
    icon: rank.icon,
    achieved: rank.isAchieved,
  })) || defaultRanks;
  
  // Find the next rank (first non-achieved rank)
  const nextRankObj = rankTrackingData?.rankTracking?.find(rank => !rank.isAchieved && !rank.isLocked);
  const nextRank = nextRankObj?.rank || defaultNextRank;
  
  // Get PGP and TGP values for the next rank
  const pgp = nextRankObj ? {
    value: nextRankObj.currentPoints.pgp,
    max: nextRankObj.requirements.pgp
  } : defaultPgp;
  
  const tgp = nextRankObj ? {
    value: nextRankObj.currentPoints.tgp,
    max: nextRankObj.requirements.tgp
  } : defaultTgp;
  
  const daysLeft = defaultDaysLeft; // Replace with API data when available
  
  // Process leaderboard data
  const leaderboard = leaderboardData?.topEarners?.map(entry => ({
    rank: entry.position,
    name: entry.name,
    username: `@${entry.username || ''}`,
    userRank: entry.rank,
    rankIcon: entry.rankIcon,
    earnings: entry.earnings,
    isCurrentUser: user && user.name === entry.name
  })) || [
    { rank: 1, name: "Ali Khan", username: "@ali", userRank: 3, earnings: 2000 },
    { rank: 2, name: "Maria Sohail", username: "@maria", userRank: 4, earnings: 3500 },
    { rank: 3, name: "Zain Malik", username: "@zain", userRank: 2, earnings: 1200 },
    { rank: 4, name: "Fatima Noor", username: "@fatima", userRank: 3, earnings: 2000 },
    { rank: 5, name: "John Smith", username: "@john", userRank: 5, earnings: 5000 },
    { rank: 6, name: "You", username: "@you", userRank: 2, earnings: 1800 },
  ];

  return (
    <div
      className="w-[95%] mx-auto rounded-lg md:w-[100%] md:min-h-screen flex flex-col items-center p-6 mt-20 transition-colors duration-300 mb-10"
      style={{ backgroundColor: "#083A06", color: "#FFD700" }}
    >
      {/* Back Button */}
      <div className="w-full max-w-5xl mb-4">
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
        🏆 CRR – Championship Rank Rewards
      </h1>

      {/* Header: Earnings Summary */}
      <div
        className="grid grid-cols-3 gap-6 rounded-2xl p-6 w-full max-w-5xl mb-6 shadow-lg text-center"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <div>
          <p className="text-sm">Total Earned</p>
          <p className="text-3xl font-bold text-yellow-400">
            AED {totalEarned.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm">Available Balance</p>
          <p className="text-3xl font-bold text-yellow-400">
            AED {availableBalance.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm">💰 CRR Wallet</p>
          <p className="text-3xl font-bold text-yellow-400">
            AED {crrWallet.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Rank Progress Tracker */}
      <div className="w-full max-w-5xl mb-10">
        <h2 className="text-xl font-bold mb-4">Ranks Progress</h2>
        {isRankTrackingLoading ? (
          <div className="text-center py-4">Loading rank data...</div>
        ) : (
          <div className="flex justify-between items-center">
            {ranks.map((r, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 shadow-lg ${
                    r.achieved
                      ? "bg-yellow-400 text-black font-bold"
                      : "bg-yellow-900 text-yellow-300"
                  }`}
                >
                  {r.achieved ? "✓" : "⭕"}
                </div>
                <span className="text-sm">
                  {r.icon} {r.name}
                </span>
                <span className="text-xs">AED {r.bonus.toLocaleString()}</span>
                <span className="text-xs italic">
                  {r.achieved ? "Achieved" : "Locked"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Rank Progress */}
      <div
        className="rounded-2xl p-6 w-full max-w-5xl mb-10 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h2 className="text-xl font-bold mb-4">
          Your Journey To Achieve Next Rank: ({nextRank})
        </h2>
        {isRankTrackingLoading ? (
          <div className="text-center py-4">Loading progress data...</div>
        ) : (
          <>
            <ProgressBar label="PGP Progress" value={pgp.value} max={pgp.max} />
            <ProgressBar label="TGP Progress" value={tgp.value} max={tgp.max} />
            <p className="mt-2">⏳ {daysLeft} days left</p>
          </>
        )}
      </div>

      {/* Leaderboard – Rank Achievers */}
      <div className="w-full max-w-5xl mb-10">
        <h2 className="text-xl font-bold mb-4">
          {leaderboardData?.title || "Leaderboard – Rank Achievers"}
        </h2>
        <div
          className="rounded-lg shadow-lg max-h-72 overflow-y-auto"
          style={{
            backgroundColor: "rgba(1, 50, 32, 0.85)",
            border: "1px solid #FFD700",
          }}
        >
          {isLeaderboardLoading ? (
            <div className="text-center py-4">Loading leaderboard data...</div>
          ) : leaderboard.length > 0 ? (
            (showAll ? leaderboard : leaderboard.slice(0, 5)).map((entry) => (
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
                <span>
                  {entry.rankIcon} {entry.userRank}
                </span>
                <span>AED {entry.earnings.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-4">No leaderboard data available</div>
          )}
        </div>
        {leaderboard.length > 5 && (
          <button
            className="mt-3 text-sm underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {/* Motivational Tip */}
      <div
        className="rounded-xl p-4 text-center max-w-3xl shadow-lg mb-5"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <p className="italic ">
          💡 {leaderboardData?.tip || "Tip: Progress is updated hourly or in real-time. Stay consistent!"}
        </p>
      </div>
    </div>
  );
}
