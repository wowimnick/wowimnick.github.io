import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GradientCanvas from './gradient';
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
  
  AOS.init();
  
  return (
    <div className="App">
      <Navbar />
      <div className='rowmenucontainer'>
        <div className="arrow bounce"><i className="fa fa-angle-down fa-5x" aria-hidden="true"><FontAwesomeIcon icon={faAngleDown} /></i></div>
        <GradientCanvas />
        <Title />
        <ButtonsHolder />
      </div>
      <div className='sections'>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
      </div>
    </div>
  );
}



export default App;
