import React from 'react';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignupPage from './pages/signup';
import { BrowserRouter as Router, NavigateFunction, Route, Routes } from 'react-router-dom';
import './App.css';
import TTNavBar from './components/TTNavBar';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { TTRoute } from './types/Route';
import AuthService from './services/AuthService';
import { clearCurrentUser } from './store/user';
import LandingPage from './pages/landing';
import { authorizedRoutes, unauthorizedRoutes } from './router';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { SnackbarState } from './store/types';
import { clearSnackbar } from './store/snackbar';

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const snackbar = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();
  const routes = isLoggedIn ? authorizedRoutes : unauthorizedRoutes;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(clearSnackbar());
  };

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
            e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, MouseEvent>,
            navigate: NavigateFunction
          ) => {
            e.preventDefault();
            AuthService.signOut();
            dispatch(clearCurrentUser());
            navigate('/');
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
      <Snackbar open={snackbar.message !== ''} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
