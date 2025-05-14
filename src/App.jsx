import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React ,{useState} from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import './styles/style.css';
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './pages/Contact';
import Plans from './pages/Plans';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import TermsOfService from './pages/MentionsLegales';
import PolitiqueDeConfidentialite from './pages/PolitiqueDeConfidentialite';
import ResetPassword from './pages/ResetPassword';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [username, setUsername] = useState(''); 
    const handleLogin = () => { 
        setIsLoggedIn(true); 
        setUsername('JohnDoe'); 
    }
     const handleLogout = () => { 
        setIsLoggedIn(false); 
        setUsername(''); };
    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout}></Header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/connexion" element={<Connexion onLogin={handleLogin}/>} />
                <Route path="/privacypolicy" element={<PolitiqueDeConfidentialite />}></Route>
                <Route path="/termsofservice" element={<TermsOfService />}></Route>
                <Route path="/resetpassword" element={<ResetPassword/>}></Route>
            </Routes>
            <Footer></Footer>
        </Router>
    );
};

export default App;
