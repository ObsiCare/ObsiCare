import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo2.png';
import groupImage from '../assets/orang.png';
import iconEasy from '../assets/jari.png';
import iconIMT from '../assets/kalkulator.png';
import iconCalorie from '../assets/kcal.png';
import iconRecommend from '../assets/alat.png';
import laptop from '../assets/laptop.png';

const About = () => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
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
      {/* ✅ About Section */}
      <section
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%)',
        }}
        className=" py-16 px-6 md:px-20 font-poppins text-[#0F836C]"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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
              className="absolute bottom-[-50px] left-[53px] w-[60%] md:w-[60%] lg:w-[60%] z-20"
            />
            <img
              src={groupImage}
              alt="Obsicare Illustration"
              className="w-[85%] h-auto rounded-xl shadow-lg z-10"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
