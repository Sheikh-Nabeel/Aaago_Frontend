import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMlmDashboard, selectMlmDashboard, selectMlmLoading } from "../../store/mlmSlice";
import { selectUser } from "../../store/userSlice";

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
  const dispatch = useDispatch();
  const mlmDashboard = useSelector(selectMlmDashboard);
  const isLoading = useSelector(selectMlmLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchMlmDashboard());
  }, [dispatch]);
  
  // Get the earnings data from the dashboard or use zeros if not loaded yet
  const summary = mlmDashboard?.summary || {
    totalEarnings: {
      ddr: 0,
      crr: 0,
      bbr: 0,
      hlr: 0,
      regionalAmbassador: 0,
      countryAmbassador: 0,
      total: 0
    }
  };
  
  const wallet = mlmDashboard?.wallet || {
    currentBalance: 0,
    totalEarnings: 0,
    totalEarned: 0
  };

  const bonusTypes = [
    { label: "DDR", amount: summary.totalEarnings.ddr || 0, link: "/ddr" },
    { label: "CRR", amount: summary.totalEarnings.crr || 0, link: "/crr" },
    { label: "BBR", amount: summary.totalEarnings.bbr || 0, link: "/bbr" },
    { label: "HLR", amount: summary.totalEarnings.hlr || 0, link: "/hlr" },
    { label: "COUNTRY Ambassador", amount: summary.totalEarnings.countryAmbassador || 0, link: "/RegionalAmbassador" },
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
          <p className="text-3xl font-bold text-yellow-400">AED {wallet.totalEarned.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm">Available Balance</p>
          <p className="text-3xl font-bold text-yellow-400">AED {wallet.currentBalance.toFixed(2)}</p>
        </div>
      </div>
      
      {/* User Info */}
      {mlmDashboard?.user && (
        <div
          className="rounded-2xl p-6 w-full max-w-lg mb-6 shadow-lg"
          style={{
            backgroundColor: "rgba(1, 50, 32, 0.85)",
            border: "1px solid #FFD700",
          }}
        >
          <h2 className="text-xl font-bold mb-4">User Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">Username</p>
              <p className="font-bold">{mlmDashboard.user.username}</p>
            </div>
            <div>
              <p className="text-sm">Name</p>
              <p className="font-bold">{mlmDashboard.user.firstName} {mlmDashboard.user.lastName}</p>
            </div>
            <div>
              <p className="text-sm">Sponsor ID</p>
              <p className="font-bold">{mlmDashboard.user.sponsorId}</p>
            </div>
            <div>
              <p className="text-sm">Joined</p>
              <p className="font-bold">{new Date(mlmDashboard.user.joinedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-xl">Loading MLM dashboard data...</p>
        </div>
      )}
      
      {/* Bonus cards */}
      <div className="flex gap-4 flex-wrap justify-center mb-6">
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
