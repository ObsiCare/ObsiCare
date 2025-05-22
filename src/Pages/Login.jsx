import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    let hasError = false;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Password wajib diisi';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const response = await axios.post('http://localhost:8000/auth/auth/login', {
        email: email,
        password: password,
      });

      const { access_token, user } = response.data;

      // Simpan token dan user info (opsional)
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Arahkan ke halaman utama
      if (user.berat_badan && user.tinggi_badan) {
        navigate('/home2'); // Arahkan ke halaman Home2
      } else {
        navigate('/home');  // Arahkan ke halaman Home untuk melengkapi data
      }

    } catch (error) {
      if (error.response && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Terjadi kesalahan saat login.');
      }
    }
  };

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
  };

  return (
    <>
      {/* Ikon Rumah di luar container */}
      <div className="fixed bottom-7 right-10 z-80">
        <Link
          to="/"
          className="text-[#16A085] visited:text-[#16A085] focus:text-[#16A085] hover:text-teal-600 transition duration-300"
        >
          <FaHome size={40} />
        </Link>
      </div>

      <motion.div
        className="fixed inset-0 w-full h-full flex items-center justify-center"
        style={backgroundStyle}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full flex items-center justify-between">
          {/* Left side with logo */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-80 h-80 rounded-full flex items-center justify-center overflow-visible" style={{ backgroundColor: '#16A085' }}>
              <div className="text-center flex flex-col justify-center items-center">
                <h1 className="font-bold text-black mb-1" style={{ fontSize: '7rem', lineHeight: '1', fontFamily: '"Montserrat", sans-serif' }}>
                  ObsiCare
                </h1>
                <p
                  className="text-white tracking-wide"
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    marginTop: '0px',
                    fontFamily: '"Montserrat", sans-serif',
                  }}
                >
                  small step for better life
                </p>
              </div>
            </div>
          </div>

          {/* Garis tengah */}
          <div className="w-[2px] h-3/4 bg-black"></div>

          {/* Right side with login form */}
          <div className="flex-1 flex justify-center items-center py-12">
            <div className="w-96 p-8 rounded-lg bg-white/30 backdrop-blur-sm">
              <form onSubmit={handleSubmit}>
                {/* Form Group: Email */}
                <div className="mb-6 text-left">
                  <label htmlFor="email" className="block text-lg font-medium mb-2">Alamat Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-4 border border-gray-300 rounded-md bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh@gmail.com"
                    required
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Form Group: Password */}
                <div className="mb-6 text-left">
                  <label htmlFor="password" className="block text-lg font-medium mb-2">Sandi</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-4 border border-gray-300 rounded-md bg-white"
                    value={password}
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="kata sandi minimal 8 karakter"
                    required
                  />
                  {password.length > 0 && password.length < 8 && (
                    <p style={{ color: "red" }}>Password minimal 8 karakter</p>
                  )}
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 text-white rounded-full text-xl font-medium transition-colors mb-8"
                  style={{ backgroundColor: '#16A085' }}
                >
                  Masuk
                </button>

                <div className="text-center">
                  <span>Buat akun baru? </span>
                  <Link to="/signup" className="font-semibold" style={{ color: '#16A085' }}>
                    Daftar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
