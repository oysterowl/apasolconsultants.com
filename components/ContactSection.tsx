'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import CTASection from '@/components/CTASection';

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

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50" id="contact" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">Contact</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ready to transform your water infrastructure? Let&apos;s discuss how we can help.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Phone Card */}
            <div className={`transition-opacity duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="group bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#00C9C9] relative overflow-hidden">

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#00C9C9] rounded-xl flex items-center justify-center">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#2C3E50] group-hover:text-[#00C9C9] transition-colors duration-300">Call Us</h3>
                      <p className="text-sm text-[#00C9C9] font-medium">Ready to Help</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">Mon-Sat • 9:00 AM - 6:00 PM</p>
                    <a href="tel:+919711999843" className="block text-lg font-bold text-[#005F73] group-hover:text-[#00C9C9] transition-all duration-300 group-hover:tracking-wide">
                      +91-9711999843
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Email Card */}
            <div className={`transition-opacity duration-500 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="group bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#3498DB] relative overflow-hidden">

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#3498DB] rounded-xl flex items-center justify-center">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#2C3E50] group-hover:text-[#3498DB] transition-colors duration-300">Email Us</h3>
                      <p className="text-sm text-[#3498DB] font-medium">Always Available</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">24/7 • Support Available</p>
                    <a href="mailto:info@apasolconsultants.com" className="block text-lg font-bold text-[#005F73] group-hover:text-[#3498DB] transition-all duration-300 group-hover:tracking-wide break-all">
                      info@apasolconsultants.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Office Card */}
            <div className={`transition-opacity duration-500 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="group bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#005F73] relative overflow-hidden">

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#005F73] rounded-xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#2C3E50] group-hover:text-[#005F73] transition-colors duration-300">Visit Us</h3>
                      <p className="text-sm text-[#005F73] font-medium">Come & Meet</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">Office • Mon-Sat</p>
                    <div className="text-lg font-bold text-[#2C3E50] group-hover:text-[#005F73] transition-all duration-300 group-hover:tracking-wide leading-relaxed">
                      Wazir Nagar<br />
                      <span className="text-sm font-medium opacity-80">New Delhi - 110003</span><br />
                      <span className="text-sm font-medium opacity-80">India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Section */}
        <div className={`transition-opacity duration-700 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <CTASection
            title="Ready to Start Your Project?"
            description="Let's discuss how our expertise can transform your water infrastructure vision into reality."
            primaryButtonText="Get Free Consultation"
            primaryButtonHref="/contact"
          />
        </div>
      </div>
    </section>
  );
}