import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import logo from '../assets/logo2.png';
import HeroImage from '../assets/logo4.png';

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%)',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const avatar = localStorage.getItem('selectedAvatar');
    if (token) {
      setIsLoggedIn(true);
      setAvatar(avatar);
      fetch('http://localhost:8000/users/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.nama);
          setUserEmail(data.email);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleLogout = () => {
    const savedAvatar = localStorage.getItem("selectedAvatar");
    localStorage.clear();
    if (savedAvatar) {
      localStorage.setItem("selectedAvatar", savedAvatar);
    }
    window.location.reload(); // refresh page to reflect logout
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
        <div className="max-w-8xl mx-auto flex flex-wrap items-center justify-between px-2 md:px-6">
          <Link to='/'>
            <img src={logo} alt="Logo ObsiCare" className="h-25 w-auto" />
          </Link>
          <ul className="flex flex-wrap gap-20 items-center font-bold text-base md:text-xl tracking-widest text-white">
            <li>
              <NavLink
                to="/home2"
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

            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="bg-teal-600 px-4 py-1.5 rounded-xl text-[#0F836C] hover:bg-teal-200 hover:text-[#FFFDD0]"
                  >
                    Daftar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signin"
                    className="bg-teal-600 px-4 py-1.5 rounded-xl text-[#0F836C] hover:bg-teal-200 hover:text-[#FFFDD0]"
                  >
                    Masuk
                  </Link>
                </li>
              </>
            ) : (
              <li className="relative">
                <div
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center cursor-pointer hover:text-[#FFFDD0]"
                >
                  <span>Profil</span>
                  <FaChevronDown className="ml-2" />
                </div>
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-80 z-50 p-4"
                    >
                      <div className="flex items-center gap-3 border-b pb-3 mb-3">
                        <img
                          src={avatar}
                          alt="avatar"
                          className="w-12 h-12 rounded-full border border-[#16A085]"
                        />
                        <div>
                          <h4 className="font-bold text-base">{userName}</h4>
                          <p className="text-sm text-gray-600">{userEmail}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-[#16A085] text-white py-2 rounded-md hover:bg-[#138d77]"
                      >
                        Keluar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )}
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