import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkCurrentUser, selectToken, selectIsAuthenticated, selectSignupEmail, syncWithSession, logout } from './store/userSlice';
import sessionManager from './utils/sessionManager';

// Components
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Services from './Components/Services/Services';
import Team from './Components/Team/Team';
import Contact from './Components/Contact/Contact';
import Faqs from './Components/Faqs/FAQS';
import Login from './Components/Forms/Login';
import Signup from './Components/Forms/Signup';
import VerifyOTP from './Components/Forms/VerifyOTP';
import MLMTree from './Components/MLM/MLMTree';
import TreeView from './Components/Tree/TreeView';

// Routes where navbar and footer should be hidden
const HIDE_NAV_FOOTER_ROUTES = ['/login', '/signup', '/verify-otp'];

// AppContent component to use useLocation hook
function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const signupEmail = useSelector(selectSignupEmail);

  // Check if current route should hide navbar/footer
  const shouldHideNavFooter = HIDE_NAV_FOOTER_ROUTES.includes(location.pathname);

  // Sync with session manager on app load
  useEffect(() => {
    console.log('App - Initializing session sync');
    dispatch(syncWithSession());
    
    // Log session info
    console.log('App - Session info:', sessionManager.getSessionInfo());
  }, [dispatch]);

  // Check current user on app load if token exists but not authenticated
  useEffect(() => {
    if (token && !isAuthenticated) {
      console.log('App - Token exists but not authenticated, checking current user');
      dispatch(checkCurrentUser());
    } else if (token && isAuthenticated) {
      console.log('App - User is already authenticated');
    } else {
      console.log('App - No token found, user not authenticated');
    }
  }, [dispatch, token, isAuthenticated]);

  // Listen for session clearing events from API interceptor
  useEffect(() => {
    const handleSessionCleared = (event) => {
      console.log('App - Session cleared event received:', event.detail);
      
      // Sync Redux state with session manager
      dispatch(syncWithSession());
      
      // If we're on a protected route, redirect to login
      if (isAuthenticated && !HIDE_NAV_FOOTER_ROUTES.includes(location.pathname)) {
        console.log('App - Redirecting to login due to session clear');
        window.location.href = '/login';
      }
    };

    window.addEventListener('sessionCleared', handleSessionCleared);

    return () => {
      window.removeEventListener('sessionCleared', handleSessionCleared);
    };
  }, [dispatch, isAuthenticated, location.pathname]);

  // Log route changes for debugging
  useEffect(() => {
    console.log('App - Route changed to:', location.pathname);
    console.log('App - Should hide navbar/footer:', shouldHideNavFooter);
  }, [location.pathname, shouldHideNavFooter]);

  return (
    <div className="App">
      {/* Show Navbar and Footer only on certain routes */}
      {!shouldHideNavFooter && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        
        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={
            signupEmail ? <Navigate to="/verify-otp" replace /> : <Login />
          } 
        />
        <Route 
          path="/signup" 
          element={
            signupEmail ? <Navigate to="/verify-otp" replace /> : <Signup />
          } 
        />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        
        {/* MLM Routes */}
        <Route path="/mlm" element={<MLMTree />} />
        <Route path="/tree" element={<TreeView />} />
        <Route path="/user-tree/:userId" element={<MLMTree />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Show Navbar and Footer only on certain routes */}
      {!shouldHideNavFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
