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

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const applyOverflow = () => {
      if (isLandingPage && window.innerWidth > 768) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    applyOverflow();
    window.addEventListener('resize', applyOverflow);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', applyOverflow);
    };
  }, [isLandingPage]);

  return (
    <div className="bg-pattern min-h-screen" style={{ display: 'flex', flexDirection: 'column', minHeight: isLandingPage ? '100dvh' : 'auto' }}>
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
      <main className="container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', paddingTop: isLandingPage ? '1.5rem' : 'clamp(1.5rem, 4vw, 3rem)', paddingBottom: isLandingPage ? '2rem' : 'clamp(1.5rem, 4vw, 3rem)', justifyContent: isLandingPage ? 'center' : 'flex-start' }}>
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
