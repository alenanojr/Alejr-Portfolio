import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personalInfo } from "@/data/personalInfo";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground"
            >
              Portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {personalInfo.fullName}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
              className="h-0.5 w-40 origin-left rounded-full bg-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
