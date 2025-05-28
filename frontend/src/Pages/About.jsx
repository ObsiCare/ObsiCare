import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import logo from '../assets/logo2.png';
import groupImage from '../assets/orang.png';
import iconEasy from '../assets/jari.png';
import iconIMT from '../assets/kalkulator.png';
import iconCalorie from '../assets/kcal.png';
import iconRecommend from '../assets/alat.png';
import laptop from '../assets/laptop.png';

const About = () => {
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
          <ul className="flex flex-wrap gap-20 items-center font-bold text-base md:text-xl tracking-widest">
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
      {/* ✅ About Section */}
      <section
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%)',
        }}
        className="py-25 px-6 md:px-10 font-poppins text-[#0F836C]"
      >
        <div className="max-w-auto mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Kiri - Teks dan fitur */}
          <div>
            <h2 className="text-3xl font-bold text-teal-900 mb-6 font-poppins text-[#0F836C]">Tentang Obsicare</h2>
            <p className="text-gray-700 mb-6 leading-relaxed font-poppins text-[#0F836C]">
              Aplikasi berbasis web yang dirancang untuk membantu pengguna dalam menjaga pola makan dan mengurangi risiko obesitas di Indonesia.
              Dilengkapi sistem knowledge-based recommendation, pengguna akan mendapatkan rekomendasi makanan yang sesuai dengan kebutuhan kalori.
              <br />Bersama ObsiCare ciptakan pola makan yang lebih sehat dan terkontrol.
            </p>

            {/* Fitur-fitur */}
            <div className="space-y-4 font-poppins text-[#0F836C]">
              {[
                { icon: iconEasy, title: "Mudah Digunakan", desc: "Tampilan sederhana dan ramah pengguna, dapat digunakan semua kalangan." },
                { icon: iconIMT, title: "Cek IMT", desc: "Hitung indeks massa tubuh untuk mengetahui kategori berat badan secara berkala." },
                { icon: iconCalorie, title: "Hitung Kalori", desc: "Ketahui kebutuhan kalori harian menggunakan perhitungan akurat." },
                { icon: iconRecommend, title: "Rekomendasi Makanan", desc: "Dapatkan rekomendasi makanan sesuai dengan kebutuhan kalori harian tanpa khawatir." },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-[#16A085] p-2 rounded-full">
                    <img src={item.icon} alt={item.title} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-800">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kanan - Gambar */}
          <div className="relative flex justify-center items-center">
            <img
              src={laptop}
              alt="Laptop"
              className="absolute bottom-[-79px] left-[65px] w-[56%] md:w-[56%] lg:w-[56%] z-20"
            />
            <img
              src={groupImage}
              alt="Obsicare Illustration"
              className="w-[70%] h-auto rounded-xl shadow-lg z-10"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
