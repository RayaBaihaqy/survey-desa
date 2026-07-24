import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import IdentitasPage from './pages/IdentitasPage';
import SurveyPage from './pages/SurveyPage';
import SuccessPage from './pages/SuccessPage';
import logo from './assets/logo_kendal.png';
import './index.css';
import { useEffect } from 'react';

// Wrapper to handle layout tweaks per page
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    if (isLandingPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [isLandingPage]);

  return (
    <div className="bg-pattern min-h-screen" style={{ display: 'flex', flexDirection: 'column', height: isLandingPage ? '100vh' : 'auto' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo-placeholder" style={{ background: 'transparent' }}>
            <img src={logo} alt="Logo Kendal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="navbar-title">Survey Kuesioner Desa Ngampel Wetan</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', paddingTop: isLandingPage ? '0' : '3rem', paddingBottom: isLandingPage ? '2rem' : '3rem', justifyContent: isLandingPage ? 'center' : 'flex-start' }}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/data-diri/:surveyType" element={<IdentitasPage />} />
          <Route path="/survey/:surveyType" element={<SurveyPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
