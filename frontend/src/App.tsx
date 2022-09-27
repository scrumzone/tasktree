import React from 'react';
import { useEffect } from 'react';
import logo from './assets/logo.png';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignupPage from './pages/signup';
import './App.css';

function App() {
    useEffect(() => {
        document.title = 'Tasktree';
    });
    return (
        <div className="App"></div>
    );
}

export default App;
