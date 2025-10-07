'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import CTASection from '@/components/CTASection';
import type { SiteInfo } from '@/types/siteInfo';

interface ContactSectionProps {
  siteInfo: SiteInfo | null;
}

export default function ContactSection({ siteInfo }: ContactSectionProps) {
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

  if (!siteInfo) {
    return null;
  }

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white" id="contact" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#26AFFF] font-semibold mb-3 tracking-wide uppercase text-sm">Contact</p>
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
              <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#26AFFF] relative overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#26AFFF] to-[#0088cc]" />

                <div className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#26AFFF] to-[#0088cc] rounded-xl flex items-center justify-center shadow-md mb-4">
                    <Phone className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-bold text-xl text-[#2C3E50] mb-1">Call Us</h3>
                  <p className="text-sm text-gray-500 mb-6">Direct line</p>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Mon-Sat • 9:00 AM - 6:00 PM</p>
                    <a href={`tel:${siteInfo.contact.phone}`} className="block text-lg font-bold text-[#0057FF] group-hover:text-[#26AFFF] transition-colors duration-300">
                      {siteInfo.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className={`transition-all duration-500 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#0088cc] relative overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0088cc] to-[#0057FF]" />

                <div className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0088cc] to-[#0057FF] rounded-xl flex items-center justify-center shadow-md mb-4">
                    <Mail className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-bold text-xl text-[#2C3E50] mb-1">Email Us</h3>
                  <p className="text-sm text-gray-500 mb-6">24/7 support</p>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Quick response guaranteed</p>
                    <a href={`mailto:${siteInfo.contact.email}`} className="block text-lg font-bold text-[#0057FF] group-hover:text-[#0088cc] transition-colors duration-300 break-all">
                      {siteInfo.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Card */}
            <div className={`transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-[#0057FF] relative overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0057FF] to-[#26AFFF]" />

                <div className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-xl flex items-center justify-center shadow-md mb-4">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-bold text-xl text-[#2C3E50] mb-1">Visit Us</h3>
                  <p className="text-sm text-gray-500 mb-6">Head office</p>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Mon-Sat • 9:00 AM - 6:00 PM</p>
                    <div className="text-lg font-bold text-[#0057FF] group-hover:text-[#26AFFF] transition-colors duration-300">
                      <p className="text-sm font-medium">{siteInfo.address.line1}</p>
                      {siteInfo.address.line2 && <p className="text-sm font-medium">{siteInfo.address.line2}</p>}
                      <p className="text-sm font-medium text-gray-600 mt-1">{siteInfo.address.city} - {siteInfo.address.pincode}</p>
                      <p className="text-sm font-medium text-gray-600">{siteInfo.address.country}</p>
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