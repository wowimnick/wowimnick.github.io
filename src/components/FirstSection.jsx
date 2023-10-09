import React, { useEffect } from 'react';
import LottieAnimation from './animation'
import './FirstSection.css';


const FirstSection = () => {


  return (
    <div className='firstsection' data-aos="zoom-out-up">
      <div class='firstContainer'>
      <h2 style={{ padding: '15px', boxShadow: 'rgb(46 46 46 / 31%) -20px 20px 6px 0px', background: 'rgb(255 255 255 / 60%)' }}>Here's a bit about me 👽</h2>
        <p>
          <br />
          I'm a Toronto-based Full-Stack Developer with a strong passion for crafting robust, scalable applications and
          leveraging data to fuel business growth.
          <br /><br />
          I earned my Bachelors in Computer Science from <a href="https://wgu.edu/" style={{ paddingBottom: "0.2em" }}>Western Governors University</a>, where I honed my skills as a problem solver. I thrive on tackling intricate challenges by breaking them down into manageable pieces. Continuously exploring cutting-edge technologies and frameworks keeps me updated and enables me to deliver optimal solutions to my clients.

          <br /><br />I firmly believe that collaboration is the key to achieving remarkable outcomes. I actively seek opportunities to collaborate with positive and ambitious individuals on thrilling projects.
          <br /><br /><br /><br />
          <span style={{ color: '#4bc9f9' }}>Let's make something special.</span>
        </p>
      </div>
      <LottieAnimation loop={false} src={require('../resources/me.json')} style={{width: '20vw'}} progressiveLoad={true} speed2={1}/>
    </div>
  );
};

export default FirstSection;