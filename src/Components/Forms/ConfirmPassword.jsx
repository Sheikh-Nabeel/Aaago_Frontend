import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ConfirmPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center rounded-2xl bg-gradient-to-b from-green-200 to-green-300">
      <div className="bg-gray-100 rounded-2xl shadow-md w-[90%] max-w-md p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center mb-6">Set New Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password below.
        </p>

        <form className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-[#0A4624] mb-1">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border rounded px-4 py-2 outline-none pr-10"
              placeholder="Enter new password"
            />
            <div
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-[#0A4624] mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showConfirm ? 'text' : 'password'}
              className="w-full border rounded px-4 py-2 outline-none pr-10"
              placeholder="Confirm new password"
            />
            <div
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
