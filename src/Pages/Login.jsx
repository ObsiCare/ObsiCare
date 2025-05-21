import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // 👈 Tambahan ikon mata

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 State untuk toggle sandi
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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

    console.log('Login attempt with:', email);
    navigate('/home');
  };

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, #93DCC8 50%, #F7F1E3 100%)',
  };

  return (
    <>
      {/* Ikon Rumah */}
      <div className="fixed bottom-7 right-10 z-80">
        <Link
          to="/"
          className="text-[#16A085] hover:text-teal-600 transition duration-300"
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
        <div className="w-full h-full flex items-center justify-between relative">
          {/* Hero kiri */}
          <div className="flex-1 flex justify-center items-center">
            <div
              className="w-80 h-80 rounded-full flex items-center justify-center overflow-visible"
              style={{ backgroundColor: '#16A085' }}
            >
              <div className="text-center flex flex-col justify-center items-center">
                <h1
                  className="font-bold text-black mb-1"
                  style={{
                    fontSize: '7rem',
                    lineHeight: '1',
                    fontFamily: '"Montserrat", sans-serif',
                  }}
                >
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

          {/* Garis Tengah */}
          <div className="w-[2px] h-3/4 bg-black"></div>

          {/* Form Login */}
          <div className="flex-1 flex justify-center items-center py-12">
            <div className="w-96 p-8 rounded-lg bg-white/30 backdrop-blur-sm">
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-6 text-left">
                  <label htmlFor="email" className="block text-lg font-medium mb-2">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-4 border border-gray-300 rounded-md bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password + Icon Mata */}
                <div className="mb-6 text-left relative">
                  <label htmlFor="password" className="block text-lg font-medium mb-2">
                    Sandi
                  </label>
                  <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full p-4 border border-gray-300 rounded-md bg-white pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  </div>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[65px] transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </span>
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Tombol Masuk */}
                <button
                  type="submit"
                  className="w-full py-4 text-white rounded-full text-xl font-medium transition-colors mb-8"
                  style={{ backgroundColor: '#16A085' }}
                >
                  Masuk
                </button>

                {/* Link ke Daftar */}
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
