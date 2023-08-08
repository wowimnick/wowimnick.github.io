import React, { useRef } from 'react';
import LottieAnimation from './animation'
import './ThirdSection.css';
import everx from '../resources/everx.png'
import sa from '../resources/sa.png'
import poster1 from '../resources/postersnake.png'
import snakie from '../resources/snakie.mp4'
import Tilt from "react-parallax-tilt";

const ThirdSection = () => {
  return (
    <div className='thirdsection' style={{ display: 'flex', alignitems: 'center', flexDirection: 'column' }}>
      <h2 data-aos="zoom-out-up" style={{ alignSelf: 'center', width: 'fit-content', padding: '15px', marginTop: '0', background:'rgb(255 255 255 / 93%)' }}>Some of my work 💻</h2>
        <div className='sentimentanalysis' data-aos="fade-up">
          <a href="https://github.com/wowimnick/Sentiment-Analysis" target='blank_'><img src={sa} width="100%" height="300" style={{ objectFit: 'cover', borderRadius: '5px' }} /></a>
          <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>Sentiment Analysis</span>
          <div className="image-description" style={{ textAlign: 'center' }} data-aos="fade-out">
            The sentiment analysis model is developed using the BiLSTM algorithm, trained and tested on the publicly available Stanford Sentiment Dataset. This model achieved an accuracy of ~84% on the validation set.
          </div>
        </div>
        <div className='everx' data-aos="fade-up">
          <a href="https://nickpopel.com/everx" target='blank_'><img src={everx} width="100%" height="300" style={{ objectFit: 'cover', borderRadius: '5px' }} /></a>
          <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>EverX</span>
          <div style={{ textAlign: 'center' }} data-aos="fade-out">EverX is a web application designed to empower individuals and businesses to create their own customizable landing pages. Just like Linktree, EverX simplifies the process of sharing multiple links and content in one place, making it convenient for your audience to explore and connect with your online presence. </div>
        </div>

        <div className='snakie' data-aos="fade-up">

          <a href="https://github.com/wowimnick/SnakeAI" target='blank_'><video width="100%" height="300" muted loop style={{ objectFit: 'cover', borderRadius: '5px' }} autoPlay={!(/Mobi|Android/i.test(navigator.userAgent))} poster={poster1}>
            <source src={snakie} type="video/mp4" />
            Your browser does not support the video tag.
          </video></a>
          <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>Reinforcement Learning Agent</span>
          <div style={{ textAlign: 'center' }} data-aos="fade-out">A reinforcement learning Snake game that implements an agent and lets it learn how to play. The model is capable of playing proficiantly after ~200 episodes. </div>
        </div>



    </div>
  );
};

export default ThirdSection;