import React, { Suspense } from 'react';
import './ThirdSection.css';
import everx from '../resources/everx.png'
import sa from '../resources/sa.png'
import poster1 from '../resources/postersnake.png'
import snakie from '../resources/snakie.mp4'
import Tilt from "react-parallax-tilt";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const ThirdSection = () => {
  return (
    <div className='thirdsection' style={{ display: 'flex', alignitems: 'center', flexDirection: 'column' }}>
      <Canvas style={{position:'absolute', bottom:'40vh', right:'15vw'}}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 1, -3]} />
            <Sphere args={[1, 300, 200]} scale={1.6}>
              <MeshDistortMaterial
                color="#3b0e29"
                attach="material"
                distort={0.4}
                speed={1}
              />
            </Sphere>
          </Suspense>
        </Canvas>
        <Canvas style={{position:'absolute', top:'40vh', left:'20vw'}}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[5, 1, -3]} />
            <Sphere args={[1, 300, 200]} scale={1.3}>
              <MeshDistortMaterial
                color="#260116"
                attach="material"
                distort={0.4}
                speed={1}
              />
            </Sphere>
          </Suspense>
        </Canvas>
      
      
      <h2 data-aos="zoom-out-up" style={{width:'65%', alignSelf:'center'}}>Some of my work 💻</h2>
        <div className='desctypewriter work'>
        <Tilt glareEnable={false} tiltMaxAngleX={1}
          tiltMaxAngleY={1} perspective={1000}
          glareColor={"rgb(255,0,0)"} className='tilt'>
          <div className='sentimentanalysis' data-aos="fade-up">
            <a href="https://github.com/wowimnick/Sentiment-Analysis" target='blank_'><img src={sa} width="100%" height="300" style={{ objectFit: 'cover', borderRadius: '5px' }} /></a>
            <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>Sentiment Analysis</span>
            <div className="image-description" style={{ textAlign: 'center' }} data-aos="fade-out">
            The sentiment analysis model is developed using the BiLSTM algorithm, trained and tested on the publicly available Stanford Sentiment Dataset. This model achieved an accuracy of ~84% on the validation set.
          </div>
          </div>
      </Tilt>
        <Tilt glareEnable={false} tiltMaxAngleX={1}
          tiltMaxAngleY={1} perspective={1000}
          glareColor={"rgb(255,0,0)"} className='tilt'>
        <div className='everx' data-aos="fade-up">
          <a href="https://nickpopel.com/everx" target='blank_'><img src={everx} width="100%" height="300" style={{ objectFit: 'cover', borderRadius: '5px' }} /></a>
          <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>EverX</span>
          <div style={{ textAlign: 'center'}} data-aos="fade-out">EverX is a web application designed to empower individuals and businesses to create their own customizable landing pages. Just like Linktree, EverX simplifies the process of sharing multiple links and content in one place, making it convenient for your audience to explore and connect with your online presence. </div>
        </div>
        </Tilt>

        <Tilt glareEnable={false} tiltMaxAngleX={1}
          tiltMaxAngleY={1} perspective={1000}
          glareColor={"rgb(255,0,0)"} className='tilt'>
          <div className='snakie' data-aos="fade-up">

            <a href="https://github.com/wowimnick/SnakeAI" target='blank_'><video width="100%" height="300" muted loop style={{ objectFit: 'cover', borderRadius: '5px' }} autoPlay={!(/Mobi|Android/i.test(navigator.userAgent))} poster={poster1}>
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