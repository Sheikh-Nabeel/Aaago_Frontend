import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchReferralTree, selectReferralTree, selectReferralTreeLoading, selectReferralTreeError, selectUser, selectToken, selectIsAuthenticated, resetReferralTreeAttempt } from '../../store/userSlice';
import sessionManager from '../../utils/sessionManager';
import { authAPI, default as api } from '../../services/api';

const MLMTree = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL if present
  
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

  // Check session validity
  const checkSessionValidity = () => {
    const sessionToken = sessionManager.getToken();
    const sessionUser = sessionManager.getUser();
    const sessionIsAuth = sessionManager.isAuthenticated();
    
    const isValid = !!(sessionToken && sessionUser && sessionIsAuth);
    setSessionValid(isValid);
    
    console.log('MLMTree - Session validity check:', {
      sessionToken: !!sessionToken,
      sessionUser: !!sessionUser,
      sessionIsAuth,
      isValid
    });
    
    return isValid;
  };

  // Load specific user's tree if userId is provided in URL
  const loadSpecificUserTree = async (targetUserId) => {
    try {
      setIsLoadingSpecificUser(true);
      setMemberTreeError(null);
      
      console.log('Loading specific user tree for:', targetUserId);
      
      // Use the axios instance directly since authAPI doesn't have a generic get method
      const response = await api.get(`/user/referral-tree?userId=${targetUserId}`);
      console.log('Specific user tree response:', response.data);
      
      setMemberTreeData(response.data);
      setSelectedMember(response.data.referralTree.user);
      
    } catch (error) {
      console.error('Error loading specific user tree:', error);
      setMemberTreeError(error.response?.data?.message || 'Failed to load user tree');
    } finally {
      setIsLoadingSpecificUser(false);
    }
  };

  useEffect(() => {
    console.log('MLMTree component mounted');
    console.log('Current token:', token);
    console.log('Current user:', currentUser);
    console.log('Is authenticated:', isAuthenticated);
    console.log('URL userId:', userId);
    
    // Check session validity
    const isValid = checkSessionValidity();
    
    if (isValid) {
      if (userId) {
        // If userId is provided in URL, load that specific user's tree
        console.log('Loading specific user tree from URL');
        loadSpecificUserTree(userId);
      } else {
        // Otherwise, load current user's tree
        console.log('Dispatching fetchReferralTree with valid session');
        dispatch(fetchReferralTree());
      }
    } else {
      console.log('No valid session found, skipping API call');
      if (token || currentUser) {
        console.log('Redux state has data but session is invalid - this indicates a sync issue');
      }
    }
  }, [dispatch, token, currentUser, isAuthenticated, userId]);

  // Separate effect to handle URL changes
  useEffect(() => {
    if (userId && sessionValid && isAuthenticated) {
      console.log('URL userId changed, loading specific user tree');
      loadSpecificUserTree(userId);
    }
  }, [userId]);

  // Listen for session clearing events
  useEffect(() => {
    const handleSessionCleared = (event) => {
      console.log('MLMTree - Session cleared event received:', event.detail);
      setSessionValid(false);
      
      // Reset the referral tree attempt flag so user can try again after re-login
      dispatch(resetReferralTreeAttempt());
    };

    window.addEventListener('sessionCleared', handleSessionCleared);

    return () => {
      window.removeEventListener('sessionCleared', handleSessionCleared);
    };
  }, [dispatch]);

  const handleViewDetail = (member) => {
    // Add current user to history before navigating
    const currentUserData = userId ? selectedMember : (referralTree?.user || currentUser);
    console.log('Adding to history - currentUserData:', currentUserData);
    console.log('Current treeHistory:', treeHistory);
    
    if (currentUserData) {
      const newHistory = [...treeHistory, { member: currentUserData, data: currentTreeData }];
      console.log('New history created:', newHistory);
      // Store history in sessionStorage for persistence across navigation
      sessionStorage.setItem('treeHistory', JSON.stringify(newHistory));
      setTreeHistory(newHistory);
    }
    
    // Navigate to a new page with the member's tree
    console.log('Navigating to user tree page for:', member);
    navigate(`/user-tree/${member.id}`);
  };

  const handleNavigateToHistory = (index) => {
    // Navigate to a specific point in history
    const historyItem = treeHistory[index];
    if (historyItem) {
      // Update history to only include items up to this index
      const newHistory = treeHistory.slice(0, index);
      sessionStorage.setItem('treeHistory', JSON.stringify(newHistory));
      navigate(`/user-tree/${historyItem.member.id}`);
    }
  };

  const handleBackToMainTree = () => {
    // Clear history and navigate back to main tree
    sessionStorage.removeItem('treeHistory');
    navigate('/mlm');
  };

  // Load history from sessionStorage on component mount
  useEffect(() => {
    const savedHistory = sessionStorage.getItem('treeHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setTreeHistory(parsedHistory);
      } catch (error) {
        console.error('Error parsing tree history:', error);
        sessionStorage.removeItem('treeHistory');
      }
    }
  }, []);

  // If session is invalid, show authentication required message
  if (!sessionValid || !isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #013220 0%, #0a4a2a 100%)' }}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#FFD700' }}>Authentication Required</h2>
            <p className="text-lg mb-6" style={{ color: '#FFD700' }}>
              {!sessionValid 
                ? "Your session has expired. Please log in again to view your referral tree."
                : "Please log in to view your referral tree."
              }
            </p>
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-8 py-3 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: '#FFD700', color: '#013220' }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If loading, show loading state
  if ((!userId && loading) || (userId && isLoadingSpecificUser)) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #013220 0%, #0a4a2a 100%)' }}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#FFD700' }}></div>
            <p className="text-xl" style={{ color: '#FFD700' }}>
              {userId ? 'Loading user tree...' : 'Loading your referral tree...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If error, show error state
  if ((!userId && error) || (userId && memberTreeError)) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #013220 0%, #0a4a2a 100%)' }}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#FFD700' }}>Error Loading Referral Tree</h2>
            <p className="text-lg mb-6" style={{ color: '#FFD700' }}>{userId ? memberTreeError : error}</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: '#FFD700', color: '#013220' }}
              >
                Try Again
              </button>
              <button 
                onClick={() => navigate('/mlm')}
                className="px-6 py-2 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: '#013220', color: '#FFD700', border: '1px solid #FFD700' }}
              >
                Back to Main Tree
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no referral tree data, show empty state
  if ((!userId && !referralTree) || (userId && !memberTreeData)) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #013220 0%, #0a4a2a 100%)' }}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#FFD700' }}>No Referral Tree Data</h2>
            <p className="text-lg mb-6" style={{ color: '#FFD700' }}>
              {userId ? 'This user\'s referral tree data is not available at the moment.' : 'Your referral tree data is not available at the moment.'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: '#FFD700', color: '#013220' }}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine which data to show based on whether we're viewing a specific user or current user
  const isViewingSpecificUser = !!userId;
  const currentTreeData = isViewingSpecificUser ? memberTreeData : referralTree;
  const currentLevelMembers = currentTreeData?.referralTree?.members?.[`level${selectedLevel}`] || currentTreeData?.members?.[`level${selectedLevel}`] || [];
  
  // Determine which user info to display
  const displayUser = isViewingSpecificUser ? selectedMember : (referralTree?.user || currentUser);
  const displayTreeData = isViewingSpecificUser ? memberTreeData?.referralTree : referralTree;
  
  // Get the correct counts data
  const countsData = isViewingSpecificUser ? memberTreeData?.referralTree?.counts : referralTree?.counts;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #013220 0%, #0a4a2a 100%)' }}>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Simple Navigation Buttons - Only show when viewing a specific user's tree */}
        {userId && (
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                console.log('Back button clicked. Current history:', treeHistory);
                if (treeHistory.length > 0) {
                  const lastItem = treeHistory[treeHistory.length - 1];
                  const newHistory = treeHistory.slice(0, -1);
                  console.log('Navigating back to:', lastItem.member.id);
                  sessionStorage.setItem('treeHistory', JSON.stringify(newHistory));
                  setTreeHistory(newHistory);
                  navigate(`/user-tree/${lastItem.member.id}`);
                } else {
                  console.log('No history, going to main tree');
                  // If no history, go back to main tree
                  handleBackToMainTree();
                }
              }}
              className="px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              style={{ backgroundColor: '#FFD700', color: '#013220' }}
            >
              Back
            </button>
            <button
              onClick={handleBackToMainTree}
              className="px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              style={{ backgroundColor: '#FFD700', color: '#013220' }}
            >
              Back to Main Tree
            </button>
          </div>
        )}

        {/* Header Section - User Profile Summary */}
        <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm" style={{ border: '1px solid #FFD700' }}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Profile Picture */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#013220', border: '2px solid #FFD700' }}>
              <span className="text-2xl sm:text-3xl" style={{ color: '#FFD700' }}>
                {displayUser?.name?.charAt(0) || displayUser?.firstName?.charAt(0) || displayUser?.email?.charAt(0) || 'U'}
              </span>
            </div>
            
            {/* User Info */}
                         <div className="flex-1 w-full">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4">
                 <div>
                   <span className="font-semibold" style={{ color: '#FFD700' }}>Name : </span>
                   <span style={{ color: '#FFD700' }}>
                     {displayUser?.name || displayUser?.firstName 
                       ? (displayUser.firstName && displayUser.lastName 
                           ? `${displayUser.firstName} ${displayUser.lastName}`
                           : displayUser.name)
                       : 'N/A'
                     }
                   </span>
                 </div>
                 <div>
                   <span className="font-semibold" style={{ color: '#FFD700' }}>Email : </span>
                   <span style={{ color: '#FFD700' }}>
                     {displayUser?.email || 'N/A'}
                   </span>
                 </div>
                                   <div>
                    <span className="font-semibold" style={{ color: '#FFD700' }}>Level : </span>
                    <span style={{ color: '#FFD700' }}>
                      {displayUser?.level !== undefined ? displayUser.level : 'N/A'}
                    </span>
                  </div>
                 <div>
                   <span className="font-semibold" style={{ color: '#FFD700' }}>Sponsor ID : </span>
                   <span style={{ color: '#FFD700' }}>
                     {displayUser?.sponsorId || 'N/A'}
                   </span>
                 </div>
                                   <div>
                    <span className="font-semibold" style={{ color: '#FFD700' }}>Team Members : </span>
                    <span style={{ color: '#FFD700' }}>
                      {countsData?.totalReferrals || 0}
                    </span>
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Level Navigation Tabs */}
        <div className="flex flex-nowrap gap-1 sm:gap-2 md:gap-4 mb-6 sm:mb-8 justify-center overflow-x-auto">
          {[1, 2, 3, 4].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
                selectedLevel === level
                  ? 'text-green-900'
                  : 'text-yellow-400'
              }`}
              style={{
                backgroundColor: selectedLevel === level ? '#FFD700' : 'transparent',
                border: selectedLevel === level ? 'none' : '1px solid #FFD700'
              }}
            >
              Level {level} ({countsData?.[`level${level}`] || 0})
            </button>
          ))}
        </div>

        {/* Team Members Table */}
        <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-sm" style={{ border: '1px solid #FFD700' }}>
          {/* Mobile Card View for very small screens */}
          <div className="block sm:hidden">
            {currentLevelMembers.length > 0 ? (
              <div className="p-4 space-y-3">
                {currentLevelMembers.map((member, index) => (
                  <div key={member.id || index} className="bg-white bg-opacity-5 rounded-lg p-3 border border-yellow-400 border-opacity-30">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="font-semibold" style={{ color: '#FFD700' }}>ID:</span> <span style={{ color: '#FFD700' }}>{String(index + 1).padStart(3, '0')}</span></div>
                      <div><span className="font-semibold" style={{ color: '#FFD700' }}>Level:</span> <span style={{ color: '#FFD700' }}>{member.level || 0}</span></div>
                      <div className="col-span-2"><span className="font-semibold" style={{ color: '#FFD700' }}>Name:</span> <span style={{ color: '#FFD700' }}>{member.name || 'N/A'}</span></div>
                      <div className="col-span-2"><span className="font-semibold" style={{ color: '#FFD700' }}>Email:</span> <span style={{ color: '#FFD700' }}>{member.email || 'N/A'}</span></div>
                      <div className="col-span-2"><span className="font-semibold" style={{ color: '#FFD700' }}>Sponsor:</span> <span style={{ color: '#FFD700' }}>{member.sponsorId || 'N/A'}</span></div>
                      <div className="col-span-2">
                        <button
                          onClick={() => handleViewDetail(member)}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors underline text-xs"
                        >
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs" style={{ color: '#FFD700' }}>
                No members found in Level {selectedLevel}
              </div>
            )}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr style={{ backgroundColor: '#013220', borderBottom: '1px solid #FFD700' }}>
                                     <th className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-12 sm:w-16" style={{ color: '#FFD700' }}>ID</th>
                   <th className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-20 sm:w-32" style={{ color: '#FFD700' }}>Name</th>
                   <th className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-32 sm:w-48" style={{ color: '#FFD700' }}>Email</th>
                   <th className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-12 sm:w-20" style={{ color: '#FFD700' }}>Level</th>
                   <th className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-20 sm:w-32" style={{ color: '#FFD700' }}>Sponsor</th>
                   <th className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-xs sm:text-sm md:text-base w-16 sm:w-24" style={{ color: '#FFD700' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLevelMembers.length > 0 ? (
                  currentLevelMembers.map((member, index) => (
                                         <tr 
                       key={member.id || index} 
                       className="hover:bg-opacity-20 hover:bg-yellow-400 transition-colors"
                       style={{ borderBottom: '1px solid #FFD700' }}
                     >
                                               <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-12 sm:w-16" style={{ color: '#FFD700' }}>
                          {String(index + 1).padStart(3, '0')}
                        </td>
                        <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-20 sm:w-32" style={{ color: '#FFD700' }}>
                          {member.name || 'N/A'}
                        </td>
                        <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-32 sm:w-48" style={{ color: '#FFD700' }}>
                          {member.email || 'N/A'}
                        </td>
                        <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-12 sm:w-20" style={{ color: '#FFD700' }}>
                          {member.level || 0}
                        </td>
                        <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base w-20 sm:w-32" style={{ color: '#FFD700' }}>
                          {member.sponsorId || 'N/A'}
                        </td>
                        <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 md:py-4 w-16 sm:w-24">
                          <button
                            onClick={() => handleViewDetail(member)}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors underline text-xs sm:text-sm md:text-base"
                          >
                            View Detail
                          </button>
                        </td>
                     </tr>
                  ))
                ) : (
                                     <tr>
                     <td colSpan="6" className="px-2 sm:px-3 md:px-6 py-4 sm:py-6 md:py-8 text-center text-xs sm:text-sm md:text-base" style={{ color: '#FFD700' }}>
                       No members found in Level {selectedLevel}
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLMTree; 