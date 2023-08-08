import React from 'react';
import { Typewriter } from 'react-simple-typewriter'
import { InfiniteLoopSlider, Tag } from '../scrollskills'
import LottieAnimation from './animation';
import './SecondSection.css';

const SecondSection = () => {
  return (
    <div className='secondsection' style={{ display: 'flex', justifyContent: 'space-evenly', alignitems: 'center', flexDirection: 'row' }} >

      <div className='desctypewriter' data-aos="zoom-out-up">
        <h2 style={{ width: '80%', padding: '15px', background: '#9591cd33', boxShadow: 'rgb(46 46 46 / 31%) -20px 20px 6px 0px' }}>What I can do 🛠️</h2>
        <br />
        <p>
          Having over 3 years of development experience in both back-end and front-end development, I have experience in a variety of programming languages, tools, and technologies, <br />like
          <span className='rainbow' style={{ fontFamily: 'Outfit', fontWeight: 'bold', fontSize: '20px' }}>
            <Typewriter
              words={[' Java', ' Python', ' C#', ' HTML & CSS', ' SQL', ' JavaScript', ' React.js', ' Django', ' Cloud Computing', ' Docker', ' Machine Learning', ' Git']}
              loop={0}
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000} />
          </span>.
          
          <br /><br />
          <span className='hidetext'> During my experience at Reeve Network I have successfully created ecommerce web applications which hooked into user management systems, and various management tools in Java which served to support the high amount of daily users.
          </span>
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