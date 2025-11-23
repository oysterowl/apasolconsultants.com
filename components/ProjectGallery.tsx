'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  alt?: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="relative h-[320px] sm:h-[380px]">
        <Image
          key={images[current].url}
          src={images[current].url}
          alt={images[current].alt || 'Project image'}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-white/90 text-gray-800 shadow hover:bg-white transition"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-white/90 text-gray-800 shadow hover:bg-white transition"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-2 py-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition ${idx === current ? 'bg-[#0057FF]' : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
