export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-[#005F73] tracking-tight">APASOL</h2>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#services" className="text-gray-600 hover:text-[#005F73] transition-colors text-sm font-medium">Services</a>
              <a href="#projects" className="text-gray-600 hover:text-[#005F73] transition-colors text-sm font-medium">Projects</a>
              <a href="#about" className="text-gray-600 hover:text-[#005F73] transition-colors text-sm font-medium">About</a>
              <a href="#contact" className="bg-[#00C9C9] text-white px-6 py-2.5 rounded-full hover:bg-[#00B5B5] transition-all hover:shadow-lg text-sm font-medium">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimal and Impactful */}
      <section className="pt-32 pb-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="max-w-5xl">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Engineering Excellence Since 2020
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#2C3E50] mb-6 leading-tight">
              Water Solutions<br/>
              <span className="text-[#005F73]">Engineered Right</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Specialized consultancy in water & wastewater management, 
              delivering optimized engineering solutions for sustainable infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-[#005F73] text-white px-8 py-4 rounded-full hover:bg-[#004A5C] transition-all hover:shadow-xl text-sm font-semibold inline-flex items-center">
                Start Your Project
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#services" className="bg-white text-[#005F73] px-8 py-4 rounded-full border-2 border-[#005F73] hover:bg-gray-50 transition-all text-sm font-semibold">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-bold text-[#005F73] mb-2">15+</h3>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-bold text-[#005F73] mb-2">50+</h3>
              <p className="text-gray-600 font-medium">Projects Completed</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-bold text-[#005F73] mb-2">500+</h3>
              <p className="text-gray-600 font-medium">MLD Capacity</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-bold text-[#005F73] mb-2">₹2000+</h3>
              <p className="text-gray-600 font-medium">Crores Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clean Cards */}
      <section className="py-24" id="services">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">What We Do</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive engineering solutions from concept to commissioning
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#00C9C9] hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00C9C9]/20 transition-colors">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Pre-Bid Engineering</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive cost estimates, preliminary designs, and technical specifications for competitive bidding.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#3498DB] hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#3498DB]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3498DB]/20 transition-colors">
                <svg className="w-7 h-7 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Detailed Engineering</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete process, mechanical, electrical, and SCADA design for WTPs, STPs, and pumping stations.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#005F73] hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#005F73]/20 transition-colors">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Network Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Hydraulic modeling and optimization of water distribution networks using WaterGEMS and HEC-RAS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-gray-50" id="projects">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">Portfolio</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Recent Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Delivering excellence across India&apos;s water infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-[#005F73] to-[#00C9C9]"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#2C3E50] mb-2">Rishikesh STP</h3>
                <p className="text-gray-600 text-sm mb-3">26 MLD Sewage Treatment Plant</p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#00C9C9] font-semibold">Uttarakhand</span>
                  <span className="text-gray-500">2023</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-[#3498DB] to-[#00C9C9]"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#2C3E50] mb-2">Jamshedpur WTP</h3>
                <p className="text-gray-600 text-sm mb-3">60 MLD Water Treatment Plant</p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#00C9C9] font-semibold">Jharkhand</span>
                  <span className="text-gray-500">2023</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-[#005F73] to-[#3498DB]"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#2C3E50] mb-2">Hassan Multi-Village</h3>
                <p className="text-gray-600 text-sm mb-3">45 MLD Water Supply Scheme</p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#00C9C9] font-semibold">Karnataka</span>
                  <span className="text-gray-500">2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Minimal */}
      <section className="py-24" id="about">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">About Us</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-6">
                Engineering Water Solutions Since 2020
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Apasol, derived from &apos;Apas&apos; meaning &apos;Waters&apos; in Sanskrit, represents our deep commitment 
                to water resource management. Founded by Anil Kumar Maddipatla with over 15 years of 
                sector expertise.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#005F73] mb-2">Our Mission</h4>
                  <p className="text-gray-600 text-sm">Delivering integrated viable solutions for sustainable water infrastructure</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#005F73] mb-2">Our Vision</h4>
                  <p className="text-gray-600 text-sm">Leading innovation in water & wastewater engineering consultancy</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl h-96 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-6xl font-bold mb-4">APASOL</h3>
                <p className="text-lg opacity-90">Waters • Engineering • Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#005F73]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help optimize your water infrastructure with our engineering expertise.
          </p>
          <a href="#contact" className="bg-[#00C9C9] text-white px-10 py-4 rounded-full hover:bg-[#00B5B5] transition-all hover:shadow-2xl text-lg font-semibold inline-flex items-center">
            Get Free Consultation
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Contact Section - Clean and Simple */}
      <section className="py-24 bg-white" id="contact">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">Contact</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Get In Touch</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="w-16 h-16 bg-[#00C9C9]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00C9C9]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C3E50] mb-2">Phone</h3>
                <p className="text-gray-600">+91-9711999843</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-[#3498DB]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3498DB]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C3E50] mb-2">Email</h3>
                <p className="text-gray-600">info@apasolconsultants.com</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-[#005F73]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#005F73]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C3E50] mb-2">Office</h3>
                <p className="text-gray-600 text-sm">Wazir Nagar, New Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">APASOL</h3>
              <p className="text-gray-400 text-sm mt-1">Consultants & Engineers Pvt Ltd</p>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Apasol Consultants. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
