// GradientWrapper.js
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Gradient } from './background.js';
import './App.css';

function GradientWrapper() {
  const { ref, inView } = useInView({
    /* Options for the Intersection Observer, if needed */
  });

  const gradient = React.useRef(null);

  React.useEffect(() => {
    if (!gradient.current) {
      gradient.current = new Gradient();
      gradient.current.initGradient('#gradient-canvas');
    }

    if (inView) {
      gradient.current.play();
    } else {
      gradient.current.pause();
    }

    return () => {
      // Cleanup: Pause and remove the gradient when unmounting the component
      if (gradient.current) {
        gradient.current.pause();
        gradient.current = null;
      }
    };
  }, [inView]);

  return (
    <div ref={ref} className="gradient-wrapper">
      <canvas id="gradient-canvas" />
    </div>
  );
}

export default GradientWrapper;