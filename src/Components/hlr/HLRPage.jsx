import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../store/userSlice";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants/api";
import { showError } from "../../utils/toast";
import sessionManager from "../../utils/sessionManager";

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
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [progressData, setProgressData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const user = useSelector(selectUser);

  // Fetch HLR progress data
  const fetchProgressData = async () => {
    if (!user?._id) return;
    
    setLoading(true);
    try {
      const token = sessionManager.getToken();
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.HLR_PROGRESS}/${user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProgressData(data.data);
        }
      } else {
        console.error('Failed to fetch HLR progress:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching HLR progress:', error);
      showError('Failed to load HLR progress');
    } finally {
      setLoading(false);
    }
  };

  // Fetch HLR leaderboard data
  const fetchLeaderboardData = async () => {
    setLeaderboardLoading(true);
    try {
      const token = sessionManager.getToken();
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.HLR_LEADERBOARD}?page=1&limit=20`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.leaderboard) {
          setLeaderboardData(data.data.leaderboard);
        }
      } else {
        console.error('Failed to fetch HLR leaderboard:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching HLR leaderboard:', error);
      showError('Failed to load HLR leaderboard');
    } finally {
      setLeaderboardLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
    fetchLeaderboardData();
  }, [user?._id]);

  // Default values for when data is loading
  const pgp = progressData ? 
    { value: progressData.progress.currentPGP, max: progressData.requirements.requiredPGP } : 
    { value: 0, max: 200000 };
  const tgp = progressData ? 
    { value: progressData.progress.currentTGP, max: progressData.requirements.requiredTGP } : 
    { value: 0, max: 6000000 };

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
          <li>One-time reward given at retirement (Age {progressData?.requirements?.retirementAge || 55}).</li>
          <li>Or instantly if qualified and passed away.</li>
          <li>
            Required PGP: <b>{progressData?.requirements?.requiredPGP?.toLocaleString() || '200,000'}</b>
          </li>
          <li>
            Required TGP: <b>{progressData?.requirements?.requiredTGP?.toLocaleString() || '6,000,000'}</b>
          </li>
          <li>
            Reward Amount: <b>AED {progressData?.requirements?.rewardAmount?.toLocaleString() || '60,000'}</b>
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
        {loading ? (
          <div className="text-center text-yellow-300 py-4">
            Loading progress data...
          </div>
        ) : (
          <>
            <ProgressBar label="PGP Progress" value={pgp.value} max={pgp.max} />
            <ProgressBar label="TGP Progress" value={tgp.value} max={tgp.max} />
            <p className="mt-2 italic text-sm text-gray-200">
              ▓▓▓▓▓▓▓▓░░░░{" "}
              {progressData?.progress?.overallProgress ? 
                (progressData.progress.overallProgress * 100).toFixed(0) : 
                (((pgp.value / pgp.max + tgp.value / tgp.max) / 2) * 100).toFixed(0)
              }
              % Complete
            </p>
            {progressData?.qualification && (
              <div className="mt-4 p-3 rounded-lg bg-yellow-900/30">
                <p className="text-sm">
                  <span className={progressData.qualification.isQualified ? "text-green-400" : "text-red-400"}>
                    {progressData.qualification.isQualified ? "✅ Qualified" : "❌ Not Qualified"}
                  </span>
                  {progressData.qualification.isRetirementEligible && (
                    <span className="ml-4 text-green-400">🎂 Retirement Eligible</span>
                  )}
                </p>
              </div>
            )}
          </>
        )}
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
          {leaderboardLoading ? (
            <div className="text-center text-yellow-300 py-4">
              Loading leaderboard...
            </div>
          ) : leaderboardData.length > 0 ? (
            (showAll ? leaderboardData : leaderboardData.slice(0, 5)).map((entry) => (
              <div
                key={entry.rank}
                className="flex justify-between px-4 py-2 border-b border-yellow-900"
              >
                <span>{entry.rank}.</span>
                <span>
                  {entry.name} – {entry.flag} {entry.country}
                </span>
                <span className={entry.isQualified ? "text-green-400" : "text-yellow-400"}>
                  {entry.rewardClaimed
                    ? `AED ${entry.totalPoints?.toLocaleString() || 0}`
                    : entry.status}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-yellow-300 py-4">
              No leaderboard data available
            </div>
          )}
        </div>
        <p className="mt-2 text-sm italic">
          Total Qualified: <b>{leaderboardData.filter(entry => entry.isQualified).length} Members</b>
        </p>
        {leaderboardData.length > 5 && (
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
        <p className="italic">
          💡 Tip: Boost your TGP by mentoring active leaders in your team.
        </p>
      </div>
    </div>
  );
}
