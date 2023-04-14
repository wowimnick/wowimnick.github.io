import React from 'react';
import { Gradient } from './background.js';

function GradientCanvas() {
  // Create your instance
  const gradient = new Gradient();

  // Call `initGradient` with the selector to your canvas
  React.useEffect(() => {
    gradient.initGradient('#gradient-canvas');
  }, []);

  return (
    <canvas id="gradient-canvas" data-js-darken-top data-transition-in />
  );
}

export default GradientCanvas;