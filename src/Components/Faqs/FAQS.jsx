import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg from "./Images/bg.jpg";
import { FaChevronDown, FaChevronUp, FaRegCommentDots } from "react-icons/fa";
import { appStore, bg2, googlePlay, phoneApp, womanImage } from "../Home/Home";

const faqs = [
  {
    title: "PASSIVE EARNING SYSTEM",
    content:
      "Unlike traditional ride-hailing services, AAAO Go offers a unique team-based earnings model. You can build a network, and even while you sleep, you earn bonuses from the rides and activities of your team.",
  },
  {
    title: "MULTIPLE PAYMENT OPTIONS",
    content:
      "AAAO Go supports crypto, bank transfers, and mobile wallets, giving drivers and customers full flexibility in managing their earnings.",
  },
  {
    title: "NO REGISTRATION FEES",
    content:
      "Most platforms charge drivers to join, but AAAO Go has zero registration fees, allowing more drivers to start earning without upfront costs.",
  },
  {
    title: "INSTANT WITHDRAWALS",
    content:
      "Drivers don't have to wait for weekly payments—they can withdraw their earnings anytime in crypto, to their bank, or mobile wallets.",
  },
  {
    title: "ACCOUNT TRANSFER AFTER DEATH",
    content:
      "Unlike other ride-hailing apps, AAAO Go ensures that earnings and accounts can be legally transferred to family members in case of unforeseen circumstances.",
  },
  {
    title: "MORE THAN JUST RIDES",
    content:
      "AAAO Go isn't just for ride-hailing—it also supports services like car recovery, moving, delivery, and other on-demand services, creating more earning opportunities for drivers and service providers.",
  },
];

const questions = [
  {
    title: "WHAT IS AAAO GO ?",
    content:
      "AAAO Go is an online ride-hailing platform that connects passengers with drivers, offering safe, reliable, and affordable transportation services.",
  },
  {
    title: "HOW IS AAAO GO DIFFERENT FROM OTHER RIDE-HAILING SERVICES ?",
    content:
      "AAAO Go offers flexible payment options, multiple service categories (including car recovery and delivery), and a seamless experience for both riders and drivers.",
  },
  {
    title: "WHERE IS AAAO GO AVAILABLE ?",
    content:
      "Currently, AAAO Go is launching in the UAE, with plans for expansion to other regions.",
  },
  {
    title: "IS THERE A REGISTRATION FEE FOR DRIVERS OR CUSTOMERS ?",
    content:
      "No, AAAO Go does not charge any registration fees for drivers or customers.",
  },
];

const riders = [
  {
    title: "HOW DO I BOOK A RIDE ON AAAO GO ?",
    content:
      "Simply download the AAAO Go app, sign up, enter your destination, choose your ride type, and confirm your booking.",
  },
  {
    title: "WHAT PAYMENT METHODS DOES AAAO GO ACCEPT ?",
    content:
      "We accept cash, credit/debit cards, mobile wallets, and cryptocurrency payments for ride bookings.",
  },
  {
    title: "CAN I SCHEDULE A RIDE IN ADVANCE ?",
    content:
      "Yes, AAAO Go allows you to schedule rides for a future time and date.",
  },
  {
    title: "HOW CAN I TRACK MY RIDE ?",
    content:
      "You can track your ride in real time through the app after booking.",
  },
  {
    title: "WHAT IF I FORGET SOMETHING IN THE CAR ?",
    content:
      "You can report lost items through the app, and we will assist in retrieving them.",
  },
];

const drivers = [
  {
    title: "HOW CAN I BECOME A DRIVER WITH AAAO GO ?",
    content:
      "You can sign up as a driver through the app or website by providing the required documents and completing the verification process.",
  },
  {
    title: "HOW DO DRIVERS GET PAID ?",
    content:
      "Drivers can withdraw their earnings anytime through crypto, bank transfers, or mobile wallets.",
  },
  {
    title: "WHAT TYPE OF CAR CAN BE USED FOR AAAO GO ?",
    content:
      "AAAO Go accepts various car types depending on the service category. Details are available in the driver registration section.",
  },
  {
    title: "IS THERE A DRIVER SUPPORT CENTER ?",
    content:
      "Yes, we have dedicated customer support for drivers to assist with any issues.",
  },
];

const payments = [
  {
    title: "HOW DO CUSTOMERS AND DRIVERS WITHDRAW MONEY ?",
    content:
      "Both customers and drivers can withdraw their AAAO Go balance anytime via bank transfers, mobile wallets, or cryptocurrency.",
  },
  {
    title: "WHAT HAPPEN TO MY AAAO GO ACCOUNT IF I PASS AWAY ?",
    content:
      "AAAO Go allows account transfers to legal heirs after verification, ensuring continuity of earnings or service.",
  },
];

const safetys = [
  {
    title: "IS AAAO GO SAFE FOR RIDERS AND DRIVERS ?",
    content:
      "Yes, we have strict safety measures, including driver verification, real-time tracking, and emergency contact features.",
  },
  {
    title: "Can I share my ride details with family or friends?",
    content:
      "Yes, AAAO Go allows you to share your live ride location with trusted contacts.",
  },
];

const contacts = [
  {
    title: "How can I contact AAAO Go for support ?",
    content:
      "You can reach our support team through the app's help center, email, or customer service hotline.",
  },
];

const FAQS = () => {
  const [active, setActive] = useState({
    general: null,
    questions: null,
    riders: null,
    drivers: null,
    payments: null,
    safety: null,
    contact: null,
  });

  const toggle = (section, index) => {
    setActive((prev) => ({
      ...prev,
      [section]: prev[section] === index ? null : index,
    }));
  };

  const renderSection = (title, sectionKey, data) => (
    <div className="px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 text-green-800 dark:text-green-300">
      <div className="w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 leading-tight">{title}</h2>
        <div className="space-y-2 sm:space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="border-b border-green-300 dark:border-gray-600 py-3 sm:py-4 cursor-pointer"
            >
              <div
                onClick={() => toggle(sectionKey, index)}
                className="flex justify-between items-start gap-4"
              >
                <h3
                  className={`font-bold text-xs sm:text-sm lg:text-sm leading-relaxed flex-1 ${
                    active[sectionKey] === index
                      ? "text-[#0B996F]"
                      : "text-[#0A4624] dark:text-green-300"
                  }`}
                >
                  {item.title}
                </h3>
                <div className="flex-shrink-0 mt-1">
                  {active[sectionKey] === index ? (
                    <FaChevronUp className="text-[#0B996F] text-sm" />
                  ) : (
                    <FaChevronDown className="text-[#0B996F] text-sm" />
                  )}
                </div>
              </div>
              {active[sectionKey] === index && item.content && (
                <div className="mt-3 sm:mt-4 pl-0">
                  <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-2 sm:p-3 lg:p-5 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <div className="min-h-[300px] sm:min-h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl my-4 sm:my-6 lg:my-7 w-full sm:w-[98%] lg:w-[95%] mx-auto bg-black text-white">
        <div
          className="relative bg-cover bg-center min-h-[300px] sm:min-h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center mt-12 sm:mt-16 lg:mt-20 justify-center p-4 sm:p-6"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70" />
          <div className="relative z-10 text-center px-2 sm:px-4">
            <nav className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 flex items-center justify-center">
              <Link to="/" className="hover:underline text-white">
                Home
              </Link>
              <span className="mx-2 text-[#387B55] text-lg sm:text-2xl -mt-1">›</span>
              <span>FAQ</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Answers to Common Questions about Our{" "}
              <br className="hidden lg:block" /> Services and Policies
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col xl:flex-row w-full gap-6 lg:gap-8">
        {/* FAQ Sections */}
        <div className="w-full xl:w-[75%]">
          {renderSection("FAQS!", "general", faqs)}
          {renderSection("General Questions", "questions", questions)}
          {renderSection("For Riders", "riders", riders)}
          {renderSection("For Drivers", "drivers", drivers)}
          {renderSection("Payments & Account Transfer", "payments", payments)}
          {renderSection("Safety & Security", "safety", safetys)}
          {renderSection("Support & Contact", "contact", contacts)}
        </div>
        
        {/* Sidebar Contact Card */}
        <div className="w-full xl:w-[25%] px-3 sm:px-4 lg:px-6 pb-8 sm:pb-12 lg:pb-16 text-green-800 dark:text-green-300 xl:mt-16">
          <div className="bg-green-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm sticky top-6">
            <div className="bg-white dark:bg-gray-700 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full mb-3 sm:mb-4 shadow">
              <FaRegCommentDots className="text-green-600 dark:text-green-300 text-lg sm:text-xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-300 mb-2 sm:mb-3 leading-tight">
              You have a different question?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              Reach out to our customer support team for prompt and personalized
              assistance.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#0B996F] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded text-sm sm:text-base hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div
        className="bg-[#e8f7f0] dark:bg-gray-800 relative py-12 sm:py-16 lg:py-20 mb-4 sm:mb-5 px-4 sm:px-6 lg:px-6 min-h-[70vh] sm:min-h-[80vh] lg:h-[130vh] items-center flex w-full sm:w-[98%] lg:w-[95%] rounded-2xl sm:rounded-3xl mx-auto"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="absolute inset-0 bg-[#E2F4EA] dark:bg-gray-900/50 opacity-50 rounded-2xl sm:rounded-3xl"></div>
        <div className="w-full px-2 sm:px-3 lg:px-3 z-10 mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          <div className="text-center lg:text-left max-w-xl w-full lg:w-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B996F] mb-3 sm:mb-4 leading-tight">
              The Easiest Way to Book <br className="hidden sm:block" />
              Your Ride Register Now for <br className="hidden sm:block" />
              Instant Access
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed px-2 lg:px-0">
              Book your ride quickly and effortlessly with just a few taps on
              our app
            </p>
            <div className="flex flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <a href="#" className="block">
                <img
                  src={googlePlay}
                  alt="Google Play"
                  className="h-10 sm:h-12 rounded-lg"
                />
              </a>
              <a href="#" className="block">
                <img
                  src={appStore}
                  alt="App Store"
                  className="h-10 sm:h-12 rounded-lg"
                />
              </a>
            </div>
          </div>
          <div className="relative w-full lg:w-auto flex justify-center">
            <img
              src={womanImage}
              alt="Happy user"
              className="w-full max-w-sm sm:max-w-md h-[50vh] sm:h-[60vh] lg:h-[100vh] object-cover rounded-2xl"
            />
            <img
              src={phoneApp}
              alt="App Screenshot"
              className="absolute top-16 sm:top-20 lg:top-32 -left-6 sm:-left-8 lg:-left-28 w-16 sm:w-20 md:w-24 lg:w-60 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQS;