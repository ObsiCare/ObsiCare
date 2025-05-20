import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { motion } from 'framer-motion';

const Bmi = () => {
  const [avatar, setAvatar] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const navigate = useNavigate();

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
  };

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    setAvatar(storedAvatar);
  }, []);

  const handleSave = () => {
    if (!height || !weight) {
      alert('Tinggi dan berat badan harus diisi!');
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    const roundedBmi = calculatedBmi.toFixed(1);
    setBmi(roundedBmi);

    let category = '';
    if (calculatedBmi < 18.5) category = 'Kurus';
    else if (calculatedBmi < 24.9) category = 'Normal';
    else if (calculatedBmi < 29.9) category = 'Gemuk';
    else category = 'Obesitas';

    setBmiCategory(category);
  };

  const handleStore = () => {
    alert(`Data BMI ${bmi} (${bmiCategory}) telah disimpan!`);
    navigate('/home2'); // Arahkan ke halaman hom2 setelah simpan
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

            {/* Hitung BMI */}
            <div className="bg-[#E0F5F1] rounded-md p-6 text-center border border-[#16A085] mb-8 w-full">
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                {/* Tinggi Badan */}
                <div className="w-full md:w-1/3 bg-white border rounded-lg p-3" style={{ borderColor: '#16A085' }}>
                  <label className="text-sm font-medium text-black block mb-2 text-center">Tinggi Badan</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-full p-2 text-center text-sm rounded-md border text-black"
                      style={{ borderColor: '#16A085' }}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <span className="ml-2 text-black">cm</span>
                  </div>
                </div>

                {/* Berat Badan */}
                <div className="w-full md:w-1/3 bg-white border rounded-lg p-3" style={{ borderColor: '#16A085' }}>
                  <label className="text-sm font-medium text-black block mb-2 text-center">Berat Badan</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-full p-2 text-center text-sm rounded-md border text-black"
                      style={{ borderColor: '#16A085' }}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    <span className="ml-2 text-black">kg</span>
                  </div>
                </div>
              </div>

              {/* Button Hitung */}
              <button
                className="mt-6 text-white py-2 px-10 rounded-md hover:opacity-90"
                style={{ backgroundColor: '#16A085' }}
                onClick={handleSave}
              >
                Hitung IMT
              </button>

              {/* Hasil BMI */}
              {bmi && (
                <div className="mt-6 bg-white p-4 rounded-md shadow-md border" style={{ borderColor: '#16A085' }}>
                  <p className="text-lg font-semibold text-black">
                    IMT Anda: <span className="text-[#16A085]">{bmi}</span>
                  </p>
                  <p className="text-base text-black">Kategori: {bmiCategory}</p>
                  <button
                    className="mt-4 bg-[#16A085] text-white px-6 py-2 rounded-md hover:opacity-90"
                    style={{ backgroundColor: '#16A085' }}
                    onClick={handleStore}
                  >
                    Simpan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Bmi;
