import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import signup from './Images/signup.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { signupUser, selectLoading, selectError, clearError } from '../../store/userSlice';
import { showValidationError } from '../../utils/toast';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    sponsorBy: '',
    gender: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.gender) {
      errors.gender = 'Gender is required';
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
      console.log('Signup - Starting signup process for email:', formData.email);
      const result = await dispatch(signupUser(formData)).unwrap();
      
      console.log('Signup - Signup successful, result:', result);
      console.log('Signup - Checking localStorage for signup_email:', localStorage.getItem('signup_email'));
      
      // Redirect to OTP verification screen after successful signup
      console.log('Signup - Navigating to /verify-otp');
      navigate('/verify-otp');
      
    } catch (error) {
      // Error is already handled in the Redux slice
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 rounded-2xl bg-gradient-to-b from-green-200 to-green-300">
      <div className="bg-gray-100 rounded-2xl shadow-md w-[90%] max-w-6xl p-6 md:p-10 flex flex-col md:flex-row">
        
        {/* Left Image */}
        <div className=" md:flex w-1/2 justify-center items-center max-lg:w-full">
          <img src={signup} alt="signup illustration" className="w-[90%] " />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Create an account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First and Last Name */}
            <div className="flex gap-4 max-md:flex-col">
              <div className="w-1/2 max-md:w-full">
                <label className="text-sm font-semibold text-[#0A4624]">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-4 py-2 outline-none" 
                  placeholder="First name" 
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
                )}
              </div>
              <div className="w-1/2 max-md:w-full">
                <label className="text-sm font-semibold text-[#0A4624]">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-4 py-2 outline-none" 
                  placeholder="Last name" 
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-[#0A4624]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 outline-none" 
                placeholder="Enter your email" 
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-semibold text-[#0A4624] flex items-center gap-1">
                📱 Phone Number <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 outline-none" 
                placeholder="Enter phone number" 
              />
              {validationErrors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.phoneNumber}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-semibold text-[#0A4624]">
                Gender <span className="text-red-500">*</span>
              </label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {validationErrors.gender && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.gender}</p>
              )}
            </div>

            {/* Sponsor */}
            <div>
              <label className="text-sm font-semibold text-[#0A4624]">
                Sponsor By
              </label>
              <input 
                type="text" 
                name="sponsorBy"
                value={formData.sponsorBy}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 outline-none" 
                placeholder="Enter sponsor code (optional)" 
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm font-semibold text-[#0A4624]">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 pr-10 outline-none"
                placeholder="Enter password"
              />
              <div className="absolute right-3 top-9 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-between mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Register'}
              </button>
              <Link to='/login'
                className="w-1/2 border text-center border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-100"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
