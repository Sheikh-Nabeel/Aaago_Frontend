import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import { RiFileDownloadFill } from 'react-icons/ri';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import bgImage from './Images/bg.jpg';
import phone1 from './Images/mobile.png';
import driverimg from './Images/wherego.jpeg';
import future from './Images/futuresee.jpeg';
import direction from './Images/direction.png';
import flagdirection from './Images/flagdirection.png';
import rides from './Images/rides.png';
import connectors from './Images/connectors.png';
import recoveries from './Images/recoveries.png';
import delivery from './Images/delivery.png';
import shifting from './Images/shifting.png';
import tourism from './Images/tourism.png';
import bg2 from './Images/bg2.png';
import phoneApp from './Images/book.png';
import womanImage from './Images/booklady.jpg';
import googlePlay from './Images/playbutton.png';
import appStore from './Images/appbutton.png';
import manTablet from './Images/countless1.jpg';
import womanCar from './Images/countless2.png';
import locationPath from './Images/countless3.png';
import brochure from '../../assets/brochure.pdf';
import document1 from '../../assets/document1.pdf';
import guide from '../../assets/guide.pdf';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'Sarah Harvey',
    review:
      'Cabsy commitment to excellence is evident, prioritize customer satisfaction, making them the best choice for reliable and enjoyable rides.',
    rating: 4.5,
  },
  {
    name: 'James Wright',
    review:
      'The drivers are always punctual and polite. The app is intuitive and booking is seamless. I never have to worry about my daily commute anymore!',
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    review:
      'Great service every time! I love how clean the vehicles are and how safe I feel. Definitely recommend AAAO GO to friends.',
    rating: 4,
  },
  {
    name: 'Amir Qureshi',
    review:
      'Fantastic experience! The driver was professional and arrived on time. The whole journey was smooth and safe.',
    rating: 5,
  },
  {
    name: 'Linda Carter',
    review:
      'Highly impressed with the service quality. From booking to drop-off, the whole process was fast and reliable.',
    rating: 4.5,
  },
];

const services = [
  {
    title: 'Regional Rides',
    description: 'Smooth and reliable rides within your city – whenever, wherever.',
    Image: rides,
  },
  {
    title: 'City Connectors',
    description: 'Connecting cities with affordable, comfortable, and safe travel.',
    Image: connectors,
  },
  {
    title: 'Car Recoveries',
    description: 'Stuck on the road? We recover your car quickly and safely.',
    Image: recoveries,
  },
  {
    title: 'Courier Delivery',
    description: 'Fast, secure, and on-time courier delivery across your city.',
    Image: delivery,
  },
  {
    title: 'Shifting Movers (Home & Office Shifting)',
    description: 'Hassle-free home and office shifting, handled with care.',
    Image: shifting,
  },
  {
    title: 'Tourism Discovery',
    description: 'Discover breathtaking destinations with guided local travel.',
    Image: tourism,
  },
];

const rideOptions = [
  {
    title: 'Airport Transfers',
    description: 'Swift rides to or from the airport – on time, every time',
    icon: '🛫',
  },
  {
    title: 'Hourly Rentals',
    description: 'Ride on your time. Rent by the hour with full flexibility.',
    icon: '⏱️',
  },
  {
    title: 'Ride-Sharing',
    description: 'Split the ride, save the cost—go greener together.',
    icon: '👥',
  },
  {
    title: 'Move Your Car (Car Recovery)',
    description: "Stranded? We'll move your car—fast, safe, and reliable.",
    icon: '🚗',
  },
  {
    title: 'Package Delivery',
    description: 'From parcels to full house moves—labour, fixer, and vehicle included.',
    icon: '📦',
  },
  {
    title: 'Custom Delivery',
    description: 'Sed adipisci velit, sed quia non numquam eius modi tempora',
    icon: '📨',
  },
  {
    title: 'Scheduled Rides',
    description: 'Plan ahead. Book now, ride later—your time, your way.',
    icon: '📅',
  },
  {
    title: 'Corporate Accounts',
    description: 'Business travel made easy with centralized billing & control.',
    icon: '💳',
  },
];

const Home = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  let groups = [];
  let index = 0;
  let layoutPattern = [3, 2, 3];
  let layoutIndex = 0;

  while (index < rideOptions.length) {
    const groupSize = layoutPattern[layoutIndex % layoutPattern.length];
    groups.push(rideOptions.slice(index, index + groupSize));
    index += groupSize;
    layoutIndex++;
  }

  const pdfFiles = [
    { name: 'brochure.pdf', file: brochure },
    { name: 'document1.pdf', file: document1 },
    { name: 'guide.pdf', file: guide },
  ];

  const handleDownloadPDFs = async () => {
    try {
      const zip = new JSZip();
      for (const pdf of pdfFiles) {
        const response = await fetch(pdf.file);
        const blob = await response.blob();
        zip.file(pdf.name, blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'assets_pdfs.zip');
    } catch (error) {
      console.error('Error downloading PDFs:', error);
      alert('Failed to download PDFs. Please try again.');
    }
  };

  return (
    <div className="bg-white p-5 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div
        className="relative mt-20 w-[95%] my-7 rounded-3xl mx-auto h-[120vh] max-lg:h-auto max-lg:py-10 max-lg:px-2 max-lg:gap-10 bg-cover bg-center flex flex-row-reverse max-lg:flex-col-reverse items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
        <div className="relative z-10 w-[60%] max-lg:w-[100%] text-white text-center px-4 max-w-4xl">
          <div className="inline-block bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-md px-8 py-2 rounded-full mb-4">
            The Perfect Ride Awaits
          </div>
          <h1 className="text-[2.5rem] font-semibold mb-4">AAAO GO – WHEREVER YOU GO</h1>
          <p className="text-lg md:text-xl mb-6">
            A revolutionary ride-hailing platform designed for drivers, customers, and service providers.
            We are building not just a business, but a community that grows together.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-[#319A64] hover:bg-green-700 dark:hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold">
              Download App
            </button>
            <button
              onClick={handleDownloadPDFs}
              className="bg-[#319A64] hover:bg-green-800 dark:hover:bg-green-800 text-white flex gap-2 items-center px-6 py-3 rounded-lg text-lg font-semibold"
            >
              <RiFileDownloadFill /> Download PDFs
            </button>
          </div>
        </div>
        <div className="flex gap-4 w-[30%] max-lg:w-[70%] z-10">
          <img src={phone1} alt="Phone 1" className="w-full rounded-xl shadow-lg" />
        </div>
      </div>
      <div className="px-4 relative py-12 max-lg:py-6 mb-20 max-lg:mb-0 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-[45%] max-lg:w-[100%]">
          <h2 className="text-5xl font-bold text-[#0B996F] mb-4 max-lg:text-4xl">Who We Are?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10">Driven by Purpose—Powered by People</p>
          <div className="mb-10 pl-5">
            <p className="text-xl font-semibold flex items-center gap-2">
              🚀 <span className="text-[#555D55] dark:text-gray-200 text-xl font-bold">Our Mission :</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              To revolutionize transportation by putting fairness, transparency, and driver empowerment at the heart of everything we do.
            </p>
          </div>
          <div className="mb-10 pl-5">
            <p className="text-xl font-semibold flex items-center gap-2">
              🔄 <span className="text-[#555D55] dark:text-gray-200 text-xl font-bold">More Than Just Rides:</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We offer ride-hailing, car recovery services, and will expand into mobility support and lifestyle logistics — all under one unified platform.
            </p>
          </div>
          <div className="mb-10 pl-5 max-lg:mb-0">
            <p className="text-xl font-semibold flex items-center gap-2">
              🤝 <span className="text-[#555D55] dark:text-gray-200 text-xl font-bold">A Community-First Approach:</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Built under the I AM AAO empire, AAO Go is committed to creating a profitable, people-centered ecosystem where every rider, driver, and user can grow and thrive together.
            </p>
          </div>
          <div className="mb-10 pl-5 max-lg:mb-0">
            <p className="text-xl font-semibold flex items-center gap-2">
              🧭 <span className="text-[#555D55] dark:text-gray-200 text-xl font-bold">Our Movement :</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              AAAO Go is more than just a ride-hailing app—it’s a movement toward freedom, fairness, and future-forward innovation.
            </p>
          </div>
        </div>
        <img src={direction} alt="" className="w-[20%] absolute left-[45%] right-0 -bottom-14 max-lg:hidden" />
        <div className="w-[45%] flex justify-center mt-10 max-lg:w-[100%]">
          <img src={driverimg} alt="Driver and woman" className="rounded-2xl w-full object-cover" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 relative mb-32 max-lg:mb-0 py-12 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-[50%] max-lg:w-[100%]">
          <img src={future} alt="Driver with customer" className="rounded-3xl w-full object-cover" />
        </div>
        <div className="w-[50%] max-lg:w-[100%]">
          <h2 className="text-5xl font-bold max-lg:text-4xl text-[#0B996F] mb-4">The Future We See</h2>
          <ul className="space-y-3 mb-6 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-[#0B996F] mt-1" />
              A global ride-hailing network that empowers drivers & customers.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-[#0B996F] mt-1" />
              Creating financial freedom and opportunities.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-[#0B996F] mt-1" />
              Sustainable & innovative mobility solutions.
            </li>
          </ul>
          <p className="mb-6">
            <span className="font-bold">Our vision is simple</span> – to build a ride-hailing platform where drivers earn fairly, customers enjoy reliable services, and communities thrive through innovation.
          </p>
          <div className="flex items-start gap-3 p-2 rounded-lg">
            <div className="bg-green-200 dark:bg-green-800 p-3 rounded-full">
              <FaShieldAlt className="text-[#0B996F] text-2xl" />
            </div>
            <div>
              <p className="font-bold text-[#0B996F] text-lg">Safety Measures</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Verified drivers, real-time tracking & No Male Companion rides for ladies and families – your peace of mind comes first.
              </p>
            </div>
          </div>
        </div>
        <img src={flagdirection} alt="" className="absolute max-lg:hidden left-[22%] w-[40%] -bottom-28" />
      </div>
      <div ref={ref} className="bg-[#e8f9f1] dark:bg-gray-800 text-center py-16 px-4 mb-12 max-lg:py-8">
        <h2 className="text-5xl font-bold max-lg:text-4xl text-[#0B996F] mb-12">
          Breaking Barriers, Building a Fairer Future<br />for One Billion People
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-36 max-lg:gap-10">
          <div>
            <p className="text-5xl font-bold text-[#555D55] dark:text-gray-200">
              {inView && <CountUp end={5} duration={2} />}
            </p>
            <p className="text-xl text-[#555D55] dark:text-gray-300 mt-2">countries</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-[#555D55] dark:text-gray-200">
              {inView && <CountUp end={144} duration={2} />}
            </p>
            <p className="text-xl text-[#555D55] dark:text-gray-300 mt-2">cities</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-[#555D55] dark:text-gray-200">
              {inView && <CountUp end={1500} duration={2.5} separator="," />}
            </p>
            <p className="text-xl text-[#555D55] dark:text-gray-300 mt-2">Registered Members</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 px-4 mb-12">
        <div className="text-center mb-12">
          <button className="bg-[#1E784B] text-white text-sm font-semibold px-8 py-3 rounded-full mb-4">
            The Perfect Ride Awaits
          </button>
          <h2 className="text-5xl font-bold max-lg:text-4xl text-[#0B996F]">One App, Unlimited Possibilities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#e8f9f1] dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center shadow-md hover:shadow-2xl transition-shadow duration-300"
            >
              <img src={service.Image} alt="" className="w-32" />
              <h3 className="text-2xl font-bold text-[#0A4624] dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 py-16 px-4">
        <div className="flex justify-between items-end w-[100%] pb-10 gap-5 max-lg:flex-col">
          <p className="w-[55%] max-lg:w-[100%] text-5xl font-bold max-lg:text-4xl text-[#0B996F]">
            Beyond Rides — The Ultimates Experience awaits
          </p>
          <p className="w-[42%] max-lg:w-[100%] text-lg text-gray-700 dark:text-gray-300">
            Get ready for the ultimate taxi experience — reliable rides, friendly drivers, and seamless journeys, all at your fingertips
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          {groups.map((group, idx) => (
            <div
              key={idx}
              className={`grid gap-6 ${
                group.length === 3
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-center'
              } mb-10`}
            >
              {group.map((option, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 py-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 hover:bg-[#0B996F] hover:text-white hover:shadow-lg group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#e8f9f1] dark:bg-gray-700 text-[#0B996F] group-hover:bg-white group-hover:text-[#0ea36e] transition-all duration-300 text-2xl">
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                  <p className="text-base">{option.description}</p>
                </div>
              ))}
            </div>
          ))}
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
              Book your ride quickly and effortlessly with just a few taps on our app
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#">
                <img src={googlePlay} alt="Google Play" className="h-12 rounded-lg" />
              </a>
              <a href="#">
                <img src={appStore} alt="App Store" className="h-12 rounded-lg" />
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
      <div className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#0B996F] mb-4 leading-tight">
              Bringing Countless <br /> Smiles with Every Ride
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              At AAAO Go, we turn every ride into a reason to smile —
              with punctual drivers, premium service, and comfort that
              feels like home.
            </p>
            <div className="flex gap-12 mb-10">
              <div>
                <p className="text-3xl font-bold text-green-600">97%</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Satisfaction Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">50+</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">years of combined experience</p>
              </div>
            </div>
            <img src={locationPath} alt="Path" className="h-48" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-green-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <Slider {...sliderSettings}>
                {testimonials.map((t, index) => (
                  <div key={index} className="px-2">
                    <div className="text-center">
                      <div className="text-green-600 text-lg mb-2">★★★★★</div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{t.review}</p>
                      <p className="font-semibold text-green-800 dark:text-green-300">— {t.name}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <img src={manTablet} alt="Man with tablet" className="w-full h-full object-cover rounded-2xl" />
            <img src={womanCar} alt="Woman in car" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
export { bg2, googlePlay, CountUp, appStore, womanImage, phoneApp, future, FaCheckCircle, flagdirection, FaShieldAlt };