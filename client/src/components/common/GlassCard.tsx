import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLMotionProps<"div">;

export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
