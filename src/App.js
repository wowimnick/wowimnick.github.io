import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RingLoader } from 'react-spinners'; // Removed PropagateLoader since it's not used
import GradientWrapper from './GradientWrapper';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './components/Navbar';
import FirstSection from './components/FirstSection';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';
import FourthSection from './components/FourthSection';
import ButtonsHolder from './components/ButtonsHolder';
import Title from './components/Title';

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  AOS.init();

  return (
    <div className="App">
      <div className={`loading-spinner ${loading ? '' : 'hidden'}`}>
        <h1 style={{fontSize: '50px'}}>Turning the lights on...</h1>
        <RingLoader color="#fff" loading={loading} size={60} />
      </div>
      {!loading && (
        <>
          <Navbar />
          <GradientWrapper />
          <div className="rowmenucontainer">
            <div className="arrow bounce">
              <i className="fa fa-angle-down fa-5x" aria-hidden="true">
                <FontAwesomeIcon icon={faAngleDown} />
              </i>
            </div>
            <Title />
            <ButtonsHolder />
          </div>
          <div className="sections">
            <FirstSection />
            <SecondSection />
            <ThirdSection />
            <FourthSection />
          </div>
        </>
      )}
    </div>
  );
}

export default App;