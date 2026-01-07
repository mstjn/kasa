"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
};

export default function MobileCarousel({ images }: Props) {
  
  const carouselRef = useRef<HTMLDivElement>(null);
  

  const slides = [images[images.length - 1], ...images, images[0]];

  const [index, setIndex] = useState(1);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollLeft = el.clientWidth;
  }, []);

  if (images.length === 1) {
  return (
    <div className="relative w-full lg:hidden h-72">
      <Image
        src={images[0]}
        alt="Property image"
        fill
        className="object-cover rounded-xl"
        priority
      />
    </div>
  );
}


  return (
    <div className="relative w-full lg:hidden">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        onScroll={(e) => {
          const el = e.currentTarget;
          const width = el.clientWidth;
          const currentIndex = Math.round(el.scrollLeft / width);

          setIndex(currentIndex);

          if (currentIndex === 0) {
            setTimeout(() => {
              el.scrollLeft = width * images.length;
            }, 0);
          }

          if (currentIndex === images.length + 1) {
            setTimeout(() => {
              el.scrollLeft = width;
            }, 0);
          }
        }}
      >
        {slides.map((img, i) => (
          <div key={i} className="relative min-w-full h-72 snap-center">
            <Image
              src={img}
              alt={`Property image ${i}`}
              fill
              className="object-cover rounded-xl"
              priority={i === 1}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition ${
              index - 1 === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
