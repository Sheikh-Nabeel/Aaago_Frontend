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
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-5">
      <div className="h-[500px]  rounded-3xl my-7 w-[95%] mx-auto bg-black text-white">
        <div
          className="relative mt-20 bg-cover  bg-center h-[500px] rounded-3xl overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center px-4">
            <nav className="text-sm text-white/80 mb-4 flex items-center justify-center">
              <Link to="/" className="hover:underline text-white">Home</Link>
              <span className="mx-2 text-[#387B55] text-2xl -mt-1">›</span>
              <span>Contact</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Connect with Us for Any Questions <br className="max-lg:hidden" /> or Concerns
            </h1>
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto text-green-800 dark:text-green-300 px-6 py-10 md:flex md:justify-between md:items-start gap-10">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold">Get In Touch With Us</h2>
          <p className="text-gray-600 dark:text-gray-300">Get in Touch – Your Ride is Just a Call Away!</p>
          <div className="flex gap-8 max-lg:flex-col">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-gray-700 p-3 rounded-full">
                <FaMapMarkerAlt className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold">Our Office</h3>
                <p className="text-gray-600 dark:text-gray-300">Office Address: Alabraj Street<br />Business Bay Dubai UAE</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-gray-700 p-3 rounded-full">
                <FaPhoneAlt className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold">Contact Info</h3>
                <p className="text-gray-600 dark:text-gray-300">+1 (917) 426-0742<br />support@aaaogo.com</p>
              </div>
            </div>
          </div>
          <hr className="border-gray-300 dark:border-gray-600" />
          <div>
            <h4 className="font-semibold">Our Social Media :</h4>
            <div className="flex gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 transition"
                >
                  <Icon className="text-gray-900 dark:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 bg-green-100 dark:bg-gray-800 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Leave Us A Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Message"
                className="w-full p-2 rounded border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 dark:hover:bg-green-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;