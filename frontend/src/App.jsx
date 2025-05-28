import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import SearchMakanan from './Pages/HomeSearch';
import InformasiMakanan from './Pages/DetailMakanan';
import About from './Pages/About';
import Bmi from './Pages/Bmi';
import PrivateRoute from './components/PrivateRoute';
import DailyMissions from './Pages/DailyMissions';
import TambahMakanan from './Pages/TambahMakanan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/search/:id" element={<InformasiMakanan />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/home2"
          element={
            <PrivateRoute>
              <Home2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchMakanan />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-bmi"
          element={
            <PrivateRoute>
              <Bmi />
            </PrivateRoute>
          }
        />
        <Route
          path="/dailymissions"
          element={
            <PrivateRoute>
              <DailyMissions />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambahdatamakanan"
          element={
           <PrivateRoute>
              <TambahMakanan />
           </PrivateRoute> 
          }
        />
      </Routes>
    </Router>
  );
}

export default App;