import { motion } from 'framer-motion';
import React, { FC } from 'react';

interface AnimatedPageProps {
  children: React.ReactNode;
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
        duration: 0.2,
        ease: 'circIn',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
