import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Coverage from './pages/Coverage';
import Careers from './pages/Careers';
import Support from './pages/Support';
import SelfCare from './pages/SelfCare';
// Import service pages
import Broadband from './pages/services/Broadband';
import Hotspot from './pages/services/Hotspot';
import Electrical from './pages/services/Electrical';
import CCTV from './pages/services/CCTV';
import Solar from './pages/services/Solar';
import PLC from './pages/services/PLC';
import Privacy from './pages/Privacy';
import Terms from './pages/terms';
import ServiceOverview from './pages/ServiceOverview/ServiceOverview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Service Routes */}
            <Route path="/services/broadband" element={<Broadband />} />
            <Route path="/services/hotspot" element={<Hotspot />} />
            <Route path="/services/electrical" element={<Electrical />} />
            <Route path="/services/cctv" element={<CCTV />} />
            <Route path="/services/solar" element={<Solar />} />
            <Route path="/services/plc" element={<PLC />} />
            <Route path="/services" element={<ServiceOverview />} />
        <Route path="/services/:serviceId" element={<ServiceOverview />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/coverage" element={<Coverage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/support" element={<Support />} />
            <Route path="/selfcare" element={<SelfCare />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;