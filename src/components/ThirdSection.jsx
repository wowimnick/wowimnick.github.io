import React from 'react';
import './ThirdSection.css';
import everx from '../resources/everx.png'
import sa from '../resources/sa.png'
import poster1 from '../resources/postersnake.png'
import snakie from '../resources/snakie.mp4'
import Tilt from "react-parallax-tilt";

const ThirdSection = () => {
  return (
    <div className='thirdsection' style={{ display: 'flex', alignitems: 'center', flexDirection: 'column' }}>
      <div className='shapes2' data-aos="fade-up" data-aos-anchor-placement="top-center" style={{ mixBlendMode: 'luminosity' }} />
      <h2>What i've made.</h2>


      
        <div className='desctypewriter work'>
        <Tilt glareEnable={false} tiltMaxAngleX={4}
          tiltMaxAngleY={4} perspective={1000}
          glareColor={"rgb(255,0,0)"}>
          <div className='sentimentanalysis' data-aos="fade-up">
            <a href="https://github.com/wowimnick/Sentiment-Analysis" target='blank_'><img src={sa} width="100%" height="300" style={{ objectFit: 'cover', borderRadius: '5px', border: '1px white solid' }} /></a>
            <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>Sentiment Analysis</span>
            <div style={{ textAlign: 'center' }} data-aos="fade-out">The sentiment analysis model is developed using the BiLSTM algorithm, trained and tested on the publicly available Stanford Sentiment Dataset. This model achieved an accuracy of ~84% on the validation set.</div>
          </div>
      </Tilt>
        <Tilt glareEnable={false} tiltMaxAngleX={4}
          tiltMaxAngleY={4} perspective={1000}
          glareColor={"rgb(255,0,0)"}>
        <div className='everx' data-aos="fade-up">
          <a href="https://nickpopel.com/everx" target='blank_'><img src={everx} width="100%" height="300" style={{ objectFit: 'cover', borderRadius: '5px', border: '1px white solid' }} /></a>
          <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>EverX</span>
          <div style={{ textAlign: 'center' }} data-aos="fade-out">EverX is a web application designed to empower individuals and businesses to create their own customizable landing pages. Just like Linktree, EverX simplifies the process of sharing multiple links and content in one place, making it convenient for your audience to explore and connect with your online presence. </div>
        </div>
        </Tilt>

        <Tilt glareEnable={false} tiltMaxAngleX={4}
          tiltMaxAngleY={4} perspective={1000}
          glareColor={"rgb(255,0,0)"}>
          <div className='snakie' data-aos="fade-up">

            <a href="https://github.com/wowimnick/SnakeAI" target='blank_'><video width="100%" height="300" muted loop style={{ objectFit: 'cover', borderRadius: '5px', border: '1px white solid' }} autoPlay={!(/Mobi|Android/i.test(navigator.userAgent))} poster={poster1}>
              <source src={snakie} type="video/mp4" />
              Your browser does not support the video tag.
            </video></a>
            <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>Reinforcement Learning Agent</span>
            <div style={{ textAlign: 'center' }} data-aos="fade-out">A reinforcement learning Snake game that implements an agent and lets it learn how to play. The model is capable of playing proficiantly after ~200 episodes. </div>
          </div>
        </Tilt>
      

      
      </div>
    </div>
  );
};

export default ThirdSection;