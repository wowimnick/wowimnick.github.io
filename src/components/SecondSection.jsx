import React from 'react';
import './SecondSection.css';
import { Typewriter } from 'react-simple-typewriter'
import { InfiniteLoopSlider, Tag } from '../scrollskills'

const SecondSection = () => {

    const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
    const TAGS = ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'TensorFlow', 'Java', 'SQL', 'UI/UX', 'git', 'docker', 'backend', 'frontend', 'C#'];
    const DURATION = 15000;
    const ROWS = 5;
    const TAGS_PER_ROW = 5;
  
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const shuffle = (arr) => [...arr].sort(() => .5 - Math.random());

  return (
    <div className='secondsection' style={{ display: 'flex', justifyContent: 'space-evenly', alignitems: 'center', flexDirection: 'row' }} >

        <div className='desctypewriter' data-aos="fade-right" style={{ position: 'relative', mixBlendMode: 'hard-light', flex: 8 }}>
          <h2>What I can do.</h2>
          <br />
          <p>
          Having over 2 years of development experience in both back-end and front-end development, I have experience in a variety of programming languages, tools, and technologies, <br />like
          <span style={{ color: 'white', fontFamily: 'Damion', fontSize: '22px' }}>
            <Typewriter
              words={[' Java', ' Python', ' C#', ' HTML & CSS', ' SQL', ' JavaScript', ' React.js', ' Django', ' Cloud Computing', ' Docker', ' Machine Learning', ' Git']}
              loop={0}
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000} />
          </span>.
          <br /><br />
          During my experience at Reeve Network I have successfully created ecommerce web applications which hooked into user management systems, and various management tools in Java which served to support the high amount of daily users.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6vh', flexDirection: 'column', flex: 6 }}>
          <div data-aos="flip-left" className='csharp python'><h2 style={{ fontSize: '2vh' }}>Python</h2></div>
          <div data-aos="flip-left" className='csharp java'><h2 style={{ fontSize: '2vh' }}>Java</h2></div>
          <div data-aos="flip-left" className='csharp htmlcss'><h2 style={{ fontSize: '1.6vh' }}>HTML & CSS</h2></div>
          <div data-aos="flip-left" className='csharp'><h2 style={{ fontSize: '2vh' }}>C#</h2></div>
        </div>
        <div className='tag-list' data-aos="fade-left">
          {[...new Array(ROWS)].map((_, i) => (
            <InfiniteLoopSlider key={i} duration={random(DURATION - 5000, DURATION + 5000)} reverse={i % 2}>
              {shuffle(TAGS).slice(0, TAGS_PER_ROW).map(tag => (
                <Tag text={tag} key={tag} />
              ))}
            </InfiniteLoopSlider>
          ))}
          <div className='fade' />
          <div className='skillswork' data-aos="fade-left">
            <h2 style={{ fontSize: '2vh', fontWeight: '300', textAlign: 'left', fontFamily: 'Poppins' }}>Reeve Network, LLC
              <br />
              Software Engineer</h2><br />
            <span style={{ fontSize: '16px', color: 'gray', mixBlendMode: 'color-burn' }}>2019 - 2021
              <br /><br />
              Developed java-based server applications for a large number of daily active users and incorporated APIs and libraries to interact with the server.</span>
          </div>
        </div>
      </div>
  );
};

export default SecondSection;