// src/hocs/withPageTransition.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../styles/animations';

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