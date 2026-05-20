"use client";

const marqueeItems = [
  "one to one Classes",
  "Instant Doubt Clearing",
  "EAMCET · JEE · Board Prep",
  "Real-Time Performance Reports",
  "Parent-Teacher Connect",
  "Proven Results Since 2014",
  "Expert Faculty",
  "Secure Fee Payments",
];

function MarqueeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 px-8 text-[13px] text-[#111C4E] font-semibold whitespace-nowrap font-body">
      <span className="w-[5px] h-[5px] rounded-full bg-[#111C4E] flex-shrink-0" />
      {text}
      <span className="w-px h-[18px] bg-[#111C4E]/20 flex-shrink-0" />
    </div>
  );
}

export default function MarqueeTrustBar() {
  return (
    <div className="relative bg-[#3DD68C] overflow-hidden border-t border-b border-[#2EC47A] py-3.5 shadow-[0_0_30px_rgba(61,214,140,0.3)]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#3DD68C] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#3DD68C] to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div className="flex w-max animate-marquee">
        {/* Double the items for seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <MarqueeItem key={i} text={item} />
        ))}
      </div>
    </div>
  );
}
