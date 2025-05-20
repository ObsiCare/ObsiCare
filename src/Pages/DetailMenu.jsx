import React from 'react';
import { useLocation, useParams, useNavigate, NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { motion } from 'framer-motion';

const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
};

const DetailMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { makanan } = location.state || {};
    const { nama } = useParams();

    if (!makanan) {
        return (
            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Detail Makanan</h1>
                <p className="text-red-600">Data untuk <strong>{decodeURIComponent(nama)}</strong> tidak ditemukan.</p>
            </div>
        );
    }

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

                {/* Detail Makanan */}
                <div className="flex-grow flex justify-center items-center p-6">
                    <div className="bg-[#E0F5F1] p-16 rounded-xl shadow-md border border-[#16A085] max-w-lg w-full">
                        <h1 className="text-2xl font-bold text-center text-[#16A085] mb-6">Detail Makanan</h1>
                        <div className="space-y-4 text-black text-base">
                            <p><strong>Nama:</strong> {makanan.nama}</p>
                            <p><strong>Kalori:</strong> {makanan.kalori} kkal</p>
                            <p><strong>Protein:</strong> {makanan.protein ?? '--'} g</p>
                            <p><strong>Kategori:</strong> {makanan.kategori ?? '--'}</p>
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                className="bg-[#16A085] text-white px-6 py-2 rounded-md hover:opacity-90"
                                style={{ backgroundColor: '#16A085' }}
                                onClick={() => navigate('/home2')}
                            >
                                Catat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DetailMenu;
