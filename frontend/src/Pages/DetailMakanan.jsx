import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import logo from '../assets/logo2.png';
import logo2 from '../assets/logo5.png';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

const InformasiMakanan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [makanan, setMakanan] = useState(null);
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    setAvatar(storedAvatar);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/users/username&email', {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [token]);

  useEffect(() => {
    const fetchMakanan = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/makanan/makanan/makanan/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMakanan(res.data);
      } catch (error) {
        console.error("Gagal mengambil detail makanan:", error);
      }
    };
    fetchMakanan();
  }, [id, token]);

  const handleCatat = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/rekomendasi/rekomendasi/catat",
        { makanan_id: makanan.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/search"), 1500);
    } catch (error) {
      console.error("Gagal mencatat:", error);
      setMessage("Gagal mencatat makanan.");
    }
  };

  const handleLogout = () => {
    const savedAvatar = localStorage.getItem("selectedAvatar");
    localStorage.clear();
    if (savedAvatar) {
      localStorage.setItem("selectedAvatar", savedAvatar);
    }
    navigate('/');
  };

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
  };

  if (!makanan) {
    return <div className="p-6">Memuat data makanan...</div>;
  }

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
          <div className="max-w-8xl mx-auto flex flex-wrap justify-between items-center px-2 md:px-6">
            <Link to='/'>
              <img src={logo} alt="Logo ObsiCare" className="h-25 w-auto" />
            </Link>
            <ul className="flex flex-wrap gap-20 items-center font-bold text-base md:text-xl tracking-widest">
              <li>
                <NavLink
                  to="/home2"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white underline underline-offset-4"
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
                      ? "text-white underline underline-offset-4"
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
                  Profil <FaChevronDown className="ml-2" />
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
                        <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full border border-[#16A085]" />
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
      <div className="flex-grow flex flex-col items-center gap-4 px-6 pt-8">
        {/* Gambar kiri */}
        <div className="flex w-full max-w-7xl">
        <img
          src={logo2}
          alt="logo2"
          className="w-130 object-contain"
        />
        </div>

        {/* Detail Makanan */}
        <div className="bg-[#E0F5F1] p-13 rounded-xl shadow-md max-w-lg w-full">
          <h1 className="text-2xl font-bold text-black mb-10 text-center">{makanan.nama}</h1>
          <div className="grid grid-cols-1 gap-2 text-center" style={{ fontSize: '20px' }}>
            <p><strong>Kalori:</strong> {makanan.kalori} kkal</p>
            <p><strong>Protein:</strong> {makanan.protein ?? '--'} g</p>
            <p><strong>Kategori:</strong> {makanan.kategori ?? '--'}</p>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleCatat}
              className="bg-[#16A085] text-white rounded-md hover:opacity-90"
              style={{ backgroundColor: '#16A085' }}
            >
              Catat Makanan Ini
            </button>
            {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default InformasiMakanan;
