import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUser,
  checkCurrentUser,
  selectLoading,
} from "../../store/userSlice";
import { SERVER_BASE_URL } from "../../constants/api";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
useEffect(() => {
    dispatch(checkCurrentUser());
  }, []);

  useEffect(() => {
    
    if (!user && !loading) {
      
      dispatch(checkCurrentUser());

    }
  }, [dispatch, user, loading]);

  if (loading || !user) {
    return (
      <div
        className="text-center mt-24"
        style={{
          color: "#FFD700",
          backgroundColor: "#083A06",
          minHeight: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  // Full Name fallback
  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || "N/A";

  // Format createdAt with fallback
  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Not available";

  // Selfie image URL
  const selfieImageUrl = user?.selfieImage
    ? `${SERVER_BASE_URL}/${user.selfieImage}`
    : null;

  return (
    <div
      className="min-h-screen flex flex-col mb-10 items-center justify-center p-6"
      style={{ backgroundColor: "#083A06", color: "#FFD700" }}
    >
      {/* Card Container */}
      <div
        className="relative max-w-md w-full rounded-2xl p-6 shadow-lg"
        style={{
          backgroundColor: "rgba(1, 50, 32, 0.8)",
          border: "1px solid #FFD700",
        }}
      >
        {/* Profile Picture */}
        <div className="flex justify-center">
          {selfieImageUrl ? (
            <div className="relative">
              <img
                src={selfieImageUrl}
                alt="User"
                className="w-28 h-28 rounded-full border-2 shadow-md"
                style={{ borderColor: "#FFD700" }}
                onError={(e) => (e.target.style.display = "none")}
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full ring-2 ring-yellow-400 blur-sm"></div>
            </div>
          ) : (
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-lg font-semibold"
              style={{ backgroundColor: "#013220", color: "#FFD700" }}
            >
              No Img
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="text-center text-2xl font-bold mt-4">{fullName}</h1>

        {/* Joining Date */}
        <p className="text-center text-sm mt-1" style={{ color: "#FFD700" }}>
          Joining Date: {createdAt}
        </p>

        {/* Badge */}
        <div className="mt-4 flex justify-center">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#013220", border: "1px solid #FFD700" }}
          >
            <span className="text-lg">👑</span>
            <span className="font-semibold text-yellow-400">
              Tycoon Starter
            </span>
          </div>
        </div>

        {/* Action Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div
            onClick={() => navigate("/mlm")}
            className="p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #013220, #083A06)",
              border: "1px solid #FFD700",
              color: "#FFD700",
            }}
          >
            <h2 className="font-bold text-lg">My Wallet</h2>
            <p className="text-sm mt-1">
              Check Balance, Transactions, Withdrawals
            </p>
          </div>

          <div
            onClick={() => navigate("/tree")}
            className="p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #FFD700, #b8860b)",
              color: "#013220",
            }}
          >
            <h2 className="font-bold text-lg">My Team</h2>
            <p className="text-sm mt-1">View Directs, Team Stack Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
