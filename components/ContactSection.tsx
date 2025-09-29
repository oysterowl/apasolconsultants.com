'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Globe, CheckCircle } from 'lucide-react';
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
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white" id="contact" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">Contact</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ready to transform your water infrastructure? Let&apos;s discuss how we can help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#00C9C9] relative overflow-hidden">
                {/* Gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00C9C9] to-[#007A8F]" />

                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00C9C9] to-[#007A8F] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-2xl text-[#2C3E50] mb-2">Call Us</h3>
                    <p className="text-[#00C9C9] font-medium text-sm uppercase tracking-wider">Direct Line</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-4 h-4 text-[#00C9C9]" />
                      <p className="text-sm">Mon-Sat • 9:00 AM - 6:00 PM</p>
                    </div>
                    <a href="tel:+919711999843" className="block text-xl font-bold text-[#005F73] group-hover:text-[#00C9C9] transition-colors duration-300">
                      +91-9711999843
                    </a>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Immediate Response
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className={`transition-all duration-500 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#007A8F] relative overflow-hidden">
                {/* Gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007A8F] to-[#005F73]" />

                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#007A8F] to-[#005F73] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-2xl text-[#2C3E50] mb-2">Email Us</h3>
                    <p className="text-[#007A8F] font-medium text-sm uppercase tracking-wider">24/7 Support</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Globe className="w-4 h-4 text-[#007A8F]" />
                      <p className="text-sm">Available Worldwide</p>
                    </div>
                    <a href="mailto:info@apasolconsultants.com" className="block text-xl font-bold text-[#005F73] group-hover:text-[#007A8F] transition-colors duration-300 break-all">
                      info@apasolconsultants.com
                    </a>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Response within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Card */}
            <div className={`transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#005F73] relative overflow-hidden">
                {/* Gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005F73] to-[#003D4F]" />

                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#005F73] to-[#003D4F] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-2xl text-[#2C3E50] mb-2">Visit Us</h3>
                    <p className="text-[#005F73] font-medium text-sm uppercase tracking-wider">Head Office</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-4 h-4 text-[#005F73]" />
                      <p className="text-sm">Mon-Sat • 9 AM - 6 PM</p>
                    </div>
                    <div className="text-xl font-bold text-[#005F73] group-hover:text-[#003D4F] transition-colors duration-300">
                      <p>Wazir Nagar</p>
                      <p className="text-base font-medium text-gray-600 mt-1">New Delhi - 110003</p>
                      <p className="text-base font-medium text-gray-600">India</p>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Walk-ins Welcome
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`transition-opacity duration-700 delay-400 ${
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