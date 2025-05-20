import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { FiEdit, FiLogOut } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <div className="w-full h-full flex items-center justify-between relative">
          {/* Left side with logo */}
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
                    fontFamily: '"Rozha One", serif',
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
                    fontFamily: '"Rowdies", cursive',
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
                {/* Email */}
                <div className="mb-6 text-left">
                  <label htmlFor="email" className="block text-lg font-medium mb-2">
                    Email Address
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

                {/* Password */}
                <div className="mb-6 text-left">
                  <label htmlFor="password" className="block text-lg font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-4 border border-gray-300 rounded-md bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Tombol Sign In */}
                <button
                  type="submit"
                  className="w-full py-4 text-white rounded-full text-xl font-medium transition-colors mb-8"
                  style={{ backgroundColor: '#16A085' }}
                >
                  Sign In
                </button>

                {/* Link ke Sign Up */}
                <div className="text-center">
                  <span>Create new account? </span>
                  <Link to="/signup" className="font-semibold" style={{ color: '#16A085' }}>
                    Sign Up
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
