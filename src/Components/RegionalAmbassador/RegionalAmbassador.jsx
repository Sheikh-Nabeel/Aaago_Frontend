import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../store/userSlice";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants/api";
import { showError } from "../../utils/toast";
import sessionManager from "../../utils/sessionManager";

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
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  
  // State variables for API data
  const [progressData, setProgressData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [globalAmbassadors, setGlobalAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [ambassadorsLoading, setAmbassadorsLoading] = useState(true);

  // Fetch progress data
  const fetchProgressData = async () => {
    try {
      const token = sessionManager.getToken();
      if (!token || !user?._id) return;

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGIONAL_PROGRESS}/${user._id}`, {
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
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
      showError('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch leaderboard data
  const fetchLeaderboardData = async () => {
    try {
      const token = sessionManager.getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGIONAL_LEADERBOARD}?page=1&limit=20`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLeaderboardData(data.data.leaderboard || []);
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      showError('Failed to load leaderboard data');
    } finally {
      setLeaderboardLoading(false);
    }
  };

  // Fetch global ambassadors data
  const fetchGlobalAmbassadors = async () => {
    try {
      const token = sessionManager.getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGIONAL_GLOBAL_AMBASSADORS}?page=1&limit=20`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setGlobalAmbassadors(data.data.ambassadors || []);
        }
      }
    } catch (error) {
      console.error('Error fetching global ambassadors:', error);
      showError('Failed to load global ambassadors');
    } finally {
      setAmbassadorsLoading(false);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    if (user?._id) {
      fetchProgressData();
      fetchLeaderboardData();
      fetchGlobalAmbassadors();
    }
  }, [user?._id]);

  const handleUpdateCountry = async () => {
    const newCountry = prompt("Enter your new country:");
    if (!newCountry || !user?._id) return;

    try {
      const token = sessionManager.getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGIONAL_COUNTRY_UPDATE}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user._id,
          newCountry: newCountry
        })
      });

      if (response.ok) {
        alert("Country update request sent to admin for verification.");
      } else {
        showError('Failed to send country update request');
      }
    } catch (error) {
      console.error('Error updating country:', error);
      showError('Failed to send country update request');
    }
  };

  return (
    <div
      className="w-[95%] mx-auto rounded-lg md:w-[100%] md:min-h-screen flex flex-col items-center p-6 mt-20 mb-10 transition-colors duration-300"
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
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
            <p className="mt-2">Loading earnings...</p>
          </div>
        ) : (
          <>
            <p className="text-lg">Regional Shares: <span className="font-bold">${progressData?.totalEarnings?.regionalShares || '0.00'}</span></p>
            <div className="flex items-center mt-4">
              <img
                src="https://placehold.co/40x40"
                alt="Title Holder"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex items-center">
                <span className="text-2xl mr-2">{progressData?.titleHolder?.flag || '🌍'}</span>
                <div>
                  <p className="font-bold">Title Holder: {progressData?.titleHolder?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-300">Global</p>
                </div>
              </div>
              <button
                className="ml-4 text-sm bg-yellow-700 text-yellow-300 px-2 py-1 rounded-full"
                onClick={() => alert("Total Earnings Info: Regional shares based on performance metrics.")}
              >
                ℹ Info
              </button>
            </div>
          </>
        )}
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
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
            <p className="mt-2">Loading progress...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-2">
              <p className="text-lg flex items-center">
                Your Current Rank: {progressData?.yourProgress?.currentRank?.name || 'N/A'} (Level {progressData?.yourProgress?.currentRank?.level || 'N/A'}){" "}
                <span className="text-2xl ml-2">🌍</span>
              </p>
              <button
                className="ml-4 text-sm bg-yellow-700 text-yellow-300 px-2 py-1 rounded-full"
                onClick={handleUpdateCountry}
              >
                🔄 Update Country
              </button>
            </div>
            <p className="text-lg mb-2">Victory Rank: {progressData?.yourProgress?.victoryRank || 'N/A'}</p>
            <ProgressBar 
              label={`Progress (${progressData?.yourProgress?.progress?.achieved || '0% Achieved'})`} 
              value={progressData?.yourProgress?.progress?.percentage || 0} 
              max={100} 
            />
            {progressData?.yourProgress?.nextRank && (
              <p className="text-sm text-gray-300 mt-2">
                Next Rank: {progressData.yourProgress.nextRank.name} (Requirement: {progressData.yourProgress.nextRank.requirement})
              </p>
            )}
          </>
        )}
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
        {leaderboardLoading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
            <p className="mt-2">Loading leaderboard...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-yellow-700">
                    <th className="py-2 px-4">#</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Username</th>
                    <th className="py-2 px-4">Rank</th>
                    <th className="py-2 px-4">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.length > 0 ? (
                    leaderboardData.map((entry, index) => (
                      <tr
                        key={index}
                        className="border-b border-yellow-700 last:border-none"
                      >
                        <td className="py-2 px-4">{entry.rank}</td>
                        <td className="py-2 px-4 flex items-center">
                          <img
                            src="https://placehold.co/40x40"
                            alt={entry.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          {entry.name} <span className="text-xl ml-2">{entry.flag}</span>
                        </td>
                        <td className="py-2 px-4">{entry.username}</td>
                        <td className="py-2 px-4 flex items-center">
                          <span className="mr-1">{entry.rankIcon}</span>
                          {entry.crrRank}
                        </td>
                        <td className="py-2 px-4">{entry.totalPoints}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-4 text-center text-gray-400">
                        No leaderboard data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
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
        {ambassadorsLoading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
            <p className="mt-2">Loading ambassadors...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {globalAmbassadors.length > 0 ? (
                globalAmbassadors.map((ambassador, index) => (
                  <div
                    key={index}
                    className="flex-none w-64 p-4 rounded-lg"
                    style={{ backgroundColor: "rgba(1, 50, 32, 0.9)" }}
                  >
                    <img
                      src={ambassador.profilePicture || "https://placehold.co/40x40"}
                      alt={ambassador.name}
                      className="w-10 h-10 rounded-full mb-2"
                    />
                    <p className="font-bold">{ambassador.name}</p>
                    <p className="text-sm text-gray-400">@{ambassador.username}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-lg mr-2">{ambassador.flag}</span>
                      <p className="text-sm text-gray-300">{ambassador.country || 'Global'}</p>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="mr-1">{ambassador.rankIcon}</span>
                      <p className="text-sm">{ambassador.rank}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Earnings: ${ambassador.totalEarnings || 0}
                    </p>
                    {ambassador.isPermanent && (
                      <span className="inline-block bg-yellow-600 text-yellow-200 text-xs px-2 py-1 rounded mt-2">
                        Permanent
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-8 text-gray-400">
                  No global ambassadors available
                </div>
              )}
            </div>
          </div>
        )}
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