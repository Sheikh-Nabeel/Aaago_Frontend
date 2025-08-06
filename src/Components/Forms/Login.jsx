import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import login from './Images/login.png'
import { Link } from 'react-router-dom';
import { loginUser, selectLoading, selectError, clearError } from '../../store/userSlice';
import { showValidationError } from '../../utils/toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
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
      const result = await dispatch(loginUser(formData)).unwrap();
      
      // Redirect to home page after successful login
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      // Error is already handled in the Redux slice
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center rounded-xl bg-gradient-to-b from-green-200 to-green-300">
      <div className="bg-[#E4E4E4] rounded-2xl shadow-md flex max-lg:flex-col w-[70%] max-lg:w-[90%] max-w-6xl p-6 md:p-10">
        
        {/* Left Side Image Section */}
        <div className=" md:flex w-1/2 items-center max-lg:w-full justify-center">
          <img src={login} alt="login illustration" className="w-[90%]" />
        </div>

        {/* Right Side Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 max-lg:px-2">
          <h2 className="text-3xl font-bold mb-6">Log into your account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#0A4624] mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-1 outline-none"
                placeholder="Enter your email"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-[#0A4624] mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-1 outline-none pr-10"
                placeholder="Enter your password"
              />
              <div
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember" className="text-sm text-gray-600">Keep me signed in</label>
            </div>

            <div className="flex gap-4">
              <button 
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <Link to='/signup' className="bg-white border px-6 py-2 rounded shadow">
                Register
              </Link>
            </div>
          </form>

          <Link to='/forget' className="text-sm text-gray-500 mt-4 text-center">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
