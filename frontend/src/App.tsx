import React from 'react';
import { useEffect } from 'react';
import logo from './assets/logo.png';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignupPage from './pages/signup';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';

function App() {
    useEffect(() => {
        document.title = 'Tasktree';
    });
    return (
        <div className="App">
            <Router>
            <nav>
                <ul className="nav">
                    <li><NavLink to="/login">Log in</NavLink></li>
                    <li><NavLink to="/signup">Sign up</NavLink></li>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </nav>
            <br />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
