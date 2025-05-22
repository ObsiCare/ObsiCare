import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../assets/logo2.png';
import misi from '../assets/misi.png';
import { motion } from 'framer-motion';
import { FaChevronDown } from "react-icons/fa";

const DailyMissions = () => {
  const [checked, setChecked] = useState([true, true, true, true, true]);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "User@gmail.com";
  const userAvatar = localStorage.getItem("selectedAvatar");

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)'
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    setAvatar(storedAvatar);

    const storedMissions = localStorage.getItem('dailyMissionsStatus');
    if (storedMissions) {
      setChecked(JSON.parse(storedMissions));
    }
  }, []);

  const handleCheckboxChange = (index) => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      localStorage.setItem('dailyMissionsStatus', JSON.stringify(newChecked));
      return newChecked;
    });
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const handleConfirmSave = () => {
    setShowModal(false);
    navigate('/home2');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className={`min-h-screen w-full flex flex-col items-center overflow-auto pb-6 transition-all duration-300 ${showModal ? 'blur-sm pointer-events-none select-none' : ''}`}
        style={backgroundStyle}
      >
        <div className="fixed inset-0 w-full h-full flex flex-col" style={backgroundStyle}>
          {/* Navbar */}
          <nav className="w-full bg-[#16A085] text-white py-1 px-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <img src={logo} alt="Logo ObsiCare" className="h-25 w-auto" />
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
                        <img
                          src={userAvatar || misi}
                          alt="avatar"
                          className="w-15 h-15 rounded-full border border-[#16A085]"
                        />
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

          {/* Main Content */}
          <div className="flex-grow flex justify-center px-4 pt-2 pb-20">
            <div className="w-full max-w-4xl flex flex-col">
              {/* User Info */}
              <div className="flex items-center gap-6 mb-6 mt-7">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#16A085] bg-gray-200">
                  <img src={misi} alt="Misi" className="w-full h-full object-cover" />
                </div>
                <h1 className="font-medium text-black" style={{ fontSize: '30px' }}>
                  Misi Hari Ini Menantimu, {userName}!
                </h1>
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold text-black mb-8 text-center">
                Misi Harian
              </h2>

              {/* Daily Missions Card */}
              <div className="bg-[#E0F5F1] rounded-md p-4 text-center border border-[#16A085] mb-8 w-full">
                <div className="space-y-4">
                  {[
                    "Konsumsi sayur dan buah",
                    "Konsumsi air mineral 8 gelas / 2 liter",
                    "Berjalan 6000 langkah",
                    "Tidur yang cukup"
                  ].map((task, i) => (
                    <label key={i} className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 accent-[#16A085]"
                        checked={checked[i]}
                        onChange={() => handleCheckboxChange(i)}
                        aria-label={task}
                      />
                      <span className="text-black text-base">{task}</span>
                    </label>
                  ))}

                  {/* Save Button */}
                  <button
                    className="text-white py-3 px-12 rounded-md hover:opacity-90 mb-4 mx-auto"
                    style={{ backgroundColor: '#16A085' }}
                    onClick={handleSave}
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#16A085]">Misi Selesai!</h3>
            <p className="text-gray-700 mb-6">Selamat! Kamu telah menyelesaikan misi hari ini.</p>
            <button
              onClick={handleConfirmSave}
              className="bg-[#16A085] text-white px-6 py-2 rounded hover:bg-[#138d77]"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyMissions;
