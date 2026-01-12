import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 1],
        y: [0, 8, 0, 0]
      }}
      transition={{
        duration: 2,
        delay: 1.5,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      data-testid="scroll-indicator"
    >
      <ChevronDown 
        className="w-5 h-5 text-primary/60" 
        strokeWidth={1.5}
      />
    </motion.div>
  );
}
