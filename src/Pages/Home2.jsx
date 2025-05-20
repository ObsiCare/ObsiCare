import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom'; // ✅ Tambahkan ini
import logo from '../assets/logo2.png';
import { motion } from 'framer-motion';

const Home2 = () => {
  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)'
  };

  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate(); // ✅ Hook untuk navigasi

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
    // kamu bisa tambahkan else if untuk label lainnya jika perlu
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
              <h2 className="text-lg font-semibold text-black mb-1">BMI</h2>
              <p className="text-[#16A085] font-medium">--</p>
            </div>
          </div>

          <hr className="border-gray-300 mb-4" />

          {/* Tombol Aksi */}
          <div className="space-y-3">
            {["Misi Harian", "Perbarui BMI", "Rekomendasi Menu"].map((label, index) => (
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
