import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TTNavBar from '../components/TTNavBar';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';

interface AuthorizedLayoutProps {
  children: React.ReactNode;
}

export default function AuthorizedLayout({ children }: AuthorizedLayoutProps) {
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
