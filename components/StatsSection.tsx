'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

function StatItem({ value, label, delay }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className="text-center">
      <h3 className={`text-4xl lg:text-5xl font-bold text-[#005F73] mb-2 transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}>
        {value}
      </h3>
      <p className={`text-gray-600 font-medium transition-all duration-700 delay-100 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value="15+" label="Years Experience" delay={0} />
          <StatItem value="50+" label="Projects Completed" delay={100} />
          <StatItem value="500+" label="MLD Capacity" delay={200} />
          <StatItem value="₹2000+" label="Crores Projects" delay={300} />
        </div>
      </div>
    </section>
  );
}