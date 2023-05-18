import React from 'react';
import './ButtonsHolder.css';
import { Typewriter } from 'react-simple-typewriter'
import { animateScroll as scroll, scroller } from 'react-scroll'

const ButtonsHolder = () => {
    const scrollTo = (section) => {
        scroller.scrollTo(section, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
      };
  return (
    <div className='buttons'>
          <button className='aboutme' onClick={() => { scrollTo('FirstSection') }}>
            <Typewriter
              words={['About Me']}
              loop={1}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1600}
            />
          </button>
          <button className='skills' onClick={() => { scrollTo('secondsection') }}>
            <Typewriter
              words={['My Skills']}
              loop={1}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1600}
            />
          </button>
          <button className='projects' onClick={() => { scrollTo('thirdsection') }}>
            <Typewriter
              words={['My Portfolio']}
              loop={1}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500} />
          </button>
          <button className='contact' onClick={() => { scroll.scrollToBottom() }}>
            <Typewriter
              words={['Contact Me']}
              loop={1}
              typeSpeed={135}
              deleteSpeed={50}
              delaySpeed={1600}
            />
          </button>
        </div>
)};

export default ButtonsHolder;