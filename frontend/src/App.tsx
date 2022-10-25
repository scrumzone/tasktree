import React from 'react';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignupPage from './pages/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TTNavBar from './components/TTNavBar';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { TTRoute } from './types/Route';
import AuthService from './services/AuthService';
import { clearCurrentUser } from './store/user';
import LandingPage from './pages/landing';
import { authorizedRoutes, unauthorizedRoutes } from './router';

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const routes = isLoggedIn ? authorizedRoutes : unauthorizedRoutes;

  const navItems = isLoggedIn
    ? [
        {
          name: 'Home',
          path: '/'
        },
        {
          name: 'Projects',
          path: '/projects'
        },
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
      ]
    : [
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
          {routes.map((item: TTRoute) => {
            return <Route key={item.name} path={item.path} element={item.component} />;
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
