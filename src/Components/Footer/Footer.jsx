import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import taxi from "./images/taxi2.png";
import powered from "./images/powered.png";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

const Footer = () => {
  const { theme } = useTheme(); // Access theme from ThemeContext

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://www.facebook.com/AAAOGOINTL?rdid=5c6cGwC8Rj2HeWyR&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19wGmUZcnH%2F#",
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/aaaogointl/?igsh=dzd1dGJtcXB1OXpn#",
    },
    {
      icon: RiTwitterXLine,
      url: "https://x.com/i/flow/login?redirect_after_login=%2Faaaogointl",
    },
    {
      icon: FaTiktok,
      url: "https://www.tiktok.com/@aaaogointl?_t=ZS-8wxikZG1BBZ&_r=1",
    },
    { icon: FaTelegramPlane, url: "https://t.me/aaaogointl" },
  ];

  return (
    <footer
      className={`px-6 py-10 w-[95%] mx-auto rounded-3xl transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-[#083A06] text-white"
      }`}
    >
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <a
            href="tel:+19174260742"
            className="flex items-center gap-2 mb-2 hover:text-yellow-400 transition-colors"
          >
            <FaPhoneAlt
              className={
                theme === "dark" ? "text-yellow-400" : "text-green-400"
              }
            />
            +1 (917) 426-0742
          </a>
          <a
            href="mailto:support@aaaogo.com"
            className="flex items-center gap-2 mb-4 hover:text-yellow-400 transition-colors"
          >
            <FaEnvelope
              className={
                theme === "dark" ? "text-yellow-400" : "text-green-400"
              }
            />
            support@aaaogo.com
          </a>
          <h4 className="text-lg font-semibold mb-2">Social Accounts</h4>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-yellow-500"
                    : "bg-green-800 hover:bg-green-600"
                }`}
              >
                <Icon
                  className={
                    theme === "dark" ? "text-yellow-400" : "text-white"
                  }
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Team", path: "/team" },
              { name: "FAQS", path: "/faqs" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={scrollToTop}
                  className={({ isActive }) =>
                    `transition-colors duration-200 ${
                      isActive
                        ? theme === "dark"
                          ? "text-yellow-400 font-semibold"
                          : "text-green-400 font-semibold"
                        : theme === "dark"
                        ? "text-gray-200 hover:text-yellow-400"
                        : "text-white hover:text-green-400"
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
            {[
              "Terms And Conditions",
              "Privacy Policy",
              "Refer A Friend",
              "Become A Member",
            ].map((item) => (
              <li
                key={item}
                className={`cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "text-gray-200 hover:text-yellow-400"
                    : "text-white hover:text-green-400"
                }`}
              >
                {item}
              </li>
            ))}
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
          className="w-16 h-16 absolute top-0 animate-moveTaxiMobile sm:animate-moveTaxiDesktop"
        />
      </div>

      {/* Footer Bottom */}
      <div
        className={`border-t pt-4 text-center text-sm flex flex-col items-center gap-2 ${
          theme === "dark" ? "border-gray-700" : "border-white"
        }`}
      >
        <p
          className={`flex gap-2 items-center ${
            theme === "dark" ? "text-gray-200" : "text-white"
          }`}
        >
          POWERED BY <span className="font-bold">I AM AAAO</span>
          <img src={powered} className="w-5 rounded-full" alt="powered" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
export { RiTwitterXLine };
