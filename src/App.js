import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import LottieAnimation from './components/animation'
import 'aos/dist/aos.css';
import Lenis from '@studio-freight/lenis'
import { PropagateLoader } from 'react-spinners'; // Removed PropagateLoader since it's not used
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
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    console.log(e)
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  AOS.init();

  return (
    <div className="App">
      <div className={`loading-spinner ${loading ? '' : 'hidden'}`}>
        <h1 style={{fontSize: '50px', color: 'white'}}>Turning the lights on...</h1>
        <PropagateLoader color="white" loading={loading} size={20} />
      </div>
      
      {!loading && (
        <>
          <Navbar />
          {/* <GradientWrapper /> */}
          <LottieAnimation style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: 'max-content', height: '100%', objectFit: 'cover', overflow: 'hidden' }} loop={false} src={require('./resources/grid.json')} speed2={1} />
          <LottieAnimation style={{position: 'absolute', width: '100%', height: '100%'}} loop={true} src={require('./resources/bga.json')} speed2={1}/>
          <div className="rowmenucontainer">
            <div className="arrow bounce">
              <i className="fa fa-angle-down fa-5x" aria-hidden="true">
                <FontAwesomeIcon icon={faAngleDown} />
              </i>
            </div>
            {/* <LottieAnimation style={{position: 'absolute', width: '200%', height: '200%', top: '65vh', left: '0'}} loop={true} src={require('./resources/sep.json')} speed2={0.1}/> */}
            <Title />
            <ButtonsHolder />
          </div>
          <div className="sections">
            
            <FirstSection />
            
            <LottieAnimation src={require('./resources/animation_lkuowbyo.json')} loop={false} style={{width: '350px', height: '310px'}} speed2={1.5}/>
            <SecondSection />
            

            <LottieAnimation style={{position: 'relative', width: '350px', height: '250px', transform: 'scaleX(-1)', left: '-23vw', top: '20px'}} speed2={1.5} loop={false} src={require('./resources/animation_lkuowbyo.json')}/>
            <ThirdSection />
            <LottieAnimation style={{position: 'relative', left: '-3vw', width: '350px', height: '250px'}} loop={false} speed2={1.5} src={require('./resources/animation_lkuowbyo.json')} />
            <FourthSection />
          </div>
        </>
      )}
    </div>
  );
}

export default App;