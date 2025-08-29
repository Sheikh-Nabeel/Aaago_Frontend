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
      "Drivers don’t have to wait for weekly payments—they can withdraw their earnings anytime in crypto, to their bank, or mobile wallets.",
  },
  {
    title: "ACCOUNT TRANSFER AFTER DEATH",
    content:
      "Unlike other ride-hailing apps, AAAO Go ensures that earnings and accounts can be legally transferred to family members in case of unforeseen circumstances.",
  },
  {
    title: "MORE THAN JUST RIDES",
    content:
      "AAAO Go isn’t just for ride-hailing—it also supports services like car recovery, moving, delivery, and other on-demand services, creating more earning opportunities for drivers and service providers.",
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
      "You can reach our support team through the app’s help center, email, or customer service hotline.",
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
    <div className="px-6 py-10 text-green-800 dark:text-green-300 md:flex md:gap-10">
      <div className="w-[100%]">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {data.map((item, index) => (
          <div
            key={index}
            className="border-b border-green-300 dark:border-gray-600 py-4 cursor-pointer"
          >
            <div
              onClick={() => toggle(sectionKey, index)}
              className="flex justify-between items-center"
            >
              <h3
                className={`font-bold text-sm ${
                  active[sectionKey] === index
                    ? "text-[#0B996F]"
                    : "text-[#0A4624] dark:text-green-300"
                }`}
              >
                {item.title}
              </h3>
              {active[sectionKey] === index ? (
                <FaChevronUp className="text-[#0B996F]" />
              ) : (
                <FaChevronDown className="text-[#0B996F]" />
              )}
            </div>
            {active[sectionKey] === index && item.content && (
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                {item.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-5 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="h-[500px] rounded-3xl my-7 w-[95%] mx-auto bg-black text-white">
        <div
          className="relative bg-cover bg-center h-[500px] rounded-3xl overflow-hidden flex items-center mt-20 justify-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70" />
          <div className="relative z-10 text-center px-4">
            <nav className="text-sm text-white/80 mb-4 flex items-center justify-center">
              <Link to="/" className="hover:underline text-white">
                Home
              </Link>
              <span className="mx-2 text-[#387B55] text-2xl -mt-1">›</span>
              <span>FAQ</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Answers to Common Questions about Our{" "}
              <br className="max-lg:hidden" /> Services and Policies
            </h1>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] max-lg:flex-col">
        <div className="w-[100%]">
          {renderSection("FAQS!", "general", faqs)}
          {renderSection("General Questions", "questions", questions)}
          {renderSection("For Riders", "riders", riders)}
          {renderSection("For Drivers", "drivers", drivers)}
          {renderSection("Payments & Account Transfer", "payments", payments)}
          {renderSection("Safety & Security", "safety", safetys)}
          {renderSection("Support & Contact", "contact", contacts)}
        </div>
        <div className="px-6 pb-16 text-green-800 dark:text-green-300 md:flex md:gap-10 h-[20rem] mt-28 max-lg:mt-0">
          <div className="mt-8 md:mt-0 bg-green-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="bg-white dark:bg-gray-700 w-12 h-12 flex items-center justify-center rounded-full mb-4 shadow">
              <FaRegCommentDots className="text-green-600 dark:text-green-300 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
              You have a different question?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2 mb-4">
              Reach out to our customer support team for prompt and personalized
              assistance.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#0B996F] text-white font-semibold py-2 px-4 rounded hover:bg-green-700 dark:hover:bg-green-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div
        className="bg-[#e8f7f0] dark:bg-gray-800 relative py-20 mb-5 px-6 h-[130vh] max-lg:h-auto items-center flex w-[95%] rounded-3xl mx-auto"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="absolute inset-0 bg-[#E2F4EA] dark:bg-gray-900/50 opacity-50 rounded-3xl"></div>
        <div className="w-full px-3 z-10 mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0B996F] mb-4">
              The Easiest Way to Book <br />
              Your Ride Register Now for <br />
              Instant Access
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Book your ride quickly and effortlessly with just a few taps on
              our app
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#">
                <img
                  src={googlePlay}
                  alt="Google Play"
                  className="h-12 rounded-lg"
                />
              </a>
              <a href="#">
                <img
                  src={appStore}
                  alt="App Store"
                  className="h-12 rounded-lg"
                />
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={womanImage}
              alt="Happy user"
              className="w-full max-w-md h-[100vh] max-lg:h-auto object-cover rounded-2xl"
            />
            <img
              src={phoneApp}
              alt="App Screenshot"
              className="absolute top-32 -left-28 max-lg:-left-10 max-lg:w-20 max-lg:top-5 md:w-60 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQS;
