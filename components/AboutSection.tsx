'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="py-32 relative overflow-hidden" id="about" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23005F73' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">About Us</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-6 leading-tight">
              Engineering Water Solutions{' '}
              <span className="text-gradient">Since 2020</span>
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                <span className="font-semibold text-[#005F73]">Apasol</span>, derived from &apos;Apas&apos; meaning &apos;Waters&apos; in Sanskrit, 
                represents our deep commitment to water resource management. Founded by{' '}
                <span className="font-semibold text-[#005F73]">Anil Kumar Maddipatla</span> with over 15 years of 
                sector expertise, we&apos;ve rapidly emerged as a trusted name in water engineering consultancy.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="group">
                  <div className="bg-gradient-to-br from-[#00C9C9]/10 to-[#005F73]/10 radius-md p-6 hover:from-[#00C9C9]/20 hover:to-[#005F73]/20 transition-all duration-300">
                    <h4 className="font-bold text-[#005F73] mb-2 text-lg">Our Mission</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Delivering integrated viable solutions for sustainable water infrastructure
                    </p>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-gradient-to-br from-[#3498DB]/10 to-[#00C9C9]/10 radius-md p-6 hover:from-[#3498DB]/20 hover:to-[#00C9C9]/20 transition-all duration-300">
                    <h4 className="font-bold text-[#005F73] mb-2 text-lg">Our Vision</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Leading innovation in water & wastewater engineering consultancy
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Visual Element */}
          <div className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative">
              {/* Main Card */}
              <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] radius-xl p-12 text-white shadow-2xl">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-6xl font-bold mb-2">APASOL</h3>
                    <p className="text-xl opacity-90 font-light">Waters • Engineering • Solutions</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
                    <div>
                      <p className="text-3xl font-bold">15+</p>
                      <p className="text-sm opacity-80">Years Experience</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">₹2000+</p>
                      <p className="text-sm opacity-80">Crores Projects</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#00C9C9] to-[#3498DB] radius-lg opacity-20 blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-full opacity-10 blur-2xl animate-float animation-delay-200"></div>
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 radius-xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 25px,
                    rgba(255,255,255,.05) 25px,
                    rgba(255,255,255,.05) 50px
                  )`
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}