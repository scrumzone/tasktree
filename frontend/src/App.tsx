import React from 'react';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignupPage from './pages/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TTNavBar from './components/TTNavBar';
import { useAppDispatch, useAppSelector } from './store/hooks';
import AuthorizedLayout from './layouts/authorized';
import DefaultLayout from './layouts/default';

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  return isLoggedIn ? <AuthorizedLayout /> : <DefaultLayout />;
}

export default App;
