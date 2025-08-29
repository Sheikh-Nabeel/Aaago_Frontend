import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg from "./Images/bg.jpg";
import {
  CountUp,
  FaCheckCircle,
  FaShieldAlt,
  flagdirection,
} from "../Home/Home";
import future from "./Images/future.jpg";
import { useInView } from "react-intersection-observer";
import card1 from "./Images/card1.png";
import card2 from "./Images/card2.png";
import card3 from "./Images/card3.png";
import card4 from "./Images/card4.png";
import card5 from "./Images/card5.png";
import card6 from "./Images/card6.png";
import card7 from "./Images/card7.png";
import card8 from "./Images/card8.png";
import card9 from "./Images/card9.png";
import recovery from "./Images/recovery.jpeg";
import rides from "./Images/rides.jpeg";
import shifting from "./Images/shifting.jpeg";
import autofix from "./Images/autofix.jpeg";
import tyrezone from "./Images/tyrezone.jpeg";
import keyassist from "./Images/keyassist.jpeg";
import autohub from "./Images/autohub.jpeg";
import tourism from "./Images/tourism.jpeg";
import wash from "./Images/wash.jpeg";

const services = [
  {
    title: "Car Recovery Services",
    icon: "🚨",
    image: card1,
    need: "Why You Might Need Car Recovery:",
    cardimg: recovery,
    span1: "🔋 Dead Battery",
    p1: ` – Vehicle won’t start? We’ll recharge or tow.`,
    span2: "🛠️ Engine Failure",
    p2: " – Sudden breakdowns require expert towing.",
    span3: "🚧 Accidents or Collisions",
    p3: " – Reliable recovery after any incident.",
    span4: "🚗 Overheating or Mechanical Trouble",
    p4: " – Prevent further damage.",
    span5: "⚫ Flat Tires or Wheel Problems",
    p5: " – Fast recovery when you're stuck.",
    span6: "⛺ Stuck in Desert/Sand",
    p6: " – Special recovery vehicles for off-road issues.",
    span7: "🌙 Night-Time Emergencies",
    p7: " – Round-the-clock assistance.",
    span8: "📑 Pre-Registration Transport",
    p8: " – Move for registration/testing.",
    span9: "🚛 Car Export/Import",
    p9: " – Support for port transfers.",
    span10: "🏙️ Car Transfer Between Cities",
    p10: " – Safe city-to-city vehicle movement.",
    description:
      "Get back on the road — safely and swiftly. AAAO Go offers 24/7 car recovery support across the UAE. Whether it’s an unexpected breakdown or a scheduled vehicle movement, our trained team ensures smooth, secure transport — anytime, anywhere.",
  },
  {
    title: "AAAO rides / cab services",
    icon: "🚖",
    image: card2,
    need: "Why Choose AAAO Go Cabs?",
    cardimg: rides,
    span1: "📱 Instant Booking via App",
    p1: " – Book a ride within seconds.",
    span2: "⏱️ On-Time Pickups",
    p2: " – Real-time tracking & punctual arrivals.",
    span3: "🚗 Wide Range of Vehicles",
    p3: " – From economy to luxury.",
    span4: "💳 Transparent Pricing",
    p4: " – No hidden fees. No surprises.",
    span5: "🕒 Time-Based or Hourly Fares",
    p5: " – Book by trip or by the hour — perfect for city tours or meetings.",
    span6: "✈️ Airport Transfers",
    p6: " – Fast, professional airport pick-ups & drop-offs.",
    span7: "👩‍👧 PINK RIDES /Family-Friendly Options",
    p7: " – No male companion rides available for women & families (optional filter).",
    span8: "👨‍✈️ Professional Drivers",
    p8: " – Verified, trained, and polite.",
    span9: "🌙 24/7 Availability",
    p9: " – Day or night, we’re always on the move.",
    description:
      "Your ride, your way –with AAAO Go. We provide fast, comfortable, and affordable cab services across the UAE, tailored to your lifestyle. Whether it’s a short ride or an all-day booking, AAAO Go gets you there – safely and on time.",
  },
  {
    title: "Packers & Shifting Movers",
    icon: "📦",
    image: card3,
    need: "Why Choose AAAO Go Movers?",
    cardimg: shifting,
    span1: "🪑 Furniture & Luggage Shifting",
    p1: " - From delicate items to heavy furniture, we move your belongings with care and precision.",
    span2: "🔧 Fixing Experts (On-Demand)",
    p2: " - Need help assembling or disassembling? Our skilled technicians are available on request to handle installations and setups.",
    span3: "🧳 Helpers for Lifting & Loading",
    p3: " - Professional helpers can be booked along with your move to assist in loading, unloading, and organizing items — saving your time and effort.",
    description:
      "Hassle-free moving services tailored to your needs — whether it's a single item or a full house.",
  },
  {
    title: "AAAO AutoFix – Trusted Repairing Services",
    icon: "🛠️",
    image: card4,
    cardimg: autofix,
    span1: "🚗 Verified Workshops",
    p1: " - We list only registered workshops that meet our quality and service standards.",
    span2: "📊 Performance-Based Suggestions",
    p2: " - Our smart system recommends workshops based on customer ratings, service history, and pricing – ensuring you get the best value every time.",
    span3: "📍 Nearby & Transparent",
    p3: " - Easily find nearby workshops with real-time tracking, price monitoring, and honest customer reviews – all within the AAAO Go app.",
    description:
      "AAAO AutoFix connects you with the top-rated workshops registered on our platform, offering reliable, affordable, and fast repair services.",
  },
  {
    title: "AAAO TyreZone – Smart Tyre Solutions",
    icon: "⚙️",
    image: card5,
    cardimg: tyrezone,
    span1: "✅ Verified Tyre Shops",
    p1: " - All listed tyre vendors are registered and meet our quality and service benchmarks.",
    span2: "📈 Rating-Based Recommendations",
    p2: " - Our system suggests the best tyre shops using real-time customer reviews, service quality history, and competitive pricing.",
    span3: "📍 Nearby & Honest",
    p3: " - Get quick access to the nearest tyre shop with live tracking, price comparisons, and service guarantees, all within the AAAO Go platform.",
    description:
      "AAAO TyreZone helps you find top-rated tyre shops near you, offering a wide range of services from tyre replacement to wheel balancing, all based on customer satisfaction and pricing transparency.",
  },
  {
    title: "AAAO KeyAssist – Fast & Reliable Unlocking & Road Help",
    icon: "🔑",
    image: card6,
    cardimg: keyassist,
    span1: "✅ Certified Locksmiths & Road Experts",
    p1: " - All service providers are licensed, background-checked, and trained to deliver fast, damage-free solutions with professional care.",
    span2: "📍 Nearby & On-Demand",
    p2: " - Instantly locate the closest expert for unlocking or roadside help, with real-time tracking, upfront pricing, and service guarantees.",
    span3: "🔧 Comprehensive Road Assistance",
    p3: " - From jump-starting your battery to helping with flat tyres, fuel delivery, or minor mechanical issues — AAAO KeyAssist has your back.",
    span4: "🔐 Safe, Transparent, & Stress-Free",
    p4: " - Forget the panic. AAAO Go ensures you get reliable help with live support, secure payments, and complete peace of mind.",
    description:
      "AAAO KeyAssist is your trusted companion for emergency key unlocking and roadside assistance. Whether you're locked out of your car, home, or office — or facing minor breakdowns on the road — help is just a tap away inside the AAAO Go platform",
  },
  {
    title: "AAAO AutoHub – Verified Showrooms & Car Dealers",
    icon: "🚘",
    image: card7,
    cardimg: autohub,
    span1: "✅Verified Dealers Only",
    p1: ` - We list only officially registered showrooms and dealers who meet our quality, service, and trust standards.`,
    span2: "📈 Rating-Based Listings",
    p2: " - Dealers are ranked using customer reviews, service history, pricing fairness, and after-sale support.",
    span3: "🚗 New & Pre-Owned Options",
    p3: " - Browse a wide variety of vehicles — from brand-new cars to inspected and certified pre-owned models.",
    span4: "💼 Smart Filters & Deals",
    p4: " - Search by brand, price range, location, or car type. Get access to exclusive AAAO Go deals and showroom offers.",
    span5: "📍 Nearby & Contact",
    p5: "- Free Booking -Find the nearest dealer, book a test drive, or schedule a visit — all within the AAAO Go platform.",
    description:
      "AAAO AutoHub connects you with trusted car showrooms and licensed vehicle dealers near you — offering a wide selection of new and used vehicles, financing options, and transparent dealer ratings, all inside the AAAO Go ecosystem.",
  },
  {
    title: "AAAO Explore – Complete Tourism, Events & Local Experience Hub",
    icon: "🌍",
    image: card8,
    cardimg: tourism,
    span1: "✅ Expert Tour Guides & Custom Tours",
    p1: ` - Hire trusted local guides for hourly or daily trips — from city walks to desert safaris — with transparent, fixed pricing.`,
    span2: "🏨 Verified Hotels & Guest Houses",
    p2: " - Book AAAO-approved accommodations with real reviews, clear amenities, and best-price guarantees — no hidden costs.",
    span3: "🍽️ Top-Rated Local Restaurants",
    p3: " - Dine smart with budget-friendly, highly-rated eateries near you — searchable by cuisine, price, and open status.",
    span4: "🎉 Event Planning & Management",
    p4: " - Plan birthdays, weddings, corporate retreats, or travel events with ease. AAAO connects you with certified event planners, venues, and services that match your style and budget.",
    span5: "📍 All Nearby, All in One Place",
    p5: " - Use AAAO Go to instantly locate and book all services — tours, stays, meals, and events — with real-time tracking and 24/7 support.",
    description:
      "AAAO Explore is your smart gateway to discover, book, and enjoy unforgettable experiences — combining guided tours, verified hotels, affordable dining, and event planning into one powerful platform.",
  },
  {
    title: "AAAO ShineZone – Trusted Car Wash & Detailing Near You",
    icon: "🚿",
    image: card9,
    cardimg: wash,
    span1: "✅ Verified Wash Centers & Mobile Teams",
    p1: ` - Only AAAO-approved providers offering quality, eco-friendly, and reliable service.`,
    span2: "🚗 From Quick Wash to Full Detailing",
    p2: " - Choose from basic exterior wash, interior vacuuming, waxing, or full premium detailing packages.",
    span3: "💵 Transparent & Affordable Rates",
    p3: " - No overcharging — get fixed, visible pricing for every service, including packages for daily, weekly, or monthly care.",
    span4: "📍 Nearby & On-Demand",
    p4: " - Find the closest wash station or book a mobile car wash at your home or office via the AAAO Go app.",
    span5: "🕒 Real-Time Availability",
    p5: " - Book instantly, view service hours, and track your service live — all from your phone.",
    description:
      "AAAO ShineZone connects you with verified car wash professionals offering on-site or drive-in services — from basic cleaning to premium detailing, all at fair, upfront prices.",
  },
];

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [selectedService, setSelectedService] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-5">
      <div className="h-[500px] rounded-3xl my-7 w-[95%] mx-auto bg-black dark:bg-gray-900 text-white dark:text-white">
        <div
          className="relative mt-20 bg-cover bg-center h-[500px] rounded-3xl overflow-hidden flex items-center justify-center dark:bg-gray-900"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-80" />
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
              <span className="text-white dark:text-gray-200">Services</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white leading-tight">
              Experience Convenience Our Service{" "}
              <br className="max-lg:hidden" /> Offerings
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative mb-32 max-lg:mb-0 py-12 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-[50%] max-lg:w-[100%]">
          <img
            src={future}
            alt="Driver with customer"
            className="rounded-3xl w-full object-cover"
          />
        </div>
        <div className="w-[50%] max-lg:w-[100%]">
          <h2 className="text-5xl font-bold max-lg:text-4xl text-[#0B996F] dark:text-yellow-400 mb-4">
            The Future We See
          </h2>
          <ul className="space-y-3 mb-6 text-gray-700 dark:text-gray-200">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-[#0B996F] dark:text-yellow-400 mt-1" />
              A global ride-hailing network that empowers drivers & customers.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-[#0B996F] dark:text-yellow-400 mt-1" />
              Creating financial freedom and opportunities.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-[#0B996F] dark:text-yellow-400 mt-1" />
              Sustainable & innovative mobility solutions.
            </li>
          </ul>
          <p className="mb-6 text-gray-700 dark:text-gray-200">
            <span className="font-bold">Our vision is simple</span> – to build a
            ride-hailing platform where drivers earn fairly, customers enjoy
            reliable services, and communities thrive through innovation.
          </p>
          <div className="flex items-start gap-3 p-2 rounded-lg">
            <div className="bg-green-200 dark:bg-gray-700 p-3 rounded-full">
              <FaShieldAlt className="text-[#0B996F] dark:text-yellow-400 text-2xl" />
            </div>
            <div>
              <p className="font-bold text-[#0B996F] dark:text-yellow-400 text-lg">
                Safety Measures
              </p>
              <p className="text-gray-600 dark:text-gray-200 text-sm">
                Verified drivers, real-time tracking & No Male Companion rides
                for ladies and families – your peace of mind comes first.
              </p>
            </div>
          </div>
        </div>
        <img
          src={flagdirection}
          alt=""
          className="absolute max-lg:hidden left-[22%] w-[40%] -bottom-28"
        />
      </div>

      <div className="text-center mb-12">
        <button className="bg-[#1E784B] dark:bg-yellow-500 dark:text-gray-900 text-white text-sm font-semibold px-8 py-3 rounded-full mb-4 hover:bg-green-700 dark:hover:bg-yellow-400 transition-colors duration-300">
          The Perfect Ride Awaits
        </button>
        <h2 className="text-5xl font-bold max-lg:text-4xl text-[#0B996F] dark:text-yellow-400">
          One App, Unlimited Possibilities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-20 max-lg:px-4 bg-white dark:bg-gray-800">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#E2F4EA] dark:bg-gray-700 rounded-lg shadow px-5 py-3 flex flex-col justify-between"
          >
            <img
              src={service.image}
              alt={service.title}
              className="h-32 w-full rounded-2xl object-cover"
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
              <span className="mr-2 text-sm">{service.icon}</span>
              {service.title}
            </h3>
            <p className="text-xs text-gray-700 dark:text-gray-200 mt-2 flex-grow">
              {service.description}
            </p>
            <button
              onClick={() => setSelectedService(service)}
              className="bg-[#319A64] dark:bg-yellow-500 dark:text-gray-900 text-white px-2 py-1 mt-4 rounded hover:bg-green-700 dark:hover:bg-yellow-400 w-fit transition-colors duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-60 z-50 flex justify-center items-center px-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 rounded-xl bg-white dark:bg-gray-800 p-6 max-w-5xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 text-2xl"
            >
              ×
            </button>

            <img
              src={selectedService.cardimg}
              alt={selectedService.title}
              className="w-full lg:w-[40%] object-cover rounded-xl max-h-[500px]"
            />

            <div className="w-full lg:w-[60%] overflow-y-auto">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
                {selectedService.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                {selectedService.description}
              </p>
              <h4 className="font-semibold text-base mb-2 text-gray-800 dark:text-white">
                {selectedService.need}
              </h4>
              <ul className="text-sm text-gray-700 dark:text-gray-200 list-disc ml-5 space-y-3">
                {selectedService.span1 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span1}</span>{" "}
                    {selectedService.p1}
                  </li>
                )}
                {selectedService.span2 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span2}</span>{" "}
                    {selectedService.p2}
                  </li>
                )}
                {selectedService.span3 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span3}</span>{" "}
                    {selectedService.p3}
                  </li>
                )}
                {selectedService.span4 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span4}</span>{" "}
                    {selectedService.p4}
                  </li>
                )}
                {selectedService.span5 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span5}</span>{" "}
                    {selectedService.p5}
                  </li>
                )}
                {selectedService.span6 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span6}</span>{" "}
                    {selectedService.p6}
                  </li>
                )}
                {selectedService.span7 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span7}</span>{" "}
                    {selectedService.p7}
                  </li>
                )}
                {selectedService.span8 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span8}</span>{" "}
                    {selectedService.p8}
                  </li>
                )}
                {selectedService.span9 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span9}</span>{" "}
                    {selectedService.p9}
                  </li>
                )}
                {selectedService.span10 && (
                  <li className="list-none">
                    <span className="font-bold">{selectedService.span10}</span>{" "}
                    {selectedService.p10}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div
        ref={ref}
        className="bg-[#e8f9f1] dark:bg-gray-800 text-center py-16 px-4 mb-12 max-lg:py-8"
      >
        <h2 className="text-5xl font-bold max-lg:text-4xl text-[#0B996F] dark:text-yellow-400 mb-12">
          Breaking Barriers, Building a Fairer Future
          <br />
          for One Billion People
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-36 max-lg:gap-10">
          <div>
            <p className="text-5xl font-bold text-[#555D55] dark:text-white">
              {inView && <CountUp end={5} duration={2} />}
            </p>
            <p className="text-xl text-[#555D55] dark:text-gray-200 mt-2">
              countries
            </p>
          </div>
          <div>
            <p className="text-5xl font-bold text-[#555D55] dark:text-white">
              {inView && <CountUp end={144} duration={2} />}
            </p>
            <p className="text-xl text-[#555D55] dark:text-gray-200 mt-2">
              cities
            </p>
          </div>
          <div>
            <p className="text-5xl font-bold text-[#555D55] dark:text-white">
              {inView && <CountUp end={1500} duration={2.5} separator="," />}
            </p>
            <p className="text-xl text-[#555D55] dark:text-gray-200 mt-2">
              Registered Members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
