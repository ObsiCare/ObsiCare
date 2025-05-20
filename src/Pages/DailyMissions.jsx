import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { motion } from 'framer-motion';

const DailyMissions = () => {
  const [checked, setChecked] = useState([true, true, true]);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)'
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
    alert('Missions saved!');
    navigate('/home2');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full flex flex-col items-center"
      style={backgroundStyle}
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

        {/* Main Content */}
        <div className="flex-grow flex justify-center px-4 py-10">
          <div className="w-full max-w-4xl flex flex-col">
            {/* User Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#16A085] bg-gray-200">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-300"></div>
                )}
              </div>
              <h1 className="font-medium text-black" style={{ fontSize: '25px' }}>
                Selamat Siang, User
              </h1>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-black mb-8 text-center">
              Misi Harian
            </h2>

            {/* Daily Missions Card with Checkboxes */}
            <div className="bg-[#E0F5F1] rounded-md p-4 text-center border border-[#16A085] mb-8 w-full">
              <div className="space-y-4">
                {["Minum Air Mineral", "Langkah 1500", "Tidur 7 jam"].map((task, i) => (
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
                  className="text-white py-3 px-12 rounded-md hover:opacity-90 mb-10 mx-auto"
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
  );
};

export default DailyMissions;
