"use client";

import { type ReactNode } from "react";

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
}

export function GlowingBorder({ children, className }: GlowingBorderProps) {
  return (
    <>
      <style jsx>{`
        @property --hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-translate-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-size {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-blur {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-scale {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --glow-radius {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --white-shadow {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        .glow-container {
          --card-color: #1B2A6B;
          --card-radius: 20px;
          --card-width: 300px;
          --border-width: 3px;
          --bg-size: 1;
          --hue: 0;
          --hue-speed: 1;
          --rotate: 0;
          --animation-speed: 6s;
          --interaction-speed: 0.55s;
          --glow-scale: 1.5;
          --scale-factor: 1;
          --glow-blur: 6;
          --glow-opacity: 1;
          --glow-radius: 100;
          --glow-rotate-unit: 1deg;

          width: var(--card-width);
          aspect-ratio: 3/4;
          color: white;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          border-radius: var(--card-radius);
          cursor: pointer;
        }

        .glow-container:before,
        .glow-container:after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
        }

        .glow-content {
          position: absolute;
          background: transparent;
          border-radius: calc(var(--card-radius) * 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          overflow: hidden;
        }

        .glow-content:before {
          content: "";
          display: block;
          position: absolute;
          width: calc(100% + var(--border-width));
          height: calc(100% + var(--border-width));
          border-radius: calc(var(--card-radius) * 0.9);
          z-index: -1;
          background: #1B2A6B radial-gradient(
            30% 30% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 90%) calc(0% * var(--bg-size)),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 80%) calc(20% * var(--bg-size)),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 60%) calc(40% * var(--bg-size)),
            transparent 100%
          );
          animation: hue-animation var(--animation-speed) linear infinite,
                     rotate-bg var(--animation-speed) linear infinite;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow {
          --glow-translate-y: 0;
          display: block;
          position: absolute;
          width: calc(var(--card-width) / 5);
          height: calc(var(--card-width) / 5);
          animation: rotate var(--animation-speed) linear infinite;
          transform: rotateZ(calc(var(--rotate) * var(--glow-rotate-unit)));
          transform-origin: center;
          border-radius: calc(var(--glow-radius) * 10vw);
        }

        .glow:after {
          content: "";
          display: block;
          z-index: -2;
          filter: blur(calc(var(--glow-blur) * 10px));
          width: 130%;
          height: 130%;
          left: -15%;
          top: -15%;
          background: hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 60%);
          position: relative;
          border-radius: calc(var(--glow-radius) * 10vw);
          animation: hue-animation var(--animation-speed) linear infinite;
          transform: scaleY(calc(var(--glow-scale) * var(--scale-factor) / 1.1))
                     scaleX(calc(var(--glow-scale) * var(--scale-factor) * 1.2))
                     translateY(calc(var(--glow-translate-y) * 1%));
          opacity: var(--glow-opacity);
        }

        @keyframes rotate-bg {
          0% { --bg-x: 0; --bg-y: 0; }
          25% { --bg-x: 100; --bg-y: 0; }
          50% { --bg-x: 100; --bg-y: 100; }
          75% { --bg-x: 0; --bg-y: 100; }
          100% { --bg-x: 0; --bg-y: 0; }
        }

        @keyframes rotate {
          from { --rotate: -70; --glow-translate-y: -65; }
          25% { --glow-translate-y: -65; }
          50% { --glow-translate-y: -65; }
          60%, 75% { --glow-translate-y: -65; }
          85% { --glow-translate-y: -65; }
          to { --rotate: calc(360 - 70); --glow-translate-y: -65; }
        }

        /* Blue → White → Green hue cycle
           Blue #1B2A6B ≈ hue 230, White ≈ hue 0 sat 0%, Green #3DD68C ≈ hue 152
           We cycle: 230 → 0 (through white) → 152 → 230 */
        @keyframes hue-animation {
          0% { --hue: 230; }
          30% { --hue: 60; }
          50% { --hue: 0; }
          70% { --hue: 152; }
          100% { --hue: 230; }
        }
      `}</style>

      <div className={`glow-container ${className ?? ""}`} >
        <span className="glow"></span>
        <div className="glow-content">{children}</div>
      </div>
    </>
  );
}
