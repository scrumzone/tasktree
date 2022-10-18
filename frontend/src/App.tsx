import React from 'react';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignupPage from './pages/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TTNavBar from './components/TTNavBar/index';
import { useAppDispatch, useAppSelector } from './store/hooks';
import AuthService from './services/AuthService';
import { setCurrentUser } from './store/user';

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

function App() {
  const dispatch = useAppDispatch();
  if (useAppSelector((state) => state.user.currentUser) === null) {
    const user = AuthService.decodeJWT(AuthService.getJWT());
    dispatch(setCurrentUser(user));
  }

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
