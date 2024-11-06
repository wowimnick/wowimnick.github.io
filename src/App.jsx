import React from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import FloatingContactButton from './components/Home/FloatingContactButton';
import TOS from './pages/TOS';
import Privacy from './pages/Privacy';
import NotFoundPage from './pages/404';

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
        <Route path='/terms-of-service' element={<TOS />} />
        <Route path='privacy-policy' element={<Privacy />} />

      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <AppWrapper>
      <Router>
        <Header />
        <Main>
          <AnimatedRoutes />
        </Main>
        <Footer />
        <FloatingContactButton />
      </Router>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

export default App;