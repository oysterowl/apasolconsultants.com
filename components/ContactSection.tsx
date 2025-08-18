'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
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

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="contact" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">Contact</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ready to transform your water infrastructure? Let's discuss how we can help.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Phone Card */}
            <div className={`transition-opacity duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100 hover:border-[#00C9C9]">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00C9C9]/20 to-[#00B5B5]/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Phone Icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#2C3E50] mb-3">Call Us</h3>
                <p className="text-gray-600 mb-4">Mon-Sat 9:00 AM - 6:00 PM</p>
                <a href="tel:+919711999843" className="text-lg font-semibold text-[#005F73] hover:text-[#00C9C9] transition-colors">
                  +91-9711999843
                </a>
              </div>
            </div>
            
            {/* Email Card */}
            <div className={`transition-opacity duration-500 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100 hover:border-[#3498DB]">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3498DB]/20 to-[#2980B9]/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Email Icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#2C3E50] mb-3">Email Us</h3>
                <p className="text-gray-600 mb-4">24/7 Support Available</p>
                <a href="mailto:info@apasolconsultants.com" className="text-lg font-semibold text-[#005F73] hover:text-[#3498DB] transition-colors break-all">
                  info@apasolconsultants.com
                </a>
              </div>
            </div>
            
            {/* Office Card */}
            <div className={`transition-opacity duration-500 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100 hover:border-[#005F73]">
                <div className="w-16 h-16 bg-gradient-to-br from-[#005F73]/20 to-[#004A5C]/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Location Icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#2C3E50] mb-3">Visit Us</h3>
                <p className="text-gray-600">
                  Wazir Nagar<br />
                  New Delhi - 110003<br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`mt-16 text-center transition-opacity duration-700 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-[#005F73] via-[#007A8F] to-[#00C9C9] rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 35px,
                    rgba(255,255,255,.1) 35px,
                    rgba(255,255,255,.1) 70px
                  )`
                }}></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's discuss how our expertise can transform your water infrastructure vision into reality.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center px-10 py-4 bg-white text-[#005F73] rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                  aria-label="Navigate to contact form"
                >
                  Get Free Consultation
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}