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
    <div className="bg-white p-5 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="h-[500px] rounded-3xl my-7 w-[95%] mx-auto text-white">
        <div
          className="relative mt-20 bg-cover bg-center h-[500px] rounded-3xl overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Our Story of Service and <br className="max-lg:hidden" />{" "}
              Excellence
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative px-6 py-12 md:px-20 flex flex-col md:flex-row justify-between gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B996F] leading-tight mb-6">
            Enjoy Seamless Travel –<br />
            Comfort, Clarity & Control at
            <br />
            Every Step
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10">
            We take the stress out of travel by managing the details for you.
            With AAAO Go, your ride is more than just a destination — it’s a
            smooth, relaxing experience from start to finish.
          </p>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-green-900 dark:text-green-300">
                🌟 Easy-to-Use Mobile App
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                📱 Book, track, and manage your rides in seconds.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-900 dark:text-green-300">
                🌟 Professional Drivers
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                🚗 Trusted and trained to deliver safety and reliability.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-900 dark:text-green-300">
                🌟 Transparent, Honest Pricing
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                💳 No surprises — what you see is exactly what you pay.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-900 dark:text-green-300">
                🌟 A Vehicle for Every Need
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                🚌 Whether solo or group, budget or luxury — we've got it.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-medium">
                  50<span className="text-[#0B996F]">+</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Years of combine Experience
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-medium">
                  1,297 <span className="text-[#0B996F]">+</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Professional Drivers
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          src={map}
          alt=""
          className="absolute left-[50%] w-60 top-72 max-lg:hidden"
        />
        <div className="md:w-1/2 flex h-[25rem] max-lg:h-auto justify-center">
          <img
            src={travelImage}
            alt="Travel"
            className="rounded-2xl shadow-lg w-full object-cover h-auto max-w-md"
          />
        </div>
      </div>
      <div className="w-full px-6 py-12 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 h-[33rem] max-lg:h-auto">
          <img
            src={joinImage}
            alt="Why Join AAAO Go"
            className="rounded-2xl shadow-lg object-cover w-full h-full max-lg:h-auto max-w-md"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B996F] mb-4">
            Why Join AAAO Go?
          </h2>
          <h3 className="text-lg font-semibold text-[#0B996F] mb-6">
            A Life-Changing Opportunity
          </h3>
          <ul className="space-y-3 mb-6 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              ✅ <span>Higher Earnings & Fair Commission</span>
            </li>
            <li className="flex items-center gap-2">
              ✅ <span>Transparent Policies & Support System</span>
            </li>
            <li className="flex items-center gap-2">
              ✅ <span>Higher Earnings & Fair Commission</span>
            </li>
          </ul>
          <div className="space-y-5 text-gray-700 dark:text-gray-300">
            <p>
              💡 <strong>AAAO Go is different</strong>. We believe in fair
              earnings, driver empowerment, and long-term financial growth for
              everyone in our community.
            </p>
            <p>
              💸 <strong>Earn even while you sleep</strong> through our
              multi-level referral rewards and service team usage — because your
              effort today builds income for tomorrow.
            </p>
            <p>
              🏔️ <strong>Retire with dignity</strong> — Enjoy long-term benefits
              including Retirement Support and Tribute Assistance to protect
              your loved ones in times of need.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full relative px-6 py-12 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B996F] mb-4">
            What We Aim to Achieve
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Driven by Vision – Powered by You
          </p>
          <ul className="space-y-5 text-gray-800 dark:text-gray-200 text-base">
            <li>
              <span className="text-xl">
                🚀 <strong>Short-Term</strong>:
              </span>{" "}
              Expand rapidly into key cities and markets by onboarding drivers,
              customers, and service providers across our service range.
            </li>
            <li>
              <span className="text-xl">
                🤝 <strong>Mid-Term</strong>:
              </span>{" "}
              Establish a community-powered ride-hailing network where earnings,
              opportunities, and loyalty grow together.
            </li>
            <li>
              <span className="text-xl">
                🌍 <strong>Long-Term</strong>:
              </span>{" "}
              Lead the way in global mobility innovation, introducing smart
              tech, international operations, and sustainable solutions.
            </li>
            <li>
              <span className="text-xl">
                💬 <strong>"We’re not just launching an app"</strong>:
              </span>{" "}
              — we’re shaping the future of transportation with YOU at the
              center of it.
            </li>
          </ul>
        </div>
        <img
          src={direction}
          alt=""
          className="absolute left-[45%] w-[25rem] max-lg:hidden"
        />
        <div className="md:w-1/2 flex justify-center">
          <img
            src={aimImage}
            alt="Vision Goals"
            className="rounded-2xl shadow-xl w-full h-auto max-w-md"
          />
        </div>
      </div>
      <div className="w-[95%] bg-green-100 dark:bg-gray-800 m-auto mb-10 py-12 px-6 md:px-20 rounded-[2rem]">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="bg-[#DDF3EB] dark:bg-gray-700 hover:bg-[#079B72] hover:text-white text-gray-900 dark:text-white rounded-3xl p-8 w-full md:w-1/2 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-white dark:bg-gray-600 text-[#079B72] rounded-full p-3 mr-4">
                <FaCompass size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 hover:text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-base leading-relaxed">
              "Our vision is simple – to build a ride-hailing platform where
              drivers earn fairly, customers enjoy reliable services, and
              communities thrive through innovation."
            </p>
          </div>
          <div className="bg-[#DDF3EB] dark:bg-gray-700 hover:bg-[#079B72] hover:text-white border border-[#B2E2D2] dark:border-gray-600 text-gray-800 dark:text-white rounded-3xl p-8 w-full md:w-1/2 shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-white dark:bg-gray-600 text-[#079B72] rounded-full p-3 mr-4">
                <FaFlag size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 hover:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-base leading-relaxed">
              AAAO Go is a dynamic and innovative ride-hailing platform designed
              to redefine urban mobility. We connect riders with reliable
              drivers through a seamless, technology-driven experience, ensuring
              safety, affordability, and convenience. Our commitment goes beyond
              transportation—we empower individuals with flexible earning
              opportunities while enhancing everyday travel. Whether it’s daily
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
