import { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';
import avatar5 from '../assets/avatar5.png';
import logo from '../assets/logo2.png';

const Home = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatar1);
  const [showActivityOptions, setShowActivityOptions] = useState(false);
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const avatarRef = useRef(null);

  const activityOptions = [
    'Sedentari (Tidak olahraga sama sekali)',
    'Ringan (1-3x seminggu)',
    'Sedang (3-5x seminggu)',
    'Aktif (5-6x seminggu)',
  ];

  const activityMap = {
    'Sedentari (Tidak olahraga sama sekali)': 'sedentari',
    'Ringan (1-3x seminggu)': 'ringan',
    'Sedang (3-5x seminggu)': 'sedang',
    'Aktif (5-6x seminggu)': 'berat'
  };

  const avatarOptions = [avatar1, avatar2, avatar3, avatar4, avatar5];
  const userAvatar = localStorage.getItem("selectedAvatar");

  const handleActivitySelect = (option) => {
    setActivityLevel(option);
    setShowActivityOptions(false);
  };

  const handleSave = async () => {
    if (!height || !weight || !age || !gender || !activityLevel) {
    alert('Harap lengkapi semua data terlebih dahulu!');
    return;
  }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda belum login!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          berat_badan: parseFloat(weight),
          tinggi_badan: parseFloat(height),
          usia: parseInt(age),
          jenis_kelamin: gender.toLowerCase(),
          aktivitas_fisik: activityMap[activityLevel]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Gagal menyimpan data');
      }

      const data = await response.json();
      console.log('Response:', data, selectedAvatar);
      alert('Data berhasil disimpan!');
      navigate('/home2');
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Gagal menyimpan data: ${error.message}`);
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

  // Fetch nama user saat komponen dimuat
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

  // Tutup dropdown avatar saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowAvatarOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
  };

  return (
    <div style={backgroundStyle} className="min-h-screen w-full">
      {/* ✅ Navbar */}
      <nav className="w-full bg-[#16A085] text-white py-1 px-4 shadow-md">
        <div className="max-w-8xl mx-auto flex flex-wrap justify-between items-center px-2 md:px-6">
          <Link to='/'>
            <img src={logo} alt="Logo ObsiCare" className="h-25 w-auto" />
          </Link>  
          <ul className="flex flex-wrap gap-20 md:gap-20 items-center font-bold text-base md:text-xl tracking-widest">
            <li>
              <NavLink
                to="/home2"
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
                      <img src={userAvatar} alt="avatar" className="w-15 h-15 rounded-full border border-[#16A085]" />
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-1 pb-10 flex flex-col items-center"
      >
        {/* Avatar dan Edit */}
        <div className="relative flex flex-col items-center mt-10 mb-2" ref={avatarRef}>
          <div className="relative w-40 h-40 rounded-full border-4 border-[#16A085] shadow-lg">
            {selectedAvatar ? (
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 flex items-center justify-center w-full h-full">Pilih Avatar</span>
            )}
            <FiEdit
              className="absolute bottom-2 right-2 text-[#16A085] bg-white rounded-full p-1 border border-[#16A085] cursor-pointer"
              size={28}
              onClick={() => setShowAvatarOptions(!showAvatarOptions)}
            />
          </div>

          {showAvatarOptions && (
            <div className="absolute top-full mt-3 z-20 bg-white border border-[#16A085] rounded-lg shadow-md p-4 w-80">
              <h2 className="text-center text-[#16A085] font-semibold mb-2">Pilih Avatar</h2>
              <div className="grid grid-cols-3 gap-3">
                {avatarOptions.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className={`w-16 h-16 rounded-full object-cover cursor-pointer border-4 ${selectedAvatar === avatar ? 'border-[#16A085]' : 'border-transparent'}`}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatarOptions(false);
                      localStorage.setItem('selectedAvatar', avatar);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Teks Sambutan */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-black">Selamat Datang, {userName || 'User'}!</h2>
          <p className="text-black text-xl">Masukkan informasi untuk membantu monitoring pola makan Anda.</p>
        </div>

        {/* Form Input */}
        <div className="rounded-xl p-8 w-full max-w-6xl mb-6" style={{ backgroundColor: '#E0F5F1' }}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Tinggi Badan */}
            <div className="rounded-lg p-4 flex flex-col items-center bg-white border" style={{ borderColor: '#16A085' }}>
              <label className="text-lg font-medium mb-4 text-black">Tinggi Badan</label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="w-full p-2 text-center text-lg rounded-md border text-black"
                  style={{ borderColor: '#16A085' }}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <span className="ml-2 text-black">cm</span>
              </div>
            </div>

            {/* Berat Badan */}
            <div className="rounded-lg p-4 flex flex-col items-center bg-white border" style={{ borderColor: '#16A085' }}>
              <label className="text-lg font-medium mb-4 text-black">Berat Badan</label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="w-full p-2 text-center text-lg rounded-md border text-black"
                  style={{ borderColor: '#16A085' }}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <span className="ml-2 text-black">kg</span>
              </div>
            </div>

            {/* Usia */}
            <div className="rounded-lg p-4 flex flex-col items-center bg-white border" style={{ borderColor: '#16A085' }}>
              <label className="text-lg font-medium mb-4 text-black">Usia</label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="w-full p-2 text-center text-lg rounded-md border text-black"
                  style={{ borderColor: '#16A085' }}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <span className="ml-2 text-black">th</span>
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div className="rounded-lg p-4 flex flex-col items-center bg-white border relative" style={{ borderColor: '#16A085' }}>
              <label className="text-lg font-medium mb-4 text-black">Jenis Kelamin</label>
              <div
                className="w-full p-2 rounded border cursor-pointer text-black flex justify-between items-center"
                style={{ borderColor: '#16A085' }}
                onClick={() => setShowGenderOptions(!showGenderOptions)}
              >
                <span>{gender || "Pilih jenis kelamin"}</span>
                {showGenderOptions ? (
                  <FaChevronUp className="text-[#16A085]" />
                ) : (
                  <FaChevronDown className="text-[#16A085]" />
                )}
              </div>

              {showGenderOptions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md z-10" style={{ borderColor: '#16A085' }}>
                  {["Laki-laki", "Perempuan"].map((option, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-[#E0F5F1] cursor-pointer border-b last:border-b-0 text-black"
                      style={{ borderColor: '#16A085' }}
                      onClick={() => {
                        setGender(option);
                        setShowGenderOptions(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Aktivitas */}
            <div className="rounded-lg p-4 flex flex-col items-center bg-white border relative" style={{ borderColor: '#16A085' }}>
              <label className="text-lg font-medium mb-4 text-black">Tingkat Aktivitas</label>
              <div
                className="w-full p-2 rounded border cursor-pointer text-black flex justify-between items-center"
                style={{ borderColor: '#16A085' }}
                onClick={() => setShowActivityOptions(!showActivityOptions)}
              >
                <span>{activityLevel || "Pilih aktivitas"}</span>
                {showActivityOptions ? (
                  <FaChevronUp className="text-[#16A085]" />
                ) : (
                  <FaChevronDown className="text-[#16A085]" />
                )}
              </div>

              {showActivityOptions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md z-10" style={{ borderColor: '#16A085' }}>
                  {activityOptions.map((option, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-[#E0F5F1] cursor-pointer border-b last:border-b-0 text-black"
                      style={{ borderColor: '#16A085' }}
                      onClick={() => handleActivitySelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Simpan */}
        <button
          className="text-white py-3 px-12 rounded-md hover:opacity-90 mb-10"
          style={{ backgroundColor: '#16A085' }}
          onClick={handleSave}
        >
          Simpan
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
