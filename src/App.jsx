import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Header from './components/header/Header';
import Footer from './components/Home/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Locations from './pages/Locations';
import Insurances from './pages/Insurances';
import Careers from './pages/Careers';
import ScrollToTopButton from './components/Home/ScrollToTopButton';
import TOS from './pages/TOS';
import Privacy from './pages/Privacy';
import NotFoundPage from './pages/404';
import { ReferralModalProvider } from './context/ReferralModalContext';
import { tokens } from './styles/tokens';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/insurances" element={<Insurances />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/terms-of-service" element={<TOS />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <AppWrapper>
      <Router>
        <ReferralModalProvider>
          <Header />
          <Main>
            <AnimatedRoutes />
          </Main>
          <Footer />
          <ScrollToTopButton />
        </ReferralModalProvider>
      </Router>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  font-family: ${tokens.font};
  color: ${tokens.ink};
  line-height: ${tokens.lh.base};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

export default App;
