import { motion } from 'framer-motion';
import React, { FC } from 'react';

interface AnimatedPageProps {
  /**
   * For now, the known children of this component is
   * <Outlet/> from the react-router-dom and
   * type any is a bad type. Watch out for bugs.
   */
  children: any;
}

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedPage: FC<AnimatedPageProps> = ({
  children,
}: AnimatedPageProps) => {
  return (
    <motion.div
      variants={animations}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
