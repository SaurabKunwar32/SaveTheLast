import Navbar from './Components/Layout/Navbar.jsx'
import Footer from './Components/Layout/Footer.jsx';
import Home from './Components/Pages/Home.jsx';
import Login from './Components/Auth/login.jsx';
import Register from './Components/Auth/Register.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import NationalParks from './Components/Pages/NationalParks.jsx';
import RareSpecies from './Components/Pages/RareSpecies.jsx';
import About from './Components/Pages/About.jsx';
import SpeciesDetail from './Components/Pages/SpeciesDetail.jsx';
import ParksSpeciesDetail from './Components/Pages/ParksSpeciesDetail.jsx';
import Chatbot from './Components/chatbot/chatbot.jsx';



function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* NOrmal routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/parks' element={<NationalParks />} />
        <Route path='/rare-species' element={<RareSpecies />} />
        <Route path='/about' element={<About />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
        <Route path="/parks/:slug" element={<ParksSpeciesDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App
