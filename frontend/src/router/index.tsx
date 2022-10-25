import React from 'react';
import ProjectsPage from '../pages/projects';
import HomePage from '../pages/home';
import LandingPage from '../pages/landing';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
import { TTRoute } from '../types/Route';

export const unauthorizedRoutes: TTRoute[] = [
  {
    name: 'Landing',
    path: '/',
    component: <LandingPage />
  },
  {
    name: 'Log in',
    path: '/login',
    component: <LoginPage />
  },
  {
    name: 'Sign up',
    path: '/signup',
    component: <SignupPage />
  }
];
export const authorizedRoutes: TTRoute[] = [
  {
    name: 'Home',
    path: '/',
    component: <HomePage />
  },
  {
    name: 'Projects',
    path: '/projects',
    component: <ProjectsPage />
  }
];
