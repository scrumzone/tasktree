import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TTNavBar from '../components/TTNavBar';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';

export default function Layout() {
  const navItems = [
    {
      name: 'Landing',
      path: '/'
    },
    {
      name: 'Log in',
      path: '/login'
    },
    {
      name: 'Sign up',
      path: '/signup'
    }
  ];

  return (
    <div className="App">
      <Router>
        <TTNavBar navItems={navItems} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}
