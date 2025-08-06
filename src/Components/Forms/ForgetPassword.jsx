import React from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center rounded-2xl bg-gradient-to-b from-green-200 to-green-300">
      <div className="bg-gray-100 rounded-2xl shadow-md w-[90%] max-w-md p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your registered email address to reset your password.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#0A4624] mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border rounded px-4 py-2 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Remember your password? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
