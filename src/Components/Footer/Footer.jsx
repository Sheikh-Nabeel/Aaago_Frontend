import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
import { RiTwitterXLine } from "react-icons/ri";
import taxi from './images/taxi.png';
import powered from './images/powered.png';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, url: 'https://www.facebook.com/AAAOGOINTL?rdid=5c6cGwC8Rj2HeWyR&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19wGmUZcnH%2F#' },
    { icon: FaInstagram, url: 'https://www.instagram.com/aaaogointl/?igsh=dzd1dGJtcXB1OXpn#' },
    { icon: RiTwitterXLine, url: 'https://x.com/i/flow/login?redirect_after_login=%2Faaaogointl' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@aaaogointl?_t=ZS-8wxikZG1BBZ&_r=1' },
    { icon: FaTelegramPlane, url: 'https://t.me/aaaogointl' },
  ];

  return (
    <footer className="bg-[#083A06] text-white px-6 py-10 w-[95%] mx-auto rounded-3xl">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <a href='tel:+19174260742' className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-green-400" /> +1 (917) 426-0742
          </a>
          <a href='mailto:support@aaaogo.com' className="flex items-center gap-2 mb-4">
            <FaEnvelope className="text-green-400" /> support@aaaogo.com
          </a>
          <h4 className="text-lg font-semibold mb-2">Social Accounts</h4>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-800 p-2 rounded-full hover:bg-green-600 transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
       <div>
  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
  <ul className="space-y-2">
    {[
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Team', path: '/team' },
      { name: 'FAQS', path: '/faqs' },
      { name: 'Contact', path: '/contact' },
    ].map((item) => (
      <li key={item.name}>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `hover:text-green-400 cursor-pointer transition-colors duration-200 ${
              isActive ? 'text-green-500 font-semibold' : ''
            }`
          }
        >
          {item.name}
        </NavLink>
      </li>
    ))}
  </ul>
</div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-green-400 cursor-pointer">Terms And Conditions</li>
            <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-green-400 cursor-pointer">Refer A Friend</li>
            <li className="hover:text-green-400 cursor-pointer">Become A Member</li>
          </ul>
        </div>

        {/* Office */}
        <div>
          <h3 className="text-xl font-bold mb-4">Our Office</h3>
          <p>Office Address: Alabraj</p>
          <p>Street Business Bay Dubai</p>
          <p>UAE</p>
        </div>
      </div>

      {/* Animated Taxi */}
     <div className="relative w-full mt-10 h-16 overflow-hidden">
  <img
    src={taxi}
    alt="taxi"
    className="w-16 h-16 absolute top-0 
               animate-moveTaxiMobile sm:animate-moveTaxiDesktop"
  />
</div>


      {/* Footer Bottom */}
      <div className="border-t border-white pt-4 text-center text-sm flex flex-col items-center gap-2">
        <p className="flex gap-2 items-center">
          POWERED BY <span className="font-bold">I AM AAAO</span>
          <img src={powered} className="w-5 rounded-full" alt="powered" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
export {RiTwitterXLine}
