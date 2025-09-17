'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Sectors', href: '/sectors' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  const services = [
    { name: 'Water Treatment Plants', href: '/services' },
    { name: 'Sewerage Systems', href: '/services' },
    { name: 'Network Design', href: '/services/network-design' },
    { name: 'Detailed Engineering', href: '/services/detailed-engineering' },
  ];

  const sectors = [
    { name: 'Municipal Water', href: '/sectors/municipal' },
    { name: 'Industrial Water', href: '/sectors/industrial' },
    { name: 'Rural Water', href: '/sectors/rural' },
    { name: 'Smart Water', href: '/sectors/smart-water' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 382 382">
          <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"/>
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 551.034 551.034">
          <path d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722 c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156 C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156 c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722 c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z"/>
          <path d="M275.517,133C196.933,133,133,196.933,133,275.516 s63.933,142.517,142.517,142.517S418.034,354.1,418.034,275.516S354.101,133,275.517,133z M275.517,362.6 c-48.095,0-87.083-38.988-87.083-87.083s38.989-87.083,87.083-87.083c48.095,0,87.083,38.988,87.083,87.083 C362.6,323.611,323.611,362.6,275.517,362.6z"/>
          <circle cx="418.306" cy="134.072" r="34.149"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:info@apasolconsultants.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1600px]">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Image
                  src="/apasol-logo.png"
                  alt="APASOL Consultants"
                  width={180}
                  height={60}
                  className="h-12 w-auto object-contain mb-6"
                />
              </div>

              <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">
                Leading water and wastewater engineering solutions with innovation and sustainability at our core. Delivering excellence across India's water infrastructure.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 bg-white hover:bg-gradient-to-br hover:from-[#005F73] hover:to-[#00C9C9] text-gray-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Quick Links</h4>
              <div className="space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-[#005F73] text-sm transition-all duration-200 hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Our Services</h4>
              <div className="space-y-3">
                {services.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-[#005F73] text-sm transition-all duration-200 hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Get in Touch</h4>
              <div className="space-y-4">
                <div className="group flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73] group-hover:to-[#00C9C9] rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Call Us</p>
                    <p className="text-gray-700 text-sm font-semibold">+91-9711999843</p>
                  </div>
                </div>

                <div className="group flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73] group-hover:to-[#00C9C9] rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Email Us</p>
                    <p className="text-gray-700 text-sm font-semibold">info@apasolconsultants.com</p>
                  </div>
                </div>

                <div className="group flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73] group-hover:to-[#00C9C9] rounded-xl flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Visit Us</p>
                    <div className="text-gray-700 text-sm font-semibold">
                      Wazir Nagar, New Delhi<br />
                      India - 110003
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm text-center md:text-left">
              <p>© {new Date().getFullYear()} APASOL Consultants & Engineers Pvt Ltd. All rights reserved.</p>
            </div>

            {/* Osiltec Credit */}
            <div className="text-gray-500 text-sm text-center md:text-right">
              <p>
                Designed & Developed by{' '}
                <a
                  href="https://osiltec.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#005F73] hover:text-[#00C9C9] transition-colors duration-150"
                >
                  Osiltec Consulting
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}