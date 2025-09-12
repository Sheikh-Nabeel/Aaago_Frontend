import React from 'react';
import { Link } from 'react-router-dom';
import bg from './Images/bg.jpg';
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaInstagram, FaTelegramPlane, FaTiktok } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';

const Contact = () => {
  const socialLinks = [
    { icon: FaFacebookF, url: 'https://www.facebook.com/AAAOGOINTL?rdid=5c6cGwC8Rj2HeWyR&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19wGmUZcnH%2F#' },
    { icon: FaInstagram, url: 'https://www.instagram.com/aaaogointl/?igsh=dzd1dGJtcXB1OXpn#' },
    { icon: RiTwitterXLine, url: 'https://x.com/i/flow/login?redirect_after_login=%2Faaaogointl' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@aaaogointl?_t=ZS-8wxikZG1BBZ&_r=1' },
    { icon: FaTelegramPlane, url: 'https://t.me/aaaogointl' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-2 sm:p-5">
      <div className="h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-3xl my-4 sm:my-7 w-[95%] mx-auto bg-black text-white">
        <div
          className="relative mt-10 sm:mt-20 bg-cover bg-center h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center px-4 sm:px-6">
            <nav className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-4 flex items-center justify-center">
              <Link to="/" className="hover:underline text-white">Home</Link>
              <span className="mx-1 sm:mx-2 text-[#387B55] text-lg sm:text-2xl -mt-1">›</span>
              <span>Contact</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-2">
              Connect with Us for Any Questions <br className="hidden sm:block lg:hidden xl:block" /> 
              <span className="block sm:hidden">or Concerns</span>
              <span className="hidden sm:block lg:block xl:hidden">or Concerns</span>
            </h1>
          </div>
        </div>
      </div>
      
      <div className="w-[95%] mx-auto text-green-800 dark:text-green-300 px-3 sm:px-6 py-6 sm:py-10 md:flex md:justify-between md:items-start gap-6 lg:gap-10">
        <div className="md:w-1/2 space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Get In Touch With Us</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Get in Touch – Your Ride is Just a Call Away!</p>
          
          <div className="flex flex-col sm:flex-row sm:gap-8 lg:flex-col xl:flex-row space-y-6 sm:space-y-0 lg:space-y-6 xl:space-y-0">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-green-100 dark:bg-gray-700 p-2 sm:p-3 rounded-full flex-shrink-0">
                <FaMapMarkerAlt className="text-green-600 dark:text-green-300 text-lg sm:text-xl" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base">Our Office</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Office Address: Alabraj Street<br />Business Bay Dubai UAE
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-green-100 dark:bg-gray-700 p-2 sm:p-3 rounded-full flex-shrink-0">
                <FaPhoneAlt className="text-green-600 dark:text-green-300 text-lg sm:text-xl" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base">Contact Info</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                  +1 (917) 426-0742<br />support@aaaogo.com
                </p>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-300 dark:border-gray-600" />
          
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Our Social Media :</h4>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Icon className="text-gray-900 dark:text-white text-base sm:text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-8 sm:mt-10 md:mt-0 bg-green-100 dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Leave Us A Message</h3>
          <form className="space-y-3 sm:space-y-4">
            <div>
              <label className="block mb-1 text-sm sm:text-base font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 sm:p-3 text-sm sm:text-base rounded border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm sm:text-base font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 sm:p-3 text-sm sm:text-base rounded border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm sm:text-base font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Enter your message"
                className="w-full p-2 sm:p-3 text-sm sm:text-base rounded border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 sm:py-3 text-sm sm:text-base rounded hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-200 active:transform active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;