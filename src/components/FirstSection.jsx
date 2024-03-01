import React, { useEffect } from 'react';
import LottieAnimation from './animation'
import './FirstSection.css';


const FirstSection = () => {


  return (
    <div className='firstsection'>
      <div class='firstContainer'>
      <h2 style={{ padding: '15px', boxShadow: 'rgb(46 46 46 / 31%) -20px 20px 6px 0px', background: 'rgb(255 255 255 / 63%)' }}>Here's a bit about me</h2>
        <p>
          <br />
          I'm a passionate & proactive human with strong expertise Machine/Deep Learning, Software Development, 
          and Natural Language Processing. 
          <br /><br />
          I earned my Bachelors in Computer Science from <a href="https://wgu.edu/" style={{ paddingBottom: "0.2em" }}>Western Governors University</a>, where I honed my skills as a problem solver. Continuously exploring cutting-edge technologies and frameworks keeps me updated and enables me to deliver optimal solutions. I am currently persuing my Masters in Computer Science from Georgia Intitute of Technology. 

          <br /><br />Self-motivation, attention to detail, innovative problem solving, strong analytical skills, articulate communication & creativity are the things that drive me to achieve great results. If you're looking to hire, collaborate, or require any assistance, leave me an email. I'd love to hear from you.
          <br /><br /><br /><br />
          <span style={{ color: '#4bc9f9' }}>Let's make something special.</span>
        </p>
      </div>
      <LottieAnimation loop={false} src={require('../resources/me.json')} style={{width: '20vw'}} progressiveLoad={true} speed2={1}/>
    </div>
  );
};

export default FirstSection;