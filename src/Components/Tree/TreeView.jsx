import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchReferralTree,
  selectReferralTree,
  selectReferralTreeLoading,
  selectReferralTreeError,
  selectUser,
  selectToken,
  selectIsAuthenticated,
  resetReferralTreeAttempt,
} from "../../store/userSlice";
import sessionManager from "../../utils/sessionManager";
import { authAPI } from "../../services/api";
import { SERVER_BASE_URL } from "../../constants/api";

const MLMTree = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const referralTree = useSelector(selectReferralTree);
  const loading = useSelector(selectReferralTreeLoading);
  const error = useSelector(selectReferralTreeError);
  const currentUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [selectedMember, setSelectedMember] = useState(null);
  const [sessionValid, setSessionValid] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [memberTreeData, setMemberTreeData] = useState(null);
  const [memberTreeLoading, setMemberTreeLoading] = useState(false);
  const [memberTreeError, setMemberTreeError] = useState(null);
  const [treeHistory, setTreeHistory] = useState([]);
  const [isLoadingSpecificUser, setIsLoadingSpecificUser] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMember, setPopupMember] = useState(null);
  const [popupMemberDetails, setPopupMemberDetails] = useState(null);
  const [popupReferralLevels, setPopupReferralLevels] = useState([]);
  const [levelMembersDetails, setLevelMembersDetails] = useState({}); // New state for storing user details
  const [levelMembersLoading, setLevelMembersLoading] = useState(false); // New state for loading user details
  const [levelMembersError, setLevelMembersError] = useState(null); // New state for user details errors

  const checkSessionValidity = () => {
    const sessionToken = sessionManager.getToken();
    const sessionUser = sessionManager.getUser();
    const sessionIsAuth = sessionManager.isAuthenticated();
    const isValid = !!(sessionToken && sessionUser && sessionIsAuth);
    setSessionValid(isValid);
    console.log("MLMTree - Session validity check:", {
      sessionToken: !!sessionToken,
      sessionUser: !!sessionUser,
      sessionIsAuth,
      isValid,
    });
    return isValid;
  };

  const loadSpecificUserTree = async (targetUserId) => {
    try {
      setIsLoadingSpecificUser(true);
      setMemberTreeError(null);
      console.log("Loading specific user tree for:", targetUserId);
      const response = await authAPI.getReferralTree(targetUserId);
      console.log("Specific user tree response:", response.data);
      setMemberTreeData(response.data);
      setSelectedMember(response.data.referralTree?.user || response.data.user);
      if (response.data.referralTree?.user || response.data.user) {
        const newHistory = [
          ...treeHistory,
          { member: response.data.referralTree?.user || response.data.user },
        ];
        setTreeHistory(newHistory);
        sessionStorage.setItem("treeHistory", JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error("Error loading specific user tree:", error);
      setMemberTreeError(
        error.response?.data?.message || "Failed to load user tree"
      );
    } finally {
      setIsLoadingSpecificUser(false);
    }
  };

  const fetchReferralLink = async () => {
    try {
      const response = await authAPI.getReferralLink();
      setReferralLink(response.data.referralLink);
      return response.data.referralLink;
    } catch (error) {
      console.error("Error fetching referral link:", error);
      setCopySuccess(false);
      alert("Failed to fetch referral link. Please try again.");
      return null;
    }
  };

  const handleShareReferralLink = async () => {
    try {
      const link = referralLink || (await fetchReferralLink());
      if (link) {
        await navigator.clipboard.writeText(link);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      console.error("Error copying referral link:", error);
      setCopySuccess(false);
      alert("Failed to copy referral link. Please try again.");
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await authAPI.getUserById(userId);
      return response.data.user;
    } catch (error) {
      console.error(`Error fetching details for user ${userId}:`, error);
      return null;
    }
  };

  const fetchLevelMembersDetails = async (members) => {
    setLevelMembersLoading(true);
    setLevelMembersError(null);
    try {
      const userDetailsPromises = members.map(async (member) => {
        if (levelMembersDetails[member.id]) {
          return { id: member.id, details: levelMembersDetails[member.id] };
        }
        const details = await fetchUserDetails(member.id);
        return { id: member.id, details };
      });
      const userDetailsArray = await Promise.all(userDetailsPromises);
      const newLevelMembersDetails = userDetailsArray.reduce((acc, { id, details }) => {
        if (details) acc[id] = details;
        return acc;
      }, { ...levelMembersDetails });
      setLevelMembersDetails(newLevelMembersDetails);
    } catch (error) {
      console.error("Error fetching level members details:", error);
      setLevelMembersError("Failed to load member details");
    } finally {
      setLevelMembersLoading(false);
    }
  };

  const handleViewDetail = async (member) => {
    try {
      setPopupMember(member);
      setShowPopup(true);
      const userResponse = await authAPI.getUserById(member.id);
      setPopupMemberDetails(userResponse.data.user);
      const treeResponse = await authAPI.getReferralTree(member.id);
      const membersData =
        treeResponse.data.referralTree?.members ||
        treeResponse.data.referralTree?.levels?.members ||
        treeResponse.data.members ||
        {};
      const allLevelMembers = Object.keys(membersData)
        .filter((key) => key.startsWith("level"))
        .reduce((acc, levelKey) => {
          return [...acc, ...membersData[levelKey]];
        }, []);
      const levelMembersDetails = await Promise.all(
        allLevelMembers.map(async (levelMember) => {
          try {
            const levelUserResponse = await authAPI.getUserById(levelMember.id);
            return levelUserResponse.data.user;
          } catch (error) {
            console.error(
              `Error fetching details for user ${levelMember.id}:`,
              error
            );
            return { ...levelMember, selfieImage: null };
          }
        })
      );
      setPopupReferralLevels(levelMembersDetails);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setPopupMemberDetails(null);
      setPopupReferralLevels([]);
      alert("Failed to load member details. Please try again.");
    }
  };

  const handleNavigateToMemberTree = (member) => {
    const newHistory = [...treeHistory, { member }];
    setTreeHistory(newHistory);
    sessionStorage.setItem("treeHistory", JSON.stringify(newHistory));
    navigate(`/user-tree/${member.id}`);
  };

  const handleNavigateToHistory = (index) => {
    const historyItem = treeHistory[index];
    if (historyItem) {
      const newHistory = treeHistory.slice(0, index + 1);
      setTreeHistory(newHistory);
      sessionStorage.setItem("treeHistory", JSON.stringify(newHistory));
      navigate(`/user-tree/${historyItem.member.id}`);
    }
  };

  const handleBackToMainTree = () => {
    setTreeHistory([]);
    sessionStorage.removeItem("treeHistory");
    navigate("/mlm");
  };

  useEffect(() => {
    console.log("MLMTree component mounted");
    console.log("Current token:", token);
    console.log("Current user:", currentUser);
    console.log("Is authenticated:", isAuthenticated);
    console.log("URL userId:", userId);

    const isValid = checkSessionValidity();
    if (isValid) {
      if (userId) {
        console.log("Loading specific user tree from URL");
        loadSpecificUserTree(userId);
      } else {
        console.log("Dispatching fetchReferralTree with valid session");
        dispatch(fetchReferralTree());
        fetchReferralLink();
      }
    } else {
      console.log("No valid session found, skipping API call");
    }
  }, [dispatch, token, currentUser, isAuthenticated, userId]);

  useEffect(() => {
    if (userId && sessionValid && isAuthenticated) {
      console.log("URL userId changed, loading specific user tree");
      loadSpecificUserTree(userId);
    }
  }, [userId, sessionValid, isAuthenticated]);

  useEffect(() => {
    const handleSessionCleared = (event) => {
      console.log("MLMTree - Session cleared event received:", event.detail);
      setSessionValid(false);
      dispatch(resetReferralTreeAttempt());
    };
    window.addEventListener("sessionCleared", handleSessionCleared);
    return () =>
      window.removeEventListener("sessionCleared", handleSessionCleared);
  }, [dispatch]);

  useEffect(() => {
    const savedHistory = sessionStorage.getItem("treeHistory");
    if (savedHistory) {
      try {
        setTreeHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error parsing tree history:", error);
        sessionStorage.removeItem("treeHistory");
      }
    }
  }, []);

  useEffect(() => {
    const isViewingSpecificUser = !!userId;
    const currentTreeData = isViewingSpecificUser ? memberTreeData : referralTree;
    const membersData =
      currentTreeData?.referralTree?.members ||
      currentTreeData?.referralTree?.levels?.members ||
      currentTreeData?.members ||
      {};
    const currentLevelMembers = membersData[`level${selectedLevel}`] || [];
    if (currentLevelMembers.length > 0) {
      fetchLevelMembersDetails(currentLevelMembers);
    } else {
      setLevelMembersDetails({});
    }
  }, [selectedLevel, memberTreeData, referralTree]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (!sessionValid || !isAuthenticated || !currentUser) {
    return (
      <div
        className="min-h-screen mt-18"
        style={{
          backgroundColor: "#083A06",
        }}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#FFD700" }}
            >
              Authentication Required
            </h2>
            <p className="text-lg mb-6" style={{ color: "#FFD700" }}>
              {sessionValid
                ? "Please log in to view your referral tree."
                : "Your session has expired. Please log in again."}
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: "#FFD700", color: "#013220" }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || isLoadingSpecificUser || levelMembersLoading) {
    return (
      <div
        className="min-h-screen mt-28"
        style={{
          backgroundColor: "#083A06",
        }}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"
              style={{ borderColor: "#FFD700" }}
            ></div>
            <p className="text-xl" style={{ color: "#FFD700" }}>
              {userId
                ? "Loading user tree..."
                : levelMembersLoading
                ? "Loading member details..."
                : "Loading your referral tree..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || memberTreeError || levelMembersError) {
    return (
      <div
        className="min-h-screen mt-28"
        style={{
          backgroundColor: "#083A06",
        }}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#FFD700" }}
            >
              Error Loading Referral Tree
            </h2>
            <p className="text-lg mb-6" style={{ color: "#FFD700" }}>
              {memberTreeError || error || levelMembersError}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  if (userId) {
                    loadSpecificUserTree(userId);
                  } else {
                    dispatch(fetchReferralTree());
                  }
                }}
                className="px-6 py-2 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: "#FFD700", color: "#013220" }}
              >
                Try Again
              </button>
              <button
                onClick={handleBackToMainTree}
                className="px-6 py-2 rounded-lg font-semibold transition-colors"
                style={{
                  backgroundColor: "#013220",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                }}
              >
                Back to Main Tree
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isViewingSpecificUser = !!userId;
  const currentTreeData = isViewingSpecificUser ? memberTreeData : referralTree;

  const membersData =
    currentTreeData?.referralTree?.members ||
    currentTreeData?.referralTree?.levels?.members ||
    currentTreeData?.members ||
    {};
  const countsData =
    currentTreeData?.referralTree?.counts ||
    currentTreeData?.referralTree?.levels?.counts ||
    currentTreeData?.counts ||
    {};
  const levelsAvailable = Object.keys(membersData)
    .filter((key) => key.startsWith("level"))
    .map((key) => parseInt(key.replace("level", ""), 10))
    .sort((a, b) => a - b);
  const currentLevelMembers = membersData[`level${selectedLevel}`] || [];
  const displayUser = isViewingSpecificUser
    ? selectedMember
    : referralTree?.referralTree?.user || referralTree?.user || currentUser;

  if (
    !currentTreeData ||
    (!currentTreeData.referralTree && !currentTreeData.members)
  ) {
    return (
      <div
        className="min-h-screen mt-28"
        style={{
          backgroundColor: "#083A06",
        }}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#FFD700" }}
            >
              No Referral Tree Data
            </h2>
            <p className="text-lg mb-6" style={{ color: "#FFD700" }}>
              {userId
                ? "This user's referral tree data is not available."
                : "Your referral tree data is not available."}
            </p>
            <button
              onClick={() => {
                if (userId) {
                  loadSpecificUserTree(userId);
                } else {
                  dispatch(fetchReferralTree());
                }
              }}
              className="px-6 py-2 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: "#FFD700", color: "#013220" }}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen mt-20 mb-10"
      style={{
        backgroundColor: "#083A06",
      }}
    >
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* General Back Button */}
        {!userId && (
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              style={{ backgroundColor: "#FFD700", color: "#013220" }}
            >
              ← Back
            </button>
          </div>
        )}
        
        {userId && (
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                if (treeHistory.length > 0) {
                  const lastItem = treeHistory[treeHistory.length - 1];
                  const newHistory = treeHistory.slice(0, -1);
                  setTreeHistory(newHistory);
                  sessionStorage.setItem(
                    "treeHistory",
                    JSON.stringify(newHistory)
                  );
                  navigate(`/user-tree/${lastItem.member.id}`);
                } else {
                  handleBackToMainTree();
                }
              }}
              className="px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              style={{ backgroundColor: "#FFD700", color: "#013220" }}
            >
              Back
            </button>
            <button
              onClick={handleBackToMainTree}
              className="px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              style={{ backgroundColor: "#FFD700", color: "#013220" }}
            >
              Back to Main Tree
            </button>
            {treeHistory.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ color: "#FFD700" }}>History:</span>
                {treeHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigateToHistory(index)}
                    className="text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    {item.member.name || item.member.username} {">"}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm"
          style={{ border: "1px solid #FFD700" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {displayUser?.selfieImage ? (
              <img
                src={`${SERVER_BASE_URL}${displayUser.selfieImage}`}
                alt="Selfie"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                style={{ border: "2px solid #FFD700" }}
              />
            ) : (
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#013220",
                  border: "2px solid #FFD700",
                }}
              >
                <span
                  className="text-2xl sm:text-3xl"
                  style={{ color: "#FFD700" }}
                >
                  {displayUser?.name?.charAt(0) ||
                    displayUser?.firstName?.charAt(0) ||
                    displayUser?.username?.charAt(0) ||
                    "U"}
                </span>
              </div>
            )}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Name:{" "}
                  </span>
                  <span style={{ color: "#FFD700" }}>
                    {displayUser?.name ||
                      (displayUser?.firstName && displayUser?.lastName
                        ? `${displayUser.firstName} ${displayUser.lastName}`
                        : "N/A")}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Username:{" "}
                  </span>
                  <span style={{ color: "#FFD700" }}>
                    {displayUser?.username || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Team Members:{" "}
                  </span>
                  <span style={{ color: "#FFD700" }}>
                    {countsData?.totalReferrals || 0}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    KYC Status:{" "}
                  </span>
                  <span style={{ color: "#FFD700" }}>
                    {displayUser?.kycStatus || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Country:{" "}
                  </span>
                  <span style={{ color: "#FFD700" }}>
                    {displayUser?.country || "N/A"}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleShareReferralLink}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                    copySuccess ? "bg-green-500" : "bg-yellow-400"
                  }`}
                  style={{ color: "#013220" }}
                >
                  {copySuccess ? "Link Copied!" : "Share Referral Link"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-nowrap gap-1 sm:gap-2 md:gap-4 mb-6 sm:mb-8 justify-center overflow-x-auto">
          {levelsAvailable.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
                selectedLevel === level ? "text-green-900" : "text-yellow-400"
              }`}
              style={{
                backgroundColor:
                  selectedLevel === level ? "#FFD700" : "transparent",
                border: selectedLevel === level ? "none" : "1px solid #FFD700",
              }}
            >
              Level {level} ({countsData?.[`level${level}`] || 0})
            </button>
          ))}
        </div>

        <div
          className="bg-white bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-sm"
          style={{ border: "1px solid #FFD700" }}
        >
          <div className="block sm:hidden">
            {currentLevelMembers.length > 0 ? (
              <div className="p-4 space-y-3">
                {currentLevelMembers.map((member, index) => (
                  <div
                    key={member.id || index}
                    className="bg-white bg-opacity-5 rounded-lg p-3 border border-yellow-400 border-opacity-30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {levelMembersDetails[member.id]?.selfieImage ? (
                        <img
                          src={`${SERVER_BASE_URL}${levelMembersDetails[member.id].selfieImage}`}
                          alt="Selfie"
                          className="w-10 h-10 rounded-full object-cover"
                          style={{ border: "1px solid #FFD700" }}
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: "#013220",
                            border: "1px solid #FFD700",
                          }}
                        >
                          <span
                            className="text-sm"
                            style={{ color: "#FFD700" }}
                          >
                            {member.name?.charAt(0) ||
                              member.username?.charAt(0) ||
                              "U"}
                          </span>
                        </div>
                      )}
                      <span style={{ color: "#FFD700" }}>
                        {member.name || member.username || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span
                          className="font-semibold"
                          style={{ color: "#FFD700" }}
                        >
                          ID:
                        </span>{" "}
                        <span style={{ color: "#FFD700" }}>
                          {String(index + 1).padStart(3, "0")}
                        </span>
                      </div>
                      <div>
                        <span
                          className="font-semibold"
                          style={{ color: "#FFD700" }}
                        >
                          Level:
                        </span>{" "}
                        <span style={{ color: "#FFD700" }}>
                          {member.level || 0}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span
                          className="font-semibold"
                          style={{ color: "#FFD700" }}
                        >
                          Name:
                        </span>{" "}
                        <span style={{ color: "#FFD700" }}>
                          {member.name || "N/A"}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span
                          className="font-semibold"
                          style={{ color: "#FFD700" }}
                        >
                          Username:
                        </span>{" "}
                        <span style={{ color: "#FFD700" }}>
                          {member.username || "N/A"}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span
                          className="font-semibold"
                          style={{ color: "#FFD700" }}
                        >
                          Created At:
                        </span>{" "}
                        <span style={{ color: "#FFD700" }}>
                          {formatDate(member.joinedDate)}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <span
                          className="font-semibold"
                          style={{ color: "#FFD700" }}
                        >
                          TGP:
                        </span>{" "}
                        <div className="flex items-center justify-cen">
                          <div className="mb-1 text-[#FFD700]">0</div>
                          <img
                            className="w-[7%] h-[7%]"
                            src="/images.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <span
                          className="font-semibold"
                          style={{ color: "#FFD700" }}
                        >
                          PGP:
                        </span>{" "}
                        <div className="flex items-center justify-cen">
                          <div className="mb-1 text-[#FFD700]">0</div>
                          <img
                            className="w-[7%] h-[7%]"
                            src="/images.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span
                          className="font-semibold"
                          style={{ color: "#FFD700" }}
                        >
                          Total Amount:
                        </span>{" "}
                        <span style={{ color: "#FFD700" }}>AED 0</span>
                      </div>
                      <div className="col-span-2 flex gap-2">
                        <button
                          onClick={() => handleViewDetail(member)}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors underline text-xs"
                        >
                          View Detail
                        </button>
                        <button
                          onClick={() => handleNavigateToMemberTree(member)}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors underline text-xs"
                        >
                          View Tree
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="p-4 text-center text-xs"
                style={{ color: "#FFD700" }}
              >
                No members found in Level {selectedLevel}
              </div>
            )}
          </div>

          <div className="hidden sm:block overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr
                  style={{
                    backgroundColor: "#013220",
                    borderBottom: "1px solid #FFD700",
                  }}
                >
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-12 sm:w-16"
                    style={{ color: "#FFD700" }}
                  >
                    Image
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-12 sm:w-16"
                    style={{ color: "#FFD700" }}
                  >
                    ID
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-20 sm:w-32"
                    style={{ color: "#FFD700" }}
                  >
                    Name
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-20 sm:w-32"
                    style={{ color: "#FFD700" }}
                  >
                    Username
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-12 sm:w-20"
                    style={{ color: "#FFD700" }}
                  >
                    Rank
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-16 sm:w-24"
                    style={{ color: "#FFD700" }}
                  >
                    TGP
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-16 sm:w-24"
                    style={{ color: "#FFD700" }}
                  >
                    PGP
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-16 sm:w-24"
                    style={{ color: "#FFD700" }}
                  >
                    Created At
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-16 sm:w-24"
                    style={{ color: "#FFD700" }}
                  >
                    Total Amount
                  </th>
                  <th
                    className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-24 sm:w-32"
                    style={{ color: "#FFD700" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentLevelMembers.length > 0 ? (
                  currentLevelMembers.map((member, index) => (
                    <tr
                      key={member.id || index}
                      className="hover:bg-opacity-20 hover:bg-yellow-400 transition-colors"
                      style={{ borderBottom: "1px solid #FFD700" }}
                    >
                      <td
                        className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-12 sm:w-16"
                        style={{ color: "#FFD700" }}
                      >
                        {levelMembersDetails[member.id]?.selfieImage ? (
                          <img
                            src={`${SERVER_BASE_URL}${levelMembersDetails[member.id].selfieImage}`}
                            alt="Selfie"
                            className="w-10 h-10 rounded-full object-cover"
                            style={{ border: "1px solid #FFD700" }}
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: "#013220",
                              border: "1px solid #FFD700",
                            }}
                          >
                            <span
                              className="text-sm"
                              style={{ color: "#FFD700" }}
                            >
                              {member.name?.charAt(0) ||
                                member.username?.charAt(0) ||
                                "U"}
                            </span>
                          </div>
                        )}
                      </td>
                      <td
                        className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-12 sm:w-16"
                        style={{ color: "#FFD700" }}
                      >
                        {String(index + 1).padStart(3, "0")}
                      </td>
                      <td
                        className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-20 sm:w-32"
                        style={{ color: "#FFD700" }}
                      >
                        {member.name || "N/A"}
                      </td>
                      <td
                        className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-20 sm:w-32"
                        style={{ color: "#FFD700" }}
                      >
                        {member.username || "N/A"}
                      </td>
                      <td
                        className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-12 sm:w-20"
                        style={{ color: "#FFD700" }}
                      >
                        {member.level || 0}
                      </td>
                      <td
                        className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-16 sm:w-24"
                        style={{ color: "#FFD700" }}
                      >
                        <div className="flex items-center justify-cen">
                          <div className="mb-1">0</div>
                          <img
                            className="w-[25%] h-[25%]"
                            src="/images.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td
                        className="px-1 mt-3 flex items-center justify-center sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-16 sm:w-24"
                        style={{ color: "#FFD700" }}
                      >
                        <div className="mb-1">0</div>
                        <img width="50%" src="/images.png" alt="" />
                      </td>
                      <td
                        className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-16 sm:w-24"
                        style={{ color: "#FFD700" }}
                      >
                        {formatDate(member.joinedDate)}
                      </td>
                      <td
                        className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-16 sm:w-24"
                        style={{ color: "#FFD700" }}
                      >
                        AED 0
                      </td>
                      <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 w-24 sm:w-32">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetail(member)}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors underline text-xs sm:text-sm md:text-base"
                          >
                            View Detail
                          </button>
                          <button
                            onClick={() => handleNavigateToMemberTree(member)}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors underline text-xs sm:text-sm md:text-base"
                          >
                            View Tree
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="px-2 sm:px-3 md:px-6 py-4 sm:py-6 md:py-8 text-center text-xs sm:text-sm md:text-base"
                      style={{ color: "#FFD700" }}
                    >
                      No members found in Level {selectedLevel}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showPopup && popupMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-md w-full"
              style={{ border: "1px solid #FFD700" }}
            >
              <h2
                className="text-xl font-bold mb-4 text-center"
                style={{ color: "#FFD700" }}
              >
                Member Details
              </h2>
              <div className="grid grid-cols-1 gap-3 text-sm">
                {popupMemberDetails?.selfieImage ? (
                  <div className="flex justify-center mb-4">
                    <img
                      src={`${SERVER_BASE_URL}${popupMemberDetails.selfieImage}`}
                      alt="Selfie"
                      className="w-32 h-32 rounded-full object-cover"
                      style={{ border: "2px solid #FFD700" }}
                    />
                  </div>
                ) : (
                  <div
                    className="flex justify-center mb-4 w-32 h-32 rounded-full items-center"
                    style={{
                      backgroundColor: "#013220",
                      border: "2px solid #FFD700",
                    }}
                  >
                    <span className="text-2xl" style={{ color: "#FFD700" }}>
                      {popupMember?.name?.charAt(0) ||
                        popupMember?.username?.charAt(0) ||
                        "U"}
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Level:
                  </span>{" "}
                  <span style={{ color: "#FFD700" }}>
                    {popupMember.level || 0}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Name:
                  </span>{" "}
                  <span style={{ color: "#FFD700" }}>
                    {popupMember.name || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Username:
                  </span>{" "}
                  <span style={{ color: "#FFD700" }}>
                    {popupMember.username || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Email:
                  </span>{" "}
                  <span style={{ color: "#FFD700" }}>
                    {popupMember.email || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    KYC Status:
                  </span>{" "}
                  <span style={{ color: "#FFD700" }}>
                    {popupMember.kycStatus || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Created At:
                  </span>{" "}
                  <span style={{ color: "#FFD700" }}>
                    {formatDate(popupMember.joinedDate)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#FFD700" }}>
                    Total Amount:
                  </span>{" "}
                  <span style={{ color: "#FFD700" }}>AED 0</span>
                </div>
                {popupReferralLevels.length > 0 && (
                  <div>
                    <span
                      className="font-semibold"
                      style={{ color: "#FFD700" }}
                    >
                      Referral Levels:
                    </span>
                    <div className="mt-2 max-h-40 overflow-y-auto">
                      {popupReferralLevels.map((levelMember, index) => (
                        <div
                          key={levelMember.id || index}
                          className="flex items-center gap-2 mb-2"
                        >
                          {levelMember.selfieImage ? (
                            <img
                              src={`${SERVER_BASE_URL}${levelMember.selfieImage}`}
                              alt="Selfie"
                              className="w-10 h-10 rounded-full object-cover"
                              style={{ border: "1px solid #FFD700" }}
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: "#013220",
                                border: "1px solid #FFD700",
                              }}
                            >
                              <span
                                className="text-sm"
                                style={{ color: "#FFD700" }}
                              >
                                {levelMember.name?.charAt(0) ||
                                  levelMember.username?.charAt(0) ||
                                  "U"}
                              </span>
                            </div>
                          )}
                          <div>
                            <span style={{ color: "#FFD700" }}>
                              {levelMember.name ||
                                levelMember.username ||
                                "Unknown"}
                            </span>
                            <span
                              className="text-xs ml-2"
                              style={{ color: "#FFD700" }}
                            >
                              (Level {levelMember.level || "N/A"})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => handleNavigateToMemberTree(popupMember)}
                  className="px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                  style={{ backgroundColor: "#FFD700", color: "#013220" }}
                >
                  View Tree
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                  style={{ backgroundColor: "#FFD700", color: "#013220" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MLMTree;