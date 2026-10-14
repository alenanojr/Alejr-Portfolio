import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const { ref, value: current } = useCountUp(value);

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {suffix}
    </span>
  );
}
