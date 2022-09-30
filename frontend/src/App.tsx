import React from 'react';
import { useEffect } from 'react';
import logo from './assets/logo.png';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignupPage from './pages/signup';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import './App.css';
import TTNavBar from './components/TTNavBar/index';

function App() {
  useEffect(() => {
    document.title = 'Tasktree';
  });

  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Login',
      path: '/login',
    },
    {
      name: 'Signup',
      path: '/signup',
    },
  ];

  return (
    <div className="App">
      <Router>
        <TTNavBar navItems={navItems} />
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
