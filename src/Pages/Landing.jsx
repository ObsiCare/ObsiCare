import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo2.png';
import HeroImage from '../assets/Logo4.png';

const Landing = () => {
  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full flex flex-col"
      style={backgroundStyle}
    >
      {/* ✅ Navbar */}
      <nav className="w-full bg-[#16A085] text-white py-1 px-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} alt="Logo ObsiCare" className="h-25 w-auto" />
          <ul className="flex gap-4 text-lg font-medium"></ul>

          {/* Navigation Links */}
          <ul className="flex gap-25 items-center font-bold text-xl tracking-widest text-white">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white underline underline-offset-4 !text-white"
                    : "text-white hover:text-[#FFFDD0]"
                }
              >
                Beranda
              </NavLink>

            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-white underline underline-offset-4 !text-white"
                    : "text-white hover:text-[#FFFDD0]"
                }
              >
                Tentang
              </NavLink>

            </li>
            <li>
              <Link
                to="/signup"
                className="bg-teal-200 px-6 py-2 rounded-full !text-[#0F836C] font-poppins hover:bg-teal-300 hover:text-[#FFFDD0]"
              >
                Daftar
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="bg-teal-200 px-6 py-2 rounded-full !text-[#0F836C] font-poppins hover:bg-teal-300 hover:text-[#FFFDD0]"
              >
                Masuk
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center w-full px-6 md:px-20 mt-10 md:mt-16 gap-16">
        {/* Left Content - Text */}
        <div className="w-full md:w-1/2 text-left space-y-10 md:pl-16">
          <motion.h1
            className="text-[64px] sm:text-[80px] md:text-[96px] lg:text-[120px] font-bold leading-[1.1] tracking-tight text-[#FFFFFF] break-words z-10"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '100px' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            small step<br />
            <span className="text-[#16A085]">for</span><br />
            better life
          </motion.h1>

          <motion.p
            className="text-black text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed z-10"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            solusi cerdas untuk monitoring pola makan berdasarkan
            kalori dilengkapi dengan berbagai rekomendasi makanan,
            hitung kalori dapatkan badan ideal versimu.
          </motion.p>
        </div>

        {/* Right Content - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.img
            src={HeroImage}
            alt="Hero"
            className="w-full max-w-lg object-contain drop-shadow-lg"
            animate={{
              y: [0, -20, 0], // Naik 20px lalu turun
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>
      </section>
    </motion.div>
  );
};

export default Landing;