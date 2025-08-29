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
        "Meet our CTO officer, his name is Sardar Muhammad Abdul Samad Khan. He has a Master’s degree in Software Engineering. He has 10 years of experience in mobile application and website development. He has his own software house in which 100 employees work and he is the CEO of their company. He has received the Best Developer Award from the Government of Pakistan in 2018.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-5">
      {/* Hero Section */}
      <div className="h-[500px] rounded-3xl my-7 w-[95%] mx-auto bg-black dark:bg-gray-900 text-white dark:text-white">
        <div
          className="relative bg-cover bg-center mt-20 h-[500px] rounded-3xl overflow-hidden flex items-center justify-center dark:bg-gray-900"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-80" />
          <div className="relative z-10 text-center px-4">
            <nav className="text-sm text-white dark:text-gray-200 mb-4 flex items-center justify-center">
              <Link
                to="/"
                onClick={scrollToTop}
                className="hover:underline text-white dark:text-gray-200 hover:text-yellow-400 dark:hover:text-yellow-400"
              >
                Home
              </Link>
              <span className="mx-2 text-[#387B55] dark:text-yellow-400 text-2xl -mt-1">
                ›
              </span>
              <span className="text-white dark:text-gray-200">Our Team</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white leading-tight">
              Meet Our Team
            </h1>
          </div>
        </div>
      </div>

      {/* Team Intro */}
      <div className="px-6 py-10 md:px-10 flex flex-col md:flex-row items-start gap-10">
        <div className="flex-shrink-0 w-full md:w-[50%]">
          <img
            src={team}
            alt="Team"
            className="w-full h-[450px] rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col w-full md:w-[55%]">
          <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-4">
            Meet the AAAO Core Team – Driven by Experience, Powered by Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-[.9rem] leading-relaxed mb-6">
            Behind AAAO Go is a strategic team of experts with deep-rooted
            experience in technology, transportation, tourism, hospitality,
            finance, retail, and smart services.
          </p>
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-green-700 dark:bg-yellow-500 dark:text-gray-900 text-white p-3 rounded-full">
              <FaBriefcase className="text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-yellow-400">
                Combined Experience of 50+ Years
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mt-1 text-sm leading-relaxed">
                Our leadership team holds over 50 years of combined industry
                experience, ensuring AAAO Go is built with insight, integrity,
                and future-focused strategy.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-green-700 dark:bg-yellow-500 dark:text-gray-900 text-white p-3 rounded-full">
              <FaRocket className="text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-yellow-400">
                Built to Scale, Structured to Lead
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mt-1 text-sm leading-relaxed">
                This team is architecting the AAAO Empire with clarity and
                commitment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-black dark:text-white">
            MEET OUR FOUNDER
          </h2>
          <h3 className="text-xl font-semibold text-black dark:text-white">
            A VISIONARY ARCHITECT OF INNOVATION
          </h3>
          <div className="bg-black dark:bg-gray-700 text-white dark:text-gray-200 px-4 py-2 inline-block font-semibold tracking-wider">
            MR MI KHAN BUDDA KHEL
          </div>
          <h4 className="font-bold text-lg text-black dark:text-white mt-2">
            (CEO)
          </h4>
          <p className="text-gray-800 dark:text-gray-200 text-justify mb-5">
            Starting as a laborer and rising to global leadership, Founder is a
            true embodiment of resilience and ambition. With 10 years of
            experience... driving innovation and inspiring change.
          </p>
          <button className="bg-[#319A64] dark:bg-yellow-500 dark:text-gray-900 text-white px-6 py-2 rounded hover:bg-green-700 dark:hover:bg-yellow-400 mt-5 transition-colors duration-300">
            <a
              href="https://digitalcontacts.info/mikhanbuddakhel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Profile
            </a>
          </button>
        </div>
        <div className="md:w-[40%] mt-8 md:mt-0 flex justify-center">
          <img
            src={ceo}
            alt="Founder"
            className="max-w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Team Cards */}
      <div className="px-4 py-12 text-center bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
          MEET OUR TEAM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden p-4 flex flex-col items-center"
              style={{ boxShadow: "1px 1px 10px #585858" }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-60 object-cover rounded"
              />
              <h3 className="mt-4 text-lg whitespace-nowrap font-semibold text-black dark:text-white">
                {member.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-200">{member.role}</p>
              <button
                onClick={() => setSelectedMember(member)}
                className="mt-4 bg-[#319A64] dark:bg-yellow-500 dark:text-gray-900 text-white px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-yellow-400 transition-colors duration-300 flex items-center gap-1"
              >
                Read More <span>&rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full p-6 relative shadow-lg">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
            >
              <FaTimes size={20} />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full md:w-[40%] h-60 object-cover rounded"
              />
              <div className="md:w-[60%] max-h-60 overflow-y-auto pr-2">
                <p className="text-red-700 dark:text-yellow-400 font-semibold mb-2">
                  {selectedMember.title}
                </p>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {selectedMember.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line">
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
