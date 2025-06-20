import { JSX } from "react";
import { motion } from "framer-motion";

interface IPageTransitionProps {
  children: JSX.Element;
}

const PageTransition = ({ children }: IPageTransitionProps) => {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ height: "100dvh", zIndex: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
