import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from "react-icons/fa";
import logo from '../assets/logo2.png';
import image1 from '../assets/image1.png'; 

export default function SearchMakanan() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);

    if (q.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/makanan/makanan/search?q=${q}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(res.data);
    } catch (error) {
      console.error("Gagal mencari:", error);
    }
  };

  const handleClick = (id) => {
    navigate(`/search/${id}`);
    setQuery(""); // Reset query
    setResults([]); // Tutup dropdown setelah klik
  };

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
  };

  useEffect(() => {
    const fetchRekomendasi = async () => {
      try {
        const response = await axios.get("http://localhost:8000/rekomendasi/rekomendasi/rekomendasi", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // jika memakai token
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Gagal mengambil rekomendasi:", error);
      }
    };
    
    fetchRekomendasi();
  }, []);

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
          setUserName(data.nama);
          setUserEmail(data.email);
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

    useEffect(() => {
      const storedAvatar = localStorage.getItem('selectedAvatar');
      setAvatar(storedAvatar);
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

        {/* Gambar kiri */}
        <img
          src={image1}
          alt="image1"
          className="w-100 h-100 object-contain"
        />

        <main className="w-full px-6">
          <div className="max-w-200 mx-4 relative">
            <div className="flex items-center w-full px-4 py-3 rounded-full border border-gray-300 shadow bg-white focus-within:ring-2 focus-within:ring-[#16A085] transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 11-10.61-10.61 7.5 7.5 0 0110.61 10.61z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Cari makananmu"
                className="w-full bg-transparent focus:outline-none"
              />

              {query.trim() !== "" && (
                <ul className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
                  {results.length > 0 ? (
                    results.map((makanan) => (
                      <li
                        key={makanan.id}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        onClick={() => handleClick(makanan.id)}
                      >
                        <span>{makanan.nama}</span>
                        <span className="text-sm text-gray-500">{makanan.kalori} Kkal</span>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-center text-gray-500">
                      Makanan tidak ditemukan.
                      <br />
                      <button
                        onClick={() => navigate("/tambahdatamakanan")}
                        className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                      >
                        Tambah Makanan Baru
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </main>

        {/* Container sisa kalori di sebelah kanan logo kiri */}
        <div className="absolute top-62 right-[22%] z-10">
          <div className="bg-[#E0F5F1]  p-1 rounded-lg shadow border border-[#16A085] w-50 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Sisa Kalorimu</h3>
            <p className="text-1.5xl font-medium text-[#16A085]">{typeof data?.sisa_kalori === 'number' ? data.sisa_kalori.toFixed(2) : '--'} Kkal</p>
          </div>
        </div>

        {/* Container kalori yang sudah masuk di sebelah kanan logo kiri */}
        <div className="absolute top-62 right-[8%] z-10">
          <div className="bg-[#E0F5F1]  p-1 rounded-lg shadow border border-[#16A085] w-50 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Konsumsi Kalori</h3>
            <p className="text-1.5xl font-medium text-[#16A085]">{data?.total_kalori_masuk ?? '--'} Kkal</p> {/* Ganti dengan state jika dinamis */}
          </div>
        </div>

        <div className="w-full px-8 pt-5">
          <h2 className="text-2xl font-semibold mb-4 text-gray-1000">
            Rekomendasi Makanan Hari Ini
          </h2>
          <div className="max-h-[387px] overflow-y-auto pr-2">
            {data?.rekomendasi?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data.rekomendasi.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/search/${item.id}`)}
                    className="bg-white shadow-md rounded-xl p-4 border border-gray-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{item.nama}</h3>
                    <p className="text-sm text-gray-600">{item.kalori} Kkal</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md">
                {data ? data.message : "Memuat rekomendasi..."}
              </div>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
