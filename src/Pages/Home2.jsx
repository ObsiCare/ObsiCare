import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";
import logo from '../assets/logo2.png';
import { motion, AnimatePresence } from 'framer-motion';

const Home2 = () => {
  const [userKalori, setKebutuhanKalori] = useState('');
  const [userBMI, setBMI] = useState('');
  const [userKlasifikasi, setKlasifikasi] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)'
  };

  const getGreetingByTime = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Selamat Pagi';
    if (hour >= 12 && hour < 15) return 'Selamat Siang';
    if (hour >= 15 && hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    setAvatar(storedAvatar);
  }, []);

  const handleClick = (label) => {
    if (label === "Misi Harian") {
      navigate("/dailymissions"); // ✅ Navigasi ke halaman DailyMissions
    }

    if (label === "Perbarui BMI") {
      navigate("/bmi");
    }

    if (label === "Rekomendasi Menu") {
      navigate("/menu");
    }

  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8000/users/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data user');
        }

        const data = await response.json();
        setKebutuhanKalori(data.kalori);
        setBMI(data.bmi);
        setUserName(data.nama);
        setUserEmail(data.email);
        setKlasifikasi(data.klasifikasi)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    const savedAvatar = localStorage.getItem("selectedAvatar");
    localStorage.clear();
    if (savedAvatar) {
      localStorage.setItem("selectedAvatar", savedAvatar);
    }
    navigate('/');
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
                  <span>Beranda</span>
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
                  <span>Tentang</span>
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
                        <img src={avatar} alt="avatar" className="w-15 h-15 rounded-full border border-[#16A085]" />
                        <div>
                          <h4 className="font-bold text-base">{userName}</h4>
                          <p className="text-sm text-gray-600">{userEmail}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-[#16A085] text-white py-2 rounded-md hover:bg-[#138d77]"
                        style={{ backgroundColor: '#16A085' }}
                      >
                        Keluar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>
        </nav>

        {/* ✅ Konten */}
        <div className="w-full max-w-4xl mt-10 mx-auto bg-[#E0F5F1] rounded-xl p-8 shadow-md border border-[#16A085]">
          {/* Header Selamat Datang */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 mr-3 border border-[#16A085]">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : null}
            </div>
            <h1 className="text-xs sm:text-sm md:text-base font-medium text-black" style={{ fontSize: "30px" }}>{getGreetingByTime()}, {userName || 'User'} !</h1>
          </div>

          {/* Kalori dan BMI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-md p-4 text-center border border-[#16A085]">
              <h2 className="text-lg font-semibold text-black mb-1">Kalori</h2>
              <h1 className="text-[#16A085] font-medium">{userKalori || 'User'}</h1>
              <h2 className="text-lg font-medium text-black mb-1">Kkal</h2>
            </div>
            <div className="bg-white rounded-md p-4 text-center border border-[#16A085]">
              <h2 className="text-lg font-semibold text-black mb-1">BMI</h2>
              <h1 className="text-[#16A085] font-medium">{userBMI || 'User'}</h1>
              <h2 className="text-lg font-medium text-black mb-1">{userKlasifikasi}</h2>
            </div>
          </div>

          <hr className="border-gray-300 mb-4" />

          {/* Tombol Aksi */}
          <div className="space-y-3">
            {["Misi Harian", "Perbarui BMI", "Rekomendasi Menu"].map((label, index) => (
              <button
                key={index}
                className="w-full bg-white text-white font-medium py-2 px-4 rounded-md hover:bg-[#c7eee6] transition border border-[#16A085] text-sm md:text-base flex justify-between items-center"
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