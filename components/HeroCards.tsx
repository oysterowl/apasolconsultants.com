'use client';

import { useEffect, useState } from 'react';

interface HeroCard {
  id: number;
  title: string;
  subtitle: string;
  stat: string;
  statLabel: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
  backgroundImage: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  borderGlow: string;
}

const heroCards: HeroCard[] = [
  {
    id: 1,
    title: "500+ MLD",
    subtitle: "Capacity Delivered",
    stat: "50+",
    statLabel: "Projects",
    description: "Engineering sustainable water infrastructure across India with cutting-edge technology and innovation",
    badge: "Excellence",
    icon: (
      <svg className="w-8 h-8 text-cyan-200 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    backgroundImage: "linear-gradient(rgba(0, 95, 115, 0.7), rgba(0, 201, 201, 0.3)), url('https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2000')",
    gradientFrom: "#005F73",
    gradientTo: "#00C9C9",
    accentColor: "cyan",
    borderGlow: "rgba(0, 201, 201, 0.2)"
  },
  {
    id: 2,
    title: "₹2000+ Cr",
    subtitle: "Projects Managed",
    stat: "15+",
    statLabel: "Years",
    description: "Transforming water treatment facilities with state-of-the-art solutions for municipalities and industries",
    badge: "Innovation",
    icon: (
      <svg className="w-8 h-8 text-blue-200 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-3v1.5" />
      </svg>
    ),
    backgroundImage: "linear-gradient(rgba(0, 95, 115, 0.7), rgba(52, 152, 219, 0.3)), url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000')",
    gradientFrom: "#005F73",
    gradientTo: "#3498DB",
    accentColor: "blue",
    borderGlow: "rgba(52, 152, 219, 0.2)"
  },
  {
    id: 3,
    title: "100%",
    subtitle: "Project Success",
    stat: "24/7",
    statLabel: "Support",
    description: "Delivering integrated viable solutions for sustainable water infrastructure development",
    badge: "Trusted",
    icon: (
      <svg className="w-8 h-8 text-emerald-200 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    backgroundImage: "linear-gradient(rgba(0, 95, 115, 0.7), rgba(39, 174, 96, 0.3)), url('https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?q=80&w=2000')",
    gradientFrom: "#005F73",
    gradientTo: "#27AE60",
    accentColor: "emerald",
    borderGlow: "rgba(39, 174, 96, 0.2)"
  }
];

export default function HeroCards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % heroCards.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % heroCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + heroCards.length) % heroCards.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Cards Container */}
      <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center">
        {heroCards.map((card, index) => {
          const isActive = index === currentCard;
          const isPrev = index === (currentCard - 1 + heroCards.length) % heroCards.length;
          const isNext = index === (currentCard + 1) % heroCards.length;
          
          return (
            <div
              key={card.id}
              className={`absolute transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 scale-100 z-30' : 
                isPrev ? 'opacity-60 scale-90 -translate-x-64 z-20' :
                isNext ? 'opacity-60 scale-90 translate-x-64 z-20' :
                'opacity-0 scale-80 z-10'
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className={`flex flex-col w-[350px] lg:w-[400px] aspect-[3/5] hover:scale-105 transition-all duration-300 group animate-in text-white bg-cover rounded-3xl p-8 lg:p-10 justify-between ${
                  isActive ? 'cursor-pointer' : 'pointer-events-none'
                }`}
                style={{
                  backgroundImage: card.backgroundImage,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  boxShadow: `rgba(0, 0, 0, 0.5) 0px 25px 50px -12px, ${card.borderGlow} 0px 0px 0px 1px`,
                }}
              >
                {/* Top Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    {card.icon}
                    <span className={`text-xs px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium`}>
                      {card.badge}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-4xl lg:text-5xl tracking-tight font-bold">{card.title}</p>
                    <p className="text-cyan-200 text-lg mt-2 font-normal">{card.subtitle}</p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute top-0 right-0 text-right">
                      <p className="text-cyan-200 text-2xl font-bold">{card.stat}</p>
                      <p className="text-cyan-300 text-sm font-light">{card.statLabel}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4 border-t border-white/20 pt-6">
                  <p className="text-cyan-100 text-sm leading-relaxed font-light">
                    {card.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs tracking-wider">APASOL</span>
                      <svg className="w-4 h-4 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <button className="text-cyan-200 text-sm hover:text-white transition-colors font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {heroCards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCard(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentCard 
                ? 'w-8 bg-[#00C9C9]' 
                : 'w-2 bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevCard}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous card"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextCard}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next card"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}