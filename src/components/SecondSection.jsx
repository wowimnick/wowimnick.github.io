import React from 'react';
import { Typewriter } from 'react-simple-typewriter'
import LottieAnimation from './animation';
import './SecondSection.css';

const SecondSection = () => {
  return (
    <div className='secondsection' style={{ display: 'flex', justifyContent: 'space-evenly', alignitems: 'center', flexDirection: 'row' }} >

      <div className='desctypewriter' data-aos="fade-up" data-aos-easing="ease-in-out-quart">
        <h2 style={{ width: '80%', padding: '15px', background: 'rgb(255 255 255 / 63%)' }}>What I can do 🛠️</h2>
        <br />
        <p>
          Having strong expertise in IT, I am proficient in a variety of programming languages, tools, and technologies, <br />like
          <span className='rainbow' style={{ fontFamily: 'Outfit', fontWeight: 'bold', fontSize: '20px' }}>
            <Typewriter
              words={[' Java', ' Python', ' Data Analysis', ' HTML & CSS', ' SQL', ' JavaScript', ' React.js', ' Django', ' Cloud Computing', ' Docker', ' Machine Learning', ' Git']}
              loop={0}
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000} />
          </span>.
          
          <br /><br />
          <span className='hidetext'> As an IT Specialist and Software Developer, I have gained skills and knowledge in a large number of areas, including support, data analysis, development, and management. </span>
          <br /><br />
          I have experience in building web applications using React.js and Django, creating data visualizations, working with databases, and deploying applications to the cloud. I am also familiar with version control using Git and containerization with Docker.
        </p>
      </div>
      <div style={{ display: 'grid', flexBasis: '60%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
        <LottieAnimation style={{ gridColumnStart: 2, gridColumnEnd: 'five', gridRowStart: 'row1-start', gridRowEnd: 3, background: 'radial-gradient(at center center, rgb(2 21 95 / 63%) 0%, rgba(255, 255, 255, 0) 70%)' }} loop={false} speed2={1} src={require('../resources/scanner.json')} />
        <LottieAnimation style={{ width: '90%', gridColumnStart: 2, gridColumnEnd: 'five', gridRowStart: 'row1-start', gridRowEnd: 3, justifySelf: 'center', alignSelf: 'center' }} loop={true} speed2={1} src={require('../resources/skills.json')} />
      </div>
    </div>
  );
};

export default SecondSection;