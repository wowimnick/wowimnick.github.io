import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieAnimation = ({ style, src, loop, speed2 }) => {
  const animationRef = useRef(null);
  const animationContainerRef = useRef(null);
  var loop2 = loop;

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animationRef.current.play();
        } else {
          animationRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (animationContainerRef.current) {
      observer.observe(animationContainerRef.current);
    }

    return () => {
      if (animationContainerRef.current) {
        observer.unobserve(animationContainerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: 'svg',
        loop: loop2,
        autoplay: false,
        animationData: src,
        rendererSettings: {
          progressiveLoad: true, // Load animation progressively
          preserveAspectRatio: 'xMidYMid meet',
        },
      });
    }
  }, [src]);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.setSpeed(speed2);
    }
  }, [speed2]);

  return (
    <div className="lottie-animation" ref={animationContainerRef} style={style}></div>
  );
};

export default LottieAnimation;