import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: -30, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 30, scale: 0.95 },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;