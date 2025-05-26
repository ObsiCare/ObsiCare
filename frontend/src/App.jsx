import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import DailyMission from './Pages/DailyMissions';
import Bmi from './Pages/Bmi';
import Menu from './Pages/SearchMakanan';
import DetailMenu from './Pages/DetailMenu';
import About from './Pages/About';
import SearchMakanan from './Pages/SearchMakanan';
import TambahMakanan from './Pages/TambahMakanan';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/dailymissions" element={<DailyMission />} />
        <Route path="/update-bmi" element={<Bmi />} />
        <Route path="/searchmakanan" element={<SearchMakanan />} />
        <Route path="/detailmenu/:nama" element={<DetailMenu />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/tambah-makanan" element={<TambahMakanan />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
