import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import './styles/style.css';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './components/Contact';
import Plans from './components/Plans';
import Inscription from './components/Inscription';
import Connexion from './components/Connexion';
import Admin from "./admincomponents/Admin";
import AdminAddEditMember from './admincomponents/AdminAddEditMember';

import React from 'react'
import AdminAttendanceSection from './admincomponents/AdminAttendanceSection';
const App = () => {
    return (
        <Router>
            <Header />
            <h1>Hello, React with Vite!</h1>
            <HeroSection />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/index" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/connexion" element={<Connexion />} />
                {/* Add your routes here */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/adminaddeditmember" element={<AdminAddEditMember />} />
                <Route path="/adminattendancesection" element={<AdminAttendanceSection />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
