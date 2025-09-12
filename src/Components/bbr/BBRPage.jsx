import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      <div className="flex justify-between mb-1 text-sm text-yellow-400">
        <span>{label}</span>
        <span>
          {value.toLocaleString()} / {max.toLocaleString()} (
          {percent.toFixed(0)}%)
        </span>
      </div>
      <div className="w-full h-4 rounded-full bg-yellow-900 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2 }}
          className="h-full bg-yellow-400"
        />
      </div>
    </div>
  );
};

export default function BBRPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("3 Days 4 Hours");
  const [pastWins, setPastWins] = useState([]);
  const [pastWinsLoading, setPastWinsLoading] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [campaignLoading, setCampaignLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const user = useSelector(selectUser);

  // Fetch current campaign from API
  const fetchCurrentCampaign = async () => {
    if (!user?._id) return;
    
    setCampaignLoading(true);
    try {
      const token = sessionManager.getToken();
      const response = await fetch(`${API_BASE_URL}/mlm/bbr/current-campaign/${user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setCurrentCampaign(data.data);
        }
      } else {
        console.error('Failed to fetch current campaign:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching current campaign:', error);
      showError('Failed to load current campaign');
    } finally {
      setCampaignLoading(false);
    }
  };

  // Fetch leaderboard from API
  const fetchLeaderboard = async () => {
    setLeaderboardLoading(true);
    try {
      const token = sessionManager.getToken();
      const response = await fetch(`${API_BASE_URL}/mlm/bbr/leaderboard`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setLeaderboardData(data.data);
        }
      } else {
        console.error('Failed to fetch leaderboard:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      showError('Failed to load leaderboard');
    } finally {
      setLeaderboardLoading(false);
    }
  };

  // Fetch past wins from API
  const fetchPastWins = async () => {
    if (!user?._id) return;
    
    setPastWinsLoading(true);
    try {
      const token = sessionManager.getToken();
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BBR_PAST_WINS}/${user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.pastWins) {
          setPastWins(data.data.pastWins);
        }
      } else {
        console.error('Failed to fetch past wins:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching past wins:', error);
      showError('Failed to load past wins');
    } finally {
      setPastWinsLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchCurrentCampaign();
      fetchLeaderboard();
      fetchPastWins();
    }
  }, [user?._id]);

  // Update time left based on current campaign data
  useEffect(() => {
    if (currentCampaign?.currentCampaign?.timeLeft) {
      const { days, hours } = currentCampaign.currentCampaign.timeLeft;
      setTimeLeft(`${days} Days ${hours} Hours`);
    }
  }, [currentCampaign]);



  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      className="w-[95%] mx-auto rounded-lg md:w-[100%] md:min-h-screen mb-5 flex flex-col items-center p-6 pt-20 pb-12 transition-colors duration-300"
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

      {/* Header */}
      <div
        className="w-full md:mt-24 max-w-5xl mb-8  p-6 shadow-lg text-center"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
        }}
      >
        <h2 className="text-3xl font-extrabold flex items-center justify-center gap-2">
          🚀 Bonus Booster Rewards (BBR)
        </h2>
      </div>

      {/* Current Campaign */}
      <div
        className="w-full max-w-5xl mb-8 rounded-2xl p-6 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
          📢 Current Campaign
        </h3>
        {campaignLoading ? (
          <div className="text-center py-4 text-yellow-300">
            Loading campaign data...
          </div>
        ) : currentCampaign?.currentCampaign ? (
          <ul className="space-y-2 text-yellow-300">
            <li>
              <span className="font-semibold">Name:</span> {currentCampaign.currentCampaign.name}
            </li>
            <li>
              <span className="font-semibold">Requirement:</span> {currentCampaign.currentCampaign.requirement} Rides
            </li>
            <li>
              <span className="font-semibold">Duration:</span> {currentCampaign.currentCampaign.duration} Days
            </li>
            <li>
              <span className="font-semibold">Period:</span> {currentCampaign.currentCampaign.period}
            </li>
            <li>
              <span className="font-semibold">Type:</span> {currentCampaign.currentCampaign.type === 'solo' ? 'Solo' : 'Team'}
              {currentCampaign.currentCampaign.newbieRidesOnly && ' (Newbie rides only)'}
            </li>
            <li>
              <span className="font-semibold">Reward:</span> AED {currentCampaign.currentCampaign.reward?.amount || 0}
            </li>
          </ul>
        ) : (
          <div className="text-center py-4 text-yellow-300">
            No active campaign found
          </div>
        )}
      </div>

      {/* Progress Tracker */}
      <div
        className="w-full max-w-5xl mb-8 rounded-2xl p-6 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
          📊 Progress Tracker
        </h3>
        {campaignLoading ? (
          <div className="text-center py-4 text-yellow-300">
            Loading progress data...
          </div>
        ) : currentCampaign?.progress ? (
          <>
            <ProgressBar 
              label="Total Rides" 
              value={currentCampaign.progress.totalRides || 0} 
              max={currentCampaign.currentCampaign?.requirement || 100} 
            />
            <div className="text-yellow-300 space-y-2">
              <p>• Solo Rides: {currentCampaign.progress.soloRides || 0} Rides</p>
              <p>• Team Rides: {currentCampaign.progress.teamRides || 0} Rides</p>
              <p>• Progress: {currentCampaign.progress.progressPercentage || 0}%</p>
              <p>• Rides Needed: {currentCampaign.progress.ridesNeeded || 0} more</p>
              <p className="text-sm">⏳ Time Left: {timeLeft}</p>
              <p className={`text-sm font-semibold ${
                currentCampaign.progress.isQualified ? 'text-green-400' : 'text-red-400'
              }`}>
                {currentCampaign.progress.isQualified ? '✅ Qualified!' : '🔒 Not Qualified Yet'}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-yellow-300">
            No progress data available
          </div>
        )}
      </div>

      {/* Motivation Zone */}
      <div
        className="w-full max-w-5xl mb-8 rounded-2xl p-6 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
          🔥 Motivation Zone
        </h3>
        <div className="text-yellow-300 space-y-2">
          <p>
            • You need <span className="font-semibold">13 more rides/day</span>{" "}
            to win!
          </p>
          <p>• 3 of your newbie team members are active — motivate them!</p>
        </div>
      </div>

      {/* Reward Preview */}
      <div
        className="w-full max-w-5xl mb-8 rounded-2xl p-6 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
          🏅 Reward Preview
        </h3>
        {campaignLoading ? (
          <div className="text-center py-4 text-yellow-300">
            Loading reward data...
          </div>
        ) : currentCampaign?.currentCampaign?.reward ? (
          <>
            <p className="text-yellow-300 font-semibold">
              🎁 AED {currentCampaign.currentCampaign.reward.amount} Bonus
              {currentCampaign.currentCampaign.reward.perks?.length > 0 && 
                ` + ${currentCampaign.currentCampaign.reward.perks.join(', ')}`
              }
            </p>
            <p className={`font-semibold mt-2 ${
              currentCampaign.progress?.isQualified ? 'text-green-400' : 'text-red-400'
            }`}>
              {currentCampaign.progress?.isQualified 
                ? '✅ Reward Unlocked!' 
                : `🔒 Locked until ${currentCampaign.currentCampaign.requirement} rides achieved`
              }
            </p>
          </>
        ) : (
          <div className="text-center py-4 text-yellow-300">
            No reward information available
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-5xl mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
          📈 Leaderboard
        </h3>
        <div
          className="rounded-lg shadow-lg max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-[#013220]"
          style={{
            backgroundColor: "rgba(1, 50, 32, 0.85)",
            border: "1px solid #FFD700",
          }}
        >
          {leaderboardLoading ? (
            <div className="text-center py-8 text-yellow-300">
              Loading leaderboard...
            </div>
          ) : leaderboardData?.leaderboard?.length > 0 ? (
            <table className="w-full text-left text-yellow-400">
              <thead className="sticky top-0 bg-[rgba(1,50,32,1)]">
                <tr className="border-b border-yellow-600">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Rides</th>
                  <th className="p-4">Reward</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.leaderboard.map((participant, i) => (
                  <tr
                    key={i}
                    className={`border-b border-yellow-700/50 hover:bg-yellow-900/20 ${
                      participant.rank === leaderboardData.userPosition?.rank ? "bg-yellow-900/50 font-bold" : ""
                    }`}
                  >
                    <td className="p-4">{participant.rank}</td>
                    <td className="p-4">{participant.name}</td>
                    <td className="p-4 capitalize">{participant.role}</td>
                    <td className="p-4">{participant.rides} rides</td>
                    <td className="p-4">AED {participant.reward}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        participant.status === 'Locked' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                      }`}>
                        {participant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-yellow-300">
              No leaderboard data available
            </div>
          )}
        </div>
      </div>

      {/* Past Booster Wins */}
      <div className="w-full max-w-5xl mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
          📜 Past Booster Wins
        </h3>
        <div
          className="rounded-lg shadow-lg max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-[#013220]"
          style={{
            backgroundColor: "rgba(1, 50, 32, 0.85)",
            border: "1px solid #FFD700",
          }}
        >
          <table className="w-full text-left text-yellow-400">
            <thead className="sticky top-0 bg-[rgba(1,50,32,1)]">
              <tr className="border-b border-yellow-600">
                <th className="p-4">Campaign</th>
                <th className="p-4">Reward</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {pastWinsLoading ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-yellow-300">
                    Loading past wins...
                  </td>
                </tr>
              ) : pastWins.length > 0 ? (
                pastWins.map((win, i) => (
                  <tr
                    key={i}
                    className="border-b border-yellow-700/50 hover:bg-yellow-900/20"
                  >
                    <td className="p-4">{win.name}</td>
                    <td className="p-4">AED {win.reward}</td>
                    <td className="p-4">{formatDate(win.date)}</td>
                    <td className="p-4 text-green-400">{win.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-yellow-300">
                    No past wins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div
        className="rounded-xl p-6 mb-4 text-center max-w-3xl shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.85)",
          border: "1px solid #FFD700",
        }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2 text-yellow-400">
          💡 Tips
        </h3>
        <ul className="list-disc list-inside text-yellow-300 space-y-2">
          <li>✔ Focus on peak hours to get more rides</li>
          <li>✔ Encourage newbie team to stay active</li>
        </ul>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #ffd700;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #013220;
        }
      `}</style>
    </div>
  );
}
