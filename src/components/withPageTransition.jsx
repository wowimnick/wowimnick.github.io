// src/hocs/withPageTransition.jsx

import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3,
};

const withPageTransition = (WrappedComponent) => {
  return function WithPageTransition(props) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };
};

export default withPageTransition;