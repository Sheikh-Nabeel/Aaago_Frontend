import React, { useState } from "react";
import { Link } from "react-router-dom";
import { bg } from "../About/About";
import { FaBriefcase, FaRocket, FaTimes } from "react-icons/fa";
import team from "./Images/team.webp";
import ceo from "./Images/ceo.webp";
import Tahir from "./Images/tahir.webp";
import Wardag from "./Images/wardag.webp";
import Samad from "./Images/samad.jpeg";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const teamMembers = [
    {
      name: "Mr Tahir Zaman",
      role: "COO",
      title: "Chief Operation Officer (COO)",
      image: Tahir,
      description:
        "Tahir is an experienced professional with a diverse background spanning over a decade in various industries. Since 2011, he has demonstrated exceptional skills in team management and leadership, as well as expertise in human resources across multiple companies. Tahir brings a wealth of knowledge and a proven track record of driving operational excellence and fostering team collaboration. He is committed to elevating the company's position to the highest level by leveraging his strategic vision and adaptability in challenging situations",
    },
    {
      name: "Mr RAFIULLAH WARDAG",
      role: "CMO",
      title: "Chief Marketing Officer",
      image: Wardag,
      description:
        "Rafi is a certified entrepreneur and a business tycoon with expertise across multiple industries. A mastermind in creative leadership, he is driven by a bold vision—to connect people worldwide on a single, unified platform. With his innovative approach and strategic thinking, he is reshaping industries and pioneering solutions that bridge global communities, making connectivity seamless and accessible for all.",
    },
    {
      name: "Sardar Muhammad Abdul Samad Khan",
      role: "CTO",
      image: Samad,
      title: "Chief Technology Officer",
      description:
        "Meet our CTO officer, his name is Sardar Muhammad Abdul Samad Khan. He has a Master's degree in Software Engineering. He has 10 years of experience in mobile application and website development. He has his own software house in which 100 employees work and he is the CEO of their company. He has received the Best Developer Award from the Government of Pakistan in 2018.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-2 sm:p-3 lg:p-5">
      {/* Hero Section */}
      <div className="min-h-[300px] sm:min-h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl my-4 sm:my-6 lg:my-7 w-full sm:w-[98%] lg:w-[95%] mx-auto bg-black dark:bg-gray-900 text-white dark:text-white">
        <div
          className="relative bg-cover bg-center mt-12 sm:mt-16 lg:mt-20 min-h-[300px] sm:min-h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center dark:bg-gray-900 p-4 sm:p-6"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-80" />
          <div className="relative z-10 text-center px-2 sm:px-4">
            <nav className="text-xs sm:text-sm text-white dark:text-gray-200 mb-3 sm:mb-4 flex items-center justify-center">
              <Link
                to="/"
                onClick={scrollToTop}
                className="hover:underline text-white dark:text-gray-200 hover:text-yellow-400 dark:hover:text-yellow-400"
              >
                Home
              </Link>
              <span className="mx-2 text-[#387B55] dark:text-yellow-400 text-lg sm:text-2xl -mt-1">
                ›
              </span>
              <span className="text-white dark:text-gray-200">Our Team</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-white leading-tight">
              Meet Our Team
            </h1>
          </div>
        </div>
      </div>

      {/* Team Intro Section */}
      <div className="px-3 sm:px-6 lg:px-6 py-6 sm:py-8 lg:py-10 md:px-10 flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-10">
        <div className="flex-shrink-0 w-full lg:w-[50%]">
          <img
            src={team}
            alt="Team"
            className="w-full h-64 sm:h-80 lg:h-[450px] rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col w-full lg:w-[55%]">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black dark:text-white mb-3 sm:mb-4 leading-tight">
            Meet the AAAO Core Team – Driven by Experience, Powered by Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base lg:text-[.9rem] leading-relaxed mb-4 sm:mb-6">
            Behind AAAO Go is a strategic team of experts with deep-rooted
            experience in technology, transportation, tourism, hospitality,
            finance, retail, and smart services.
          </p>
          
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-green-700 dark:bg-yellow-500 dark:text-gray-900 text-white p-2 sm:p-3 rounded-full flex-shrink-0">
              <FaBriefcase className="text-sm sm:text-base lg:text-lg" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-green-800 dark:text-yellow-400 mb-1 sm:mb-2">
                Combined Experience of 50+ Years
              </h3>
              <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm leading-relaxed">
                Our leadership team holds over 50 years of combined industry
                experience, ensuring AAAO Go is built with insight, integrity,
                and future-focused strategy.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-green-700 dark:bg-yellow-500 dark:text-gray-900 text-white p-2 sm:p-3 rounded-full flex-shrink-0">
              <FaRocket className="text-sm sm:text-base lg:text-lg" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-green-800 dark:text-yellow-400 mb-1 sm:mb-2">
                Built to Scale, Structured to Lead
              </h3>
              <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm leading-relaxed">
                This team is architecting the AAAO Empire with clarity and
                commitment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 gap-6 sm:gap-8 lg:gap-10">
        <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4 order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white leading-tight">
            MEET OUR FOUNDER
          </h2>
          <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white leading-tight">
            A VISIONARY ARCHITECT OF INNOVATION
          </h3>
          <div className="bg-black dark:bg-gray-700 text-white dark:text-gray-200 px-3 sm:px-4 py-2 inline-block font-semibold tracking-wider text-xs sm:text-sm lg:text-base">
            MR MI KHAN BUDDA KHEL
          </div>
          <h4 className="font-bold text-base sm:text-lg text-black dark:text-white mt-2">
            (CEO)
          </h4>
          <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base text-justify mb-4 sm:mb-5 leading-relaxed">
            Starting as a laborer and rising to global leadership, Founder is a
            true embodiment of resilience and ambition. With 10 years of
            experience... driving innovation and inspiring change.
          </p>
          <button className="bg-[#319A64] dark:bg-yellow-500 dark:text-gray-900 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base hover:bg-green-700 dark:hover:bg-yellow-400 mt-3 sm:mt-5 transition-colors duration-300">
            <a
              href="https://digitalcontacts.info/mikhanbuddakhel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Profile
            </a>
          </button>
        </div>
        <div className="w-full sm:w-3/4 lg:w-[40%] order-1 lg:order-2 flex justify-center">
          <img
            src={ceo}
            alt="Founder"
            className="max-w-full h-64 sm:h-80 lg:h-auto w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Team Cards Section */}
      <div className="px-2 sm:px-4 py-8 sm:py-10 lg:py-12 text-center bg-white dark:bg-gray-800 mx-2 sm:mx-4 lg:mx-0 rounded-lg sm:rounded-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 sm:mb-8">
          MEET OUR TEAM
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden p-3 sm:p-4 flex flex-col items-center"
              style={{ boxShadow: "1px 1px 10px #585858" }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 sm:h-56 lg:h-60 object-cover rounded"
              />
              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-black dark:text-white text-center leading-tight px-2">
                {member.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base mt-1">
                {member.role}
              </p>
              <button
                onClick={() => setSelectedMember(member)}
                className="mt-3 sm:mt-4 bg-[#319A64] dark:bg-yellow-500 dark:text-gray-900 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-green-700 dark:hover:bg-yellow-400 transition-colors duration-300 flex items-center gap-1"
              >
                Read More <span>&rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full p-4 sm:p-6 relative shadow-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-600 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 z-10 bg-white dark:bg-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              <FaTimes size={16} className="sm:w-5 sm:h-5" />
            </button>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              <div className="w-full lg:w-[40%]">
                <div className="w-full h-48 sm:h-60 lg:h-60 rounded overflow-hidden bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">Image Loading...</div>';
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-[60%] lg:max-h-60 lg:overflow-y-auto lg:pr-2">
                <p className="text-red-700 dark:text-yellow-400 font-semibold mb-2 text-sm sm:text-base">
                  {selectedMember.title}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 leading-tight">
                  {selectedMember.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {selectedMember.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;