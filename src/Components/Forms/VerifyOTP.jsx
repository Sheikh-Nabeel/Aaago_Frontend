import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { verifyOTP, resendOTP, selectLoading, selectError, clearError, selectSignupEmail, clearSignupEmail } from '../../store/userSlice';
import { showValidationError } from '../../utils/toast';

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const signupEmail = useSelector(selectSignupEmail);

  const [otp, setOtp] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Check for signupEmail in localStorage on component mount
  useEffect(() => {
    console.log('VerifyOTP - Component mounting...');
    console.log('VerifyOTP - Redux signupEmail:', signupEmail);
    
    const emailFromStorage = localStorage.getItem('signup_email');
    console.log('VerifyOTP - Email from localStorage:', emailFromStorage);
    
    if (!emailFromStorage) {
      console.log('VerifyOTP - No email found, redirecting to signup');
      navigate('/signup');
      return;
    }
    
    console.log('VerifyOTP - Email found, staying on OTP page');
    
    // Start initial 60 second timer when component mounts
    setResendTimer(60);
    setCanResend(false);

    // Ensure proper mobile viewport handling
    const viewport = document.querySelector('meta[name=viewport]');
    const originalViewport = viewport ? viewport.getAttribute('content') : null;
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Debug logging for mobile responsiveness
    console.log('VerifyOTP mounted - Screen size:', window.innerWidth, 'x', window.innerHeight);
    console.log('User agent:', navigator.userAgent);

    // Cleanup function to restore original viewport
    return () => {
      if (viewport && originalViewport) {
        viewport.setAttribute('content', originalViewport);
      }
    };
  }, [navigate, signupEmail]);

  // Timer effect for resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendTimer]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only allow numbers and max 6 digits
    setOtp(value);
    
    // Clear validation error
    if (validationErrors.otp) {
      setValidationErrors(prev => ({
        ...prev,
        otp: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!otp.trim()) {
      errors.otp = 'OTP is required';
    } else if (otp.length !== 6) {
      errors.otp = 'OTP must be 6 digits';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    dispatch(clearError());
    
    if (!validateForm()) {
      showValidationError(validationErrors);
      return;
    }

    try {
      const emailFromStorage = localStorage.getItem('signup_email');
      const otpData = {
        email: emailFromStorage || signupEmail,
        otp: otp
      };
      
      const result = await dispatch(verifyOTP(otpData)).unwrap();
      
      // Clear signupEmail and userId from localStorage after successful verification
      localStorage.removeItem('signup_email');
      localStorage.removeItem('signupUserId');
      
      // Redirect to home page after successful verification
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      // Error is already handled in the Redux slice
      console.error('OTP verification failed:', error);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || resendTimer > 0) {
      return;
    }

    try {
      setResendLoading(true);
      setCanResend(false);
      
      // Get userId from localStorage (stored during signup)
      const userId = localStorage.getItem('signupUserId');
      
      if (!userId) {
        showValidationError('User ID not found. Please try signing up again.');
        setCanResend(true);
        return;
      }
      
      await dispatch(resendOTP(userId)).unwrap();
      
      // Start 60 second timer after successful resend
      setResendTimer(60);
      
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      // Error is already handled in the Redux slice
      setCanResend(true);
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToSignup = () => {
    // Clear signupEmail and userId from localStorage and Redux
    localStorage.removeItem('signup_email');
    localStorage.removeItem('signupUserId');
    dispatch(clearSignupEmail());
    // Reset timer when going back
    setResendTimer(0);
    setCanResend(true);
    navigate('/signup');
  };

  // Get email from localStorage as fallback
  const emailToShow = signupEmail || localStorage.getItem('signup_email');

  // Debug logging
  console.log('VerifyOTP render - emailToShow:', emailToShow);
  console.log('VerifyOTP render - signupEmail from Redux:', signupEmail);

  if (!emailToShow) {
    console.log('VerifyOTP - No email found, redirecting to signup');
    // Add a small delay to show a message before redirecting
    setTimeout(() => {
      navigate('/signup');
    }, 100);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-300">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <p className="text-gray-600">Redirecting to signup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gradient-to-b from-green-200 to-green-300 relative z-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm mx-auto p-6 sm:p-8 relative z-20 transform transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <FaEnvelope className="text-blue-600 text-xl sm:text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Verify OTP</h2>
          <p className="text-sm text-gray-600 mb-1">
            We've sent a verification code to
          </p>
          <p className="text-blue-600 font-semibold text-sm break-all px-2">{emailToShow}</p>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBackToSignup}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm mb-4 p-2 -ml-2 rounded-lg hover:bg-blue-50 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaArrowLeft />
          Back to Signup
        </button>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0A4624] mb-2">
              Enter OTP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-4 text-center text-xl sm:text-2xl font-mono tracking-widest outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white touch-manipulation focus:outline-none"
              placeholder="000000"
              maxLength="6"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              autoFocus
            />
            {validationErrors.otp && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.otp}</p>
            )}
            <p className="text-gray-500 text-xs mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base sm:text-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          {/* Resend OTP */}
          <div className="text-center pt-2">
            <p className="text-gray-600 text-sm">
              Didn't receive the code?
            </p>
            {resendTimer > 0 ? (
              <div className="text-gray-500 text-sm mt-1">
                Resend available in <span className="font-semibold text-blue-600">{resendTimer}s</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading || !canResend}
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-1 p-2 rounded-lg hover:bg-blue-50 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {resendLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            )}
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP; 