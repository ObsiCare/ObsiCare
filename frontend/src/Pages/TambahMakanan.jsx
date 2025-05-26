import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";
import logo from '../assets/logo2.png';
import tambahLogo from '../assets/tambahmakanan.png';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";

const TambahMakanan = () => {
    const [nama, setNama] = useState("");
    const [kalori, setKalori] = useState("");
    const [protein, setProtein] = useState("");
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:8000/makanan/makanan/tambah",
                {
                    nama,
                    kalori: parseFloat(kalori),
                    protein: parseFloat(protein),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Makanan berhasil ditambahkan!");
            navigate("/search");
        } catch (error) {
            console.error("Gagal menambahkan makanan:", error);
            alert("Gagal menambahkan makanan.");
        }
    };

    const backgroundStyle = {
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
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
        setAvatar(storedAvatar);
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
            className="fixed inset-0 w-full h-full flex flex-col"
            style={backgroundStyle}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            {/* ✅ Navbar */}
            <nav className="w-full bg-[#16A085] text-white py-1 px-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <img src={logo} alt="Logo ObsiCare" className="h-25 w-auto" />
                    <ul className="flex gap-10 items-center font-bold text-lg tracking-widest">
                        <li>
                            <NavLink
                                to="/"
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
                                        className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-64 z-50 p-4"
                                    >
                                        <div className="flex items-center gap-3 border-b pb-3 mb-3">
                                            <img
                                                src={avatar}
                                                alt="avatar"
                                                className="w-10 h-10 rounded-full border border-[#16A085]"
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
                    </ul>
                </div>
            </nav>

            {/* ✅ Form Tambah Makanan */}
            <div className="flex-grow flex flex-col items-center px-10 pt-40 pb-10 ">
                {/* Logo di kiri halaman */}
                <img
                    src={tambahLogo}
                    alt="Tambah Makanan"
                    className="absolute left-30 top-10 w-24 h-24 md:w-90 md:h-30 mt-25 self-start"
                />

                {/* Teks tetap di tengah halaman */}
                <p className="text-center text-gray-700 text-lg font-bold max-w-md mb-6">
                    Makananmu tidak ditemukan? <br />
                    Bantu kami untuk melengkapi datanya, yuk!
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="bg-[#E0F5F1] p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
                >
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Nama Makanan"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                    />
                    <input
                        type="number"
                        value={kalori}
                        onChange={(e) => setKalori(e.target.value)}
                        placeholder="Jumlah Kalori (Kkal)"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                    />
                    <input
                        type="number"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        placeholder="Jumlah Protein (Gram)"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#16A085] text-white py-2 rounded-md hover:bg-[#138d77] transition"
                    >
                        Tambah
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default TambahMakanan;
