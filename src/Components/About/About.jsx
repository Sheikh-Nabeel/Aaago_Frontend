import React from "react";
import { Link } from "react-router-dom";
import bg from "./Images/bg.jpeg";
import travelImage from "./Images/enjoy.jpg";
import map from "./Images/map.png";
import joinImage from "./Images/whyjoin.jpg";
import aimImage from "./Images/aim.jpg";
import direction from "./Images/direction.png";
import { FaFlag, FaCompass } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white p-2 sm:p-3 lg:p-5 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <div className="min-h-[300px] sm:min-h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl my-4 sm:my-6 lg:my-7 w-full sm:w-[98%] lg:w-[95%] mx-auto text-white">
        <div
          className="relative mt-12 sm:mt-16 lg:mt-20 bg-cover bg-center min-h-[300px] sm:min-h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-tight lg:leading-tight">
              Our Story of Service and <br className="hidden lg:block" />{" "}
              Excellence
            </h1>
          </div>
        </div>
      </div>

      {/* Enjoy Seamless Travel Section */}
      <div className="w-full relative px-3 sm:px-6 lg:px-6 py-8 sm:py-10 lg:py-12 md:px-20 flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-10">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B996F] leading-tight mb-4 sm:mb-6">
            Enjoy Seamless Travel –<br />
            Comfort, Clarity & Control at
            <br />
            Every Step
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base leading-relaxed">
            We take the stress out of travel by managing the details for you.
            With AAAO Go, your ride is more than just a destination — it's a
            smooth, relaxing experience from start to finish.
          </p>
          
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-300 mb-1 sm:mb-2">
                🌟 Easy-to-Use Mobile App
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                📱 Book, track, and manage your rides in seconds.
              </p>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-300 mb-1 sm:mb-2">
                🌟 Professional Drivers
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                🚗 Trusted and trained to deliver safety and reliability.
              </p>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-300 mb-1 sm:mb-2">
                🌟 Transparent, Honest Pricing
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                💳 No surprises — what you see is exactly what you pay.
              </p>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-300 mb-1 sm:mb-2">
                🌟 A Vehicle for Every Need
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                🚌 Whether solo or group, budget or luxury — we've got it.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 pt-4 sm:pt-6">
              <div className="flex flex-col gap-1">
                <p className="text-3xl sm:text-4xl font-medium">
                  50<span className="text-[#0B996F]">+</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Years of combine Experience
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-3xl sm:text-4xl font-medium">
                  1,297 <span className="text-[#0B996F]">+</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Professional Drivers
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Image - Hidden on mobile/tablet */}
        <img
          src={map}
          alt=""
          className="absolute left-[50%] w-60 top-72 hidden xl:block"
        />
        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
          <img
            src={travelImage}
            alt="Travel"
            className="rounded-2xl shadow-lg w-full h-64 sm:h-80 lg:h-[25rem] object-cover max-w-sm sm:max-w-md"
          />
        </div>
      </div>

      {/* Why Join AAAO Go Section */}
      <div className="w-full px-3 sm:px-6 lg:px-6 py-8 sm:py-10 lg:py-12 md:px-20 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <img
            src={joinImage}
            alt="Why Join AAAO Go"
            className="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-80 lg:h-[33rem] max-w-sm sm:max-w-md mx-auto lg:mx-0"
          />
        </div>
        
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B996F] mb-3 sm:mb-4 leading-tight">
            Why Join AAAO Go?
          </h2>
          <h3 className="text-base sm:text-lg font-semibold text-[#0B996F] mb-4 sm:mb-6">
            A Life-Changing Opportunity
          </h3>
          
          <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2 text-sm sm:text-base">
              ✅ <span>Higher Earnings & Fair Commission</span>
            </li>
            <li className="flex items-center gap-2 text-sm sm:text-base">
              ✅ <span>Transparent Policies & Support System</span>
            </li>
            <li className="flex items-center gap-2 text-sm sm:text-base">
              ✅ <span>Higher Earnings & Fair Commission</span>
            </li>
          </ul>
          
          <div className="space-y-3 sm:space-y-4 lg:space-y-5 text-gray-700 dark:text-gray-300">
            <p className="text-sm sm:text-base leading-relaxed">
              💡 <strong>AAAO Go is different</strong>. We believe in fair
              earnings, driver empowerment, and long-term financial growth for
              everyone in our community.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              💸 <strong>Earn even while you sleep</strong> through our
              multi-level referral rewards and service team usage — because your
              effort today builds income for tomorrow.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              🏔️ <strong>Retire with dignity</strong> — Enjoy long-term benefits
              including Retirement Support and Tribute Assistance to protect
              your loved ones in times of need.
            </p>
          </div>
        </div>
      </div>

      {/* What We Aim to Achieve Section */}
      <div className="w-full relative px-3 sm:px-6 lg:px-6 py-8 sm:py-10 lg:py-12 md:px-20 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B996F] mb-3 sm:mb-4 leading-tight">
            What We Aim to Achieve
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            Driven by Vision – Powered by You
          </p>
          
          <ul className="space-y-3 sm:space-y-4 lg:space-y-5 text-gray-800 dark:text-gray-200">
            <li className="text-sm sm:text-base leading-relaxed">
              <span className="text-lg sm:text-xl">
                🚀 <strong>Short-Term</strong>:
              </span>{" "}
              Expand rapidly into key cities and markets by onboarding drivers,
              customers, and service providers across our service range.
            </li>
            <li className="text-sm sm:text-base leading-relaxed">
              <span className="text-lg sm:text-xl">
                🤝 <strong>Mid-Term</strong>:
              </span>{" "}
              Establish a community-powered ride-hailing network where earnings,
              opportunities, and loyalty grow together.
            </li>
            <li className="text-sm sm:text-base leading-relaxed">
              <span className="text-lg sm:text-xl">
                🌍 <strong>Long-Term</strong>:
              </span>{" "}
              Lead the way in global mobility innovation, introducing smart
              tech, international operations, and sustainable solutions.
            </li>
            <li className="text-sm sm:text-base leading-relaxed">
              <span className="text-lg sm:text-xl">
                💬 <strong>"We're not just launching an app"</strong>:
              </span>{" "}
              — we're shaping the future of transportation with YOU at the
              center of it.
            </li>
          </ul>
        </div>
        
        {/* Direction Arrow - Hidden on mobile/tablet */}
        <img
          src={direction}
          alt=""
          className="absolute left-[45%] w-[25rem] hidden xl:block"
        />
        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={aimImage}
            alt="Vision Goals"
            className="rounded-2xl shadow-xl w-full h-64 sm:h-80 lg:h-auto object-cover max-w-sm sm:max-w-md"
          />
        </div>
      </div>

      {/* Vision & Mission Cards Section */}
      <div className="w-full sm:w-[98%] lg:w-[95%] bg-green-100 dark:bg-gray-800 mx-auto mb-6 sm:mb-8 lg:mb-10 py-8 sm:py-10 lg:py-12 px-3 sm:px-6 lg:px-20 rounded-2xl sm:rounded-3xl lg:rounded-[2rem]">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center justify-center">
          {/* Vision Card */}
          <div className="bg-[#DDF3EB] dark:bg-gray-700 hover:bg-[#079B72] hover:text-white text-gray-900 dark:text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full lg:w-1/2 shadow-lg transition-all duration-300 group">
            <div className="flex items-start sm:items-center mb-3 sm:mb-4">
              <div className="bg-white dark:bg-gray-600 text-[#079B72] group-hover:text-[#079B72] rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
                <FaCompass size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-green-800 dark:text-green-300 group-hover:text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              "Our vision is simple – to build a ride-hailing platform where
              drivers earn fairly, customers enjoy reliable services, and
              communities thrive through innovation."
            </p>
          </div>
          
          {/* Mission Card */}
          <div className="bg-[#DDF3EB] dark:bg-gray-700 hover:bg-[#079B72] hover:text-white border border-[#B2E2D2] dark:border-gray-600 text-gray-800 dark:text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full lg:w-1/2 shadow-md transition-all duration-300 group">
            <div className="flex items-start sm:items-center mb-3 sm:mb-4">
              <div className="bg-white dark:bg-gray-600 text-[#079B72] group-hover:text-[#079B72] rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
                <FaFlag size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-green-800 dark:text-green-300 group-hover:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              AAAO Go is a dynamic and innovative ride-hailing platform designed
              to redefine urban mobility. We connect riders with reliable
              drivers through a seamless, technology-driven experience, ensuring
              safety, affordability, and convenience. Our commitment goes beyond
              transportation—we empower individuals with flexible earning
              opportunities while enhancing everyday travel. Whether it's daily
              commutes, business trips, or on-demand rides, AAAO Go is your
              trusted partner in moving smarter, faster, and better.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
export { bg };