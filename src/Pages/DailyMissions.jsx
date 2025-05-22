import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import misi from '../assets/misi.png';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from "react-icons/fa";

const DailyMissions = () => {
  const [checked, setChecked] = useState([false, false, false, false]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEncouragementModal, setShowEncouragementModal] = useState(false);
  const navigate = useNavigate();

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)'
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8000/users/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Gagal mengambil data user');

        const data = await response.json();
        setUserName(data.nama);
        setUserEmail(data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    if (storedAvatar) setAvatar(storedAvatar);

    const storedMissions = localStorage.getItem('dailyMissionsStatus');
    if (storedMissions) {
      try {
        const parsed = JSON.parse(storedMissions);
        if (Array.isArray(parsed) && parsed.length === 4) {
          setChecked(parsed);
        }
      } catch (e) {
        console.error('Failed to parse stored missions:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    const savedAvatar = localStorage.getItem("selectedAvatar");
    localStorage.clear();
    if (savedAvatar) localStorage.setItem("selectedAvatar", savedAvatar);
    navigate('/');
  };

  const handleCheckboxChange = (index) => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      localStorage.setItem('dailyMissionsStatus', JSON.stringify(newChecked));
      return newChecked;
    });
  };

  const handleSave = () => {
    const storedMissions = JSON.parse(localStorage.getItem('dailyMissionsStatus'));
    console.log('Stored Missions from localStorage:', storedMissions);

    if (storedMissions && storedMissions.every(item => item === true)) {
      setShowModal(true);
    } else {
      setShowEncouragementModal(true);
    }
  };

  const handleConfirmSave = () => {
    setShowModal(false);
    navigate('/home2');
  };

  const handleEncouragementClose = () => {
    setShowEncouragementModal(false);
    navigate('/home2');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className={`min-h-screen w-full flex flex-col items-center justify-center overflow-auto pb-6 transition-all duration-300 ${showModal || showEncouragementModal ? 'blur-sm pointer-events-none select-none' : ''}`}
      >
        <div className="fixed inset-0 w-full h-full flex flex-col" style={backgroundStyle}>
          {/* Navbar */}
          <nav className="w-full bg-[#16A085] text-white py-1 px-4 shadow-md">
            <div className="max-w-8xl mx-auto flex flex-wrap justify-between items-center px-2 md:px-6">
              <Link to='/'><img src={logo} alt="Logo ObsiCare" className="h-25 w-auto" /></Link>  
              <ul className="flex flex-wrap gap-20 items-center font-bold text-xl tracking-widest text-white">
                <li>
                  <NavLink to="/home2" className={({ isActive }) => isActive ? "text-white underline underline-offset-4" : "hover:text-[#FFFDD0]"}>
                    Beranda
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => isActive ? "text-white underline underline-offset-4" : "hover:text-[#FFFDD0]"}>
                    Tentang
                  </NavLink>
                </li>
                <li className="relative">
                  <div onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="flex items-center cursor-pointer hover:text-[#FFFDD0]">
                    <span>Profil</span>
                    <FaChevronDown className="ml-2" />
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-grow flex justify-center px-4 pt-2 pb-20">
            <div className="w-full max-w-4xl flex flex-col">
              <div className="flex items-center gap-6 mb-6 mt-7">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#16A085] bg-gray-200">
                  <img src={misi} alt="Misi" className="w-full h-full object-cover" />
                </div>
                <h1 className="font-medium text-black" style={{ fontSize: '30px' }}>
                  Misi Hari Ini Menantimu, {userName}!
                </h1>
              </div>

              <h2 className="text-4xl font-bold text-black mb-8 text-center">Misi Harian</h2>

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

      {/* Modal: Misi selesai */}
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

      {/* Modal: Belum selesai */}
      {showEncouragementModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#16A085]">Semangat!</h3>
            <p className="text-gray-700 mb-6">Kamu belum menyelesaikan semua misi hari ini. Terus semangat!</p>
            <button
              onClick={handleEncouragementClose}
              className="bg-[#16A085] text-white px-6 py-2 rounded hover:bg-[#138d77]"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyMissions;
