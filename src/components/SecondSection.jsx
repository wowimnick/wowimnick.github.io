import React from 'react';
import './SecondSection.css';
import { Typewriter } from 'react-simple-typewriter'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

        <div className='desctypewriter' data-aos="fade-right" style={{ position: 'relative', flex: 8 }}>
          <h2>What I can do 🛠️</h2>
          <br />
          <p>
          Having over 3 years of development experience in both back-end and front-end development, I have experience in a variety of programming languages, tools, and technologies, <br />like
          <span className='rainbow' style={{ fontFamily: 'Outfit', fontWeight:'bold', fontSize:'20px' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6vh', flexDirection: 'column', flex: 6 }}>
          <div data-aos="flip-left" className='csharp python'><h2 style={{ fontSize: '2vh', background: 'none' }}>Python</h2></div>
          <div data-aos="flip-left" className='csharp java'><h2 style={{ fontSize: '2vh', background: 'none' }}>Java</h2></div>
          <div data-aos="flip-left" className='csharp htmlcss'><h2 style={{ fontSize: '2vh', background: 'none' }}>HTML & CSS</h2></div>
          <div data-aos="flip-left" className='csharp'><h2 style={{ fontSize: '2vh', background: 'none' }}>C#</h2></div>
        </div>
        <div>
        <div className='tag-list' data-aos="fade-left">
          {[...new Array(ROWS)].map((_, i) => (
            <InfiniteLoopSlider key={i} duration={random(DURATION - 5000, DURATION + 5000)} reverse={i % 2}>
              {shuffle(TAGS).slice(0, TAGS_PER_ROW).map(tag => (
                <Tag text={tag} key={tag} />
              ))}
            </InfiniteLoopSlider>
          ))}
        </div>
        <div className='skillswork' data-aos="fade-left">
            <h2 style={{ fontSize: '2vh', fontWeight: '300', textAlign: 'left', fontFamily: 'Outfit', background: 'none' }}>
              Reeve Network, LLC <br />
              Full Stack Developer</h2><br />
            <span style={{ fontSize: '16px', color: 'lightgray', mixBlendMode: 'color-burn' }}>Sep 2019 - Jul 2022
              <br /><br />
              • Contributed to the development of a custom e-commerce platform using React, enabling the sale of digital products and services, and designed a forum page to enhance user engagement and community interaction. <br /><br />
              • Developed java-based server applications for upwards of 2000 daily active users and incorporated APIs and libraries, such as Spigot, to access server data and interact with the server. <br /><br />
              • Utilized advanced techniques in NLP using TensorFlow ML models to identify and remove any content that violated community guidelines, resulting in a more respectful and appropriate environment for all users. <br /><br />
              • Worked with other developers to design and implement scalable, fault-tolerant server architectures using containerization technologies such as Docker and Kubernetes, resulting in increased system reliability and performance.
              </span>
          </div>
          </div>
      </div>
  );
};

export default SecondSection;