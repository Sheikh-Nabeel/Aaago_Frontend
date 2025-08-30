import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkCurrentUser,
  selectToken,
  selectIsAuthenticated,
  selectSignupEmail,
  syncWithSession,
} from "./store/userSlice";
import sessionManager from "./utils/sessionManager";
import { ThemeProvider } from "./ThemeContext";

// Components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import Team from "./Components/Team/Team";
import Contact from "./Components/Contact/Contact";
import Faqs from "./Components/Faqs/FAQS";
import Login from "./Components/Forms/Login";
import Signup from "./Components/Forms/Signup";
// VerifyOTP component removed as OTP verification is now integrated into signup form
import ForgotPassword from "./Components/Forms/ForgotPassword";
import ResetPassword from "./Components/Forms/ResetPassword";
import MLMTree from "./Components/MLM/MLMTree";
import TreeView from "./Components/Tree/TreeView";
import Profile from "./Components/Profile/Profile"; // New Profile component
import DDRPage from "./Components/ddr/DDRPage";
import CRRPage from "./Components/CRRPage/CRRPage";
import BBRPage from "./Components/bbr/BBRPage";
import HLRpage from "./Components/hlr/HLRpage";
import RegionalAmbassador from "./Components/RegionalAmbassador/RegionalAmbassador";

// Routes where navbar and footer should be hidden
const HIDE_NAV_FOOTER_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const signupEmail = useSelector(selectSignupEmail);

  const shouldHideNavFooter = HIDE_NAV_FOOTER_ROUTES.includes(
    location.pathname
  );

  useEffect(() => {
    console.log("App - Initializing session sync");
    dispatch(syncWithSession());
    console.log("App - Session info:", sessionManager.getSessionInfo());
  }, [dispatch]);

  useEffect(() => {
    if (token && !isAuthenticated) {
      console.log(
        "App - Token exists but not authenticated, checking current user"
      );
      dispatch(checkCurrentUser());
    } else if (token && isAuthenticated) {
      console.log("App - User is already authenticated");
    } else {
      console.log("App - No token found, user not authenticated");
    }
  }, [dispatch, token, isAuthenticated]);

  useEffect(() => {
    const handleSessionCleared = (event) => {
      console.log("App - Session cleared event received:", event.detail);
      dispatch(syncWithSession());
      if (
        isAuthenticated &&
        !HIDE_NAV_FOOTER_ROUTES.includes(location.pathname)
      ) {
        console.log("App - Redirecting to login due to session clear");
        window.location.href = "/login";
      }
    };
    window.addEventListener("sessionCleared", handleSessionCleared);
    return () =>
      window.removeEventListener("sessionCleared", handleSessionCleared);
  }, [dispatch, isAuthenticated, location.pathname]);

  useEffect(() => {
    console.log("App - Route changed to:", location.pathname);
    console.log("App - Should hide navbar/footer:", shouldHideNavFooter);
    console.log("App - signupEmail in Redux:", signupEmail);
    console.log(
      "App - signupEmail in localStorage:",
      localStorage.getItem("signup_email")
    );
  }, [location.pathname, shouldHideNavFooter, signupEmail]);

  return (
    <div className="App bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {!shouldHideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        {/* Default to Home for authenticated users */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/forgot-password"
          element={
            signupEmail || localStorage.getItem("signup_email") ? (
              <Navigate to="/reset-password" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route 
          path="/mlm" 
          element={
            isAuthenticated ? <MLMTree /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/ddr" 
          element={
            isAuthenticated ? <DDRPage /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/crr" 
          element={
            isAuthenticated ? <CRRPage /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/bbr" 
          element={
            isAuthenticated ? <BBRPage /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/hlr" 
          element={
            isAuthenticated ? <HLRpage /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/RegionalAmbassador" 
          element={
            isAuthenticated ? <RegionalAmbassador /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/tree" 
          element={
            isAuthenticated ? <TreeView /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/user-tree/:userId" 
          element={
            isAuthenticated ? <TreeView /> : <Navigate to="/login" replace />
          } 
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!shouldHideNavFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;
