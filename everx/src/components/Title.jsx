import React, { Suspense } from 'react';
import line from '../images/line.png'
import { Canvas } from "@react-three/fiber";
import listimage from '../images/listpic.png'
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import './Title.css';

const Title = () => {
  return (
    <div className="Title">
      <div className="Left">
        <h1 className='maintitle'>Create. Customize.<br /> Share.</h1>
        <div className='SubTitle'>
          <img src={line} className='Line' />
          One Place for All Your Links.
        </div>
        <div className='SubTitle' style={{ color: '#d4d4d4', fontWeight: 'normal' }}><br />
        One link to rule them all.
          <br />
          Write them down, come back later.
        </div>
        <button className='Button'>Get Started</button>
      </div>

      
      <div className="Right">
        <img src={listimage} className='Image' />    ;
        <Canvas style={{position:'absolute', width: '100vh', height:'90vh'}}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 5, 0]} />
            <Sphere args={[1, 300, 200]} scale={2.6}>
              <MeshDistortMaterial
                color="#524196"
                attach="material"
                distort={0.4}
                speed={1}
              />
            </Sphere>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Title;