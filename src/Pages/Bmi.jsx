import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import updateBmiLogo from '../assets/update bmi.png'; // Import logo baru
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from "react-icons/fa";
import axios from 'axios';

const Bmi = () => {
  const [avatar, setAvatar] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [kalori, setKalori] = useState(null);
  const [klasifikasi, setBmiCategory] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
  };

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    setAvatar(storedAvatar);
  }, []);

  const handleStore = async () => {
    if (!height || !weight) {
      alert('Tinggi dan berat badan harus diisi!');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        'http://localhost:8000/users/users/update-kalori',
        {
          berat_badan: parseFloat(weight),
          tinggi_badan: parseFloat(height),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      const { bmr, bmi, kalori, klasifikasi } = response.data;

      setBmi(bmi);
      setBmr(bmr);
      setKalori(kalori);
      setBmiCategory(klasifikasi);
    } catch (error) {
      console.error('Gagal menyimpan data BMI:', error);
      alert('Terjadi kesalahan saat menyimpan data BMI!');
    }
  };

  const handleLogout = () => {
    const savedAvatar = localStorage.getItem("selectedAvatar");
    localStorage.clear();
    if (savedAvatar) {
      localStorage.setItem("selectedAvatar", savedAvatar);
    }
    navigate('/');
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8000/users/users/username&email', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data user');
        }

        const data = await response.json();
        setUserName(data.nama);
        setUserEmail(data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

        {/* Main Content */}
        <div className="flex-grow flex justify-center items-start px-4 pt-6">
          <div className="w-full max-w-4xl flex flex-col">
            {/* Tulisan + Logo */}
            <div className="mb-8 flex items-center gap-4">
              <img src={updateBmiLogo} alt="Update BMI" className="w-12 h-12 object-contain" />
              <h1 className="text-xs sm:text-sm md:text-base font-medium text-black" style={{ fontSize: "30px" }}>
                Perbarui Data, Raih Tubuh Idealmu!
              </h1>
            </div>

            {/* Input Section */}
            <div className="bg-[#E0F5F1] rounded-md p-6 text-center mb-8 w-full">
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <div className="w-full md:w-1/3 bg-white rounded-lg p-3 shadow-md">
                  <label className="text-sm font-medium text-black block mb-2 text-center" style={{ fontSize: "20px" }}>Tinggi Badan</label>
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="number"
                      className="w-2/3 p-3 text-center text-sm rounded-md border border-[#16A085] text-black"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <span className="text-black">cm</span>
                  </div>
                </div>

                <div className="w-full md:w-1/3 bg-white rounded-lg p-3 shadow-md">
                  <label className="text-sm font-medium text-black block mb-2 text-center" style={{ fontSize: "20px" }}>Berat Badan</label>
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="number"
                      className="w-2/3 p-3 text-center text-sm rounded-md border border-[#16A085] text-black"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    <span className="text-black">kg</span>
                  </div>
                </div>
              </div>

              <button
                className="mt-6 bg-[#16A085] text-white py-2 px-10 rounded-md hover:opacity-90"
                onClick={handleStore}
              >
                Hitung IMT
              </button>

              <div className='mt-6 flex justify-center'>
                <div className="md:w-1/3 bg-white p-5 rounded-md shadow-md text-center">
                  <h2 className="text-lg font-bold text-black">IMT Anda: <span className="font-semibold text-[#16A085]">{bmi}</span></h2>
                  <p className="text-base text-black">Kategori: {klasifikasi}</p>
                  <h2 className="text-lg font-bold text-black">Kebutuhan Kalori Harian: <span className="font-semibold text-[#16A085]">{kalori} Kkal</span></h2>
                </div>
              </div>

              <button
                onClick={() => navigate('/home2')}
                className="mt-6 bg-[#16A085] text-white px-6 py-2 rounded-md hover:opacity-90"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Bmi;
