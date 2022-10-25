import React from 'react';
import { useEffect } from 'react';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignupPage from './pages/signup';
import DisplayProjectsPage from './pages/displayProjects'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TTNavBar from './components/TTNavBar/index';

const navItems = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Log in',
    path: '/login'
  },
  {
    name: 'Sign up',
    path: '/signup'
  },
  {
    name: 'Projects',
    path: '/displayProjects'
  }
];

function App() {
  useEffect(() => {
    document.title = 'Tasktree';
  });

  return (
    <div className="App">
      <Router>
        <TTNavBar navItems={navItems} />
        <br />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/displayProjects" element={<DisplayProjectsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
