import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TTNavBar from '../components/TTNavBar';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
import AuthService from '../services/AuthService';
import { useAppDispatch } from '../store/hooks';
import { clearCurrentUser } from '../store/user';

export default function AuthorizedLayout() {
  const dispatch = useAppDispatch();
  const navItems = [
    {
      name: 'Log out',
      action: (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, MouseEvent>
      ) => {
        e.preventDefault();
        AuthService.signOut();
        dispatch(clearCurrentUser());
      }
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
