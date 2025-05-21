import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Home2 = () => {
  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)'
  };
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const userName = localStorage.getItem("userName") || "User"
  const userEmail = localStorage.getItem("userEmail") || "User@gmail.com"
  const userAvatar = localStorage.getItem("selectedAvatar");

  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate(); // ✅ Hook untuk navigasi

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    setAvatar(storedAvatar);
  }, []);

  const handleClick = (label) => {
    if (label === "Misi Harian") {
      navigate("/dailymissions"); // ✅ Navigasi ke halaman DailyMissions
    }

    if (label === "Perbarui IMT") {
      navigate("/bmi");
    }

    if (label === "Rekomendasi Menu") {
      navigate("/menu");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 w-full h-full flex items-center justify-center"
      style={backgroundStyle}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="fixed inset-0 w-full h-full flex flex-col" style={backgroundStyle}>
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
              <li className="relative">
                <div
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center cursor-pointer hover:text-[#FFFDD0]"
                >
                  <span>Profil</span>
                  <FaChevronDown className="ml-2" />
                </div>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-80 z-50 p-4">
                    <div className="flex items-center gap-3 border-b pb-3 mb-3">
                      <img src={userAvatar} alt="avatar" className="w-15 h-15 rounded-full border border-[#16A085]" />
                      <div>
                        <h4 className="font-bold text-base">{userName}</h4>
                        <p className="text-sm text-gray-600">{userEmail}</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleLogout}
                        className="px-6 py-2 text-white text-sm rounded-md hover:bg-[#138d77] w-auto"
                        style={{ backgroundColor: '#16A085' }}
                      >
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>

        {/* Konten */}
        <div className="w-full max-w-4xl mt-10 mx-auto bg-[#E0F5F1] rounded-xl p-8 shadow-md border border-[#16A085]">
          <div className="flex items-center mb-8">
            <div className="w-17 h-17 rounded-full overflow-hidden bg-gray-300 mr-3 border border-[#16A085]">
              {avatar && (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              )}
            </div>
            <h1 className="font-medium text-black" style={{ fontSize: '25px' }}>
              Selamat Siang, User
            </h1>
          </div>

          {/* Kalori dan BMI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-md p-4 text-center border border-[#16A085]">
              <h2 className="text-lg font-semibold text-black mb-1">Kalori</h2>
              <p className="text-[#16A085] font-medium">kkal</p>
            </div>
            <div className="bg-white rounded-md p-4 text-center border border-[#16A085]">
              <h2 className="text-lg font-semibold text-black mb-1">IMT</h2>
              <p className="text-[#16A085] font-medium">--</p>
            </div>
          </div>

          <hr className="border-gray-300 mb-4" />

          {/* Tombol Aksi */}
          <div className="space-y-3">
            {["Misi Harian", "Perbarui IMT", "Rekomendasi Menu"].map((label, index) => (
              <button
                key={index}
                className="w-full bg-white text-[#16A085] font-medium py-2 px-4 rounded-md hover:bg-[#c7eee6] transition border border-[#16A085] text-sm md:text-base flex justify-between items-center"
                onClick={() => handleClick(label)} // ✅ Tambahkan handler
              >
                <span>{label}</span>
                <span className="text-lg">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home2;
