"use client";

import { useEffect, useRef, useState } from "react";
import { PixelImage } from "./PixelImage";

export default function AboutImageCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full flex flex-col items-center" style={{ marginTop: '12px' }}>
      <div style={{ width: '640px', height: '305px', maxWidth: '100%' }}>
        <PixelImage
          src="/aboutimage.png"
          grid="6x4"
          active={active}
          className="w-full h-full"
        />
      </div>

      <div
        className="font-body self-start"
        style={{
          marginTop: "12px",
          marginLeft: "16px",
          background: "#3DD68C",
          color: "#111C4E",
          borderRadius: "100px",
          padding: "8px 20px",
          fontSize: "13px",
          fontWeight: 700,
          pointerEvents: "none",
          border: "1px solid rgba(61, 214, 140, 0.4)",
          boxShadow: "0 8px 24px rgba(61, 214, 140, 0.2)"
        }}
      >
        Est. 2014 · Hyderabad
      </div>
    </div>
  );
}
