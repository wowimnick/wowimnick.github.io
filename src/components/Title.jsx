import React from 'react';
import './Title.css';
import { Typewriter } from 'react-simple-typewriter'

const Title = () => {
  return (
    <div className='typewriter'>
        <h1 className='h3'>
            <Typewriter
              words={['Hi, Im Nick.']}
              loop={1}
              typeSpeed={30}
              deleteSpeed={50}
            />
          </h1>
          <h1>
            <Typewriter
              words={['What would you like to see?']}
              loop={1}
              cursor
              cursorStyle='|'
              typeSpeed={30}
              deleteSpeed={50}
            />
          </h1>
        </div>
  );
};

export default Title;