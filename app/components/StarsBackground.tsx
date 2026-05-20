"use client";

import * as React from "react";
import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

function generateStars(count: number, starColors: string[]) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    const color = starColors[Math.floor(Math.random() * starColors.length)];
    shadows.push(`${x}px ${y}px ${color}`);
  }
  return shadows.join(", ");
}

interface StarLayerProps {
  count?: number;
  size?: number;
  transition?: { repeat?: number; duration?: number; ease?: string };
  starColors?: string[];
  className?: string;
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColors = ["#fff"],
  className,
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColors));
  }, [count, starColors]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition as object}
      className={cn("absolute top-0 left-0 w-full h-[2000px]", className)}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{ width: `${size}px`, height: `${size}px`, boxShadow }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{ width: `${size}px`, height: `${size}px`, boxShadow }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColors?: string[];
};

export function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColors = ["rgba(61,214,140,0.5)", "rgba(255,255,255,0.3)"],
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor]
  );

  return (
    <div
      data-slot="stars-background"
      className={cn(
        "relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#1a1a3e_0%,_#0a0a1a_100%)]",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div style={{ x: springX, y: springY }}>
        <StarLayer
          count={1000}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
          starColors={starColors}
        />
        <StarLayer
          count={400}
          size={2}
          transition={{ repeat: Infinity, duration: speed * 2, ease: "linear" }}
          starColors={starColors}
        />
        <StarLayer
          count={200}
          size={3}
          transition={{ repeat: Infinity, duration: speed * 3, ease: "linear" }}
          starColors={starColors}
        />
      </motion.div>
      {children}
    </div>
  );
}
