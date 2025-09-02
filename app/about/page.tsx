'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}


interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon: React.ReactNode;
}

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}
    </span>
  );
}

export default function AboutPage() {
  const timeline: TimelineItem[] = [
    {
      year: '2016',
      title: 'Foundation',
      description: 'APASOL Consultants established with a vision to revolutionize water infrastructure',
      highlight: true
    },
    {
      year: '2018',
      title: 'First Major Project',
      description: 'Completed 45 MLD water treatment plant serving 500,000+ residents'
    },
    {
      year: '2020',
      title: 'National Recognition',
      description: 'Awarded &quot;Best Water Consultancy Firm&quot; by Indian Water Works Association'
    },
    {
      year: '2021',
      title: 'Technology Integration',
      description: 'Launched Smart Water Solutions division with IoT and AI capabilities'
    },
    {
      year: '2023',
      title: 'Milestone Achievement',
      description: 'Crossed ₹2000 crores in project value with 100+ successful projects',
      highlight: true
    },
    {
      year: '2024',
      title: 'Expanding Horizons',
      description: 'Entered international markets with projects in Nepal and Bangladesh'
    }
  ];

  // const team: TeamMember[] = [
  //   {
  //     name: 'Anil Kumar',
  //     role: 'Founder & Principal Consultant',
  //     experience: '30+ Years',
  //     expertise: ['Water Treatment', 'Project Management', 'Strategic Planning']
  //   },
  //   {
  //     name: 'Dr. Priya Sharma',
  //     role: 'Technical Director',
  //     experience: '25+ Years',
  //     expertise: ['Wastewater Engineering', 'Environmental Impact', 'R&D']
  //   },
  //   {
  //     name: 'Rajesh Mehta',
  //     role: 'Chief Design Engineer',
  //     experience: '20+ Years',
  //     expertise: ['Hydraulic Modeling', 'Network Design', 'SCADA Systems']
  //   },
  //   {
  //     name: 'Sunita Patel',
  //     role: 'Head of Smart Solutions',
  //     experience: '15+ Years',
  //     expertise: ['IoT Integration', 'Data Analytics', 'Digital Infrastructure']
  //   }
  // ];

  const certifications: Certification[] = [
    {
      name: 'ISO 9001:2015',
      issuer: 'Quality Management',
      year: '2019',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      name: 'IWWA Member',
      issuer: 'Indian Water Works Association',
      year: '2017',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: 'CPCB Approved',
      issuer: 'Central Pollution Control Board',
      year: '2018',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#005F73] to-[#00C9C9]">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Since 2016
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Engineering Water Solutions for a Sustainable Future
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              APASOL - Aqua Pollution & Solution Consultants, pioneering innovative water 
              and wastewater engineering solutions across India.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              See the impact we&apos;ve made
            </h2>
            <p className="text-gray-600 text-lg">
              Over 8 years of transforming water infrastructure across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {/* Projects Completed - Blue */}
            <div className="group">
              <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl p-8 text-white transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start">
                  <div className="mr-4 mt-2">
                    <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl lg:text-6xl font-bold mb-2 flex items-center">
                      <CountUp end={100} duration={2500} />
                      <span className="text-3xl lg:text-4xl ml-1">+</span>
                    </div>
                    <p className="text-white/90 font-medium text-lg">Projects Completed</p>
                    <p className="text-white/70 text-sm mt-1">Successfully delivered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Capacity - White */}
            <div className="group">
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#00C9C9]/30">
                <div className="flex items-start">
                  <div className="mr-4 mt-2">
                    <svg className="w-10 h-10 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl lg:text-6xl font-bold text-[#005F73] mb-2 flex items-center">
                      <CountUp end={500} duration={2500} />
                      <span className="text-3xl lg:text-4xl ml-1">MLD</span>
                    </div>
                    <p className="text-gray-700 font-medium text-lg">Treatment Capacity</p>
                    <p className="text-gray-500 text-sm mt-1">Million liters daily</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lives Impacted - Blue */}
            <div className="group">
              <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl p-8 text-white transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start">
                  <div className="mr-4 mt-2">
                    <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl lg:text-6xl font-bold mb-2 flex items-center">
                      <CountUp end={10} duration={2500} />
                      <span className="text-3xl lg:text-4xl ml-1">M+</span>
                    </div>
                    <p className="text-white/90 font-medium text-lg">Lives Impacted</p>
                    <p className="text-white/70 text-sm mt-1">Clean water access</p>
                  </div>
                </div>
              </div>
            </div>

            {/* States Covered - White */}
            <div className="group">
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#00C9C9]/30">
                <div className="flex items-start">
                  <div className="mr-4 mt-2">
                    <svg className="w-10 h-10 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl lg:text-6xl font-bold text-[#005F73] mb-2 flex items-center">
                      <CountUp end={8} duration={2500} />
                      <span className="text-3xl lg:text-4xl ml-1">+</span>
                    </div>
                    <p className="text-gray-700 font-medium text-lg">States Covered</p>
                    <p className="text-gray-500 text-sm mt-1">Pan-India presence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8">
                <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm inline-flex items-center">
                  <span className="w-12 h-0.5 bg-[#00C9C9] mr-3"></span>
                  Our Story
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4 leading-tight">
                  From Vision to Reality
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Building India&apos;s water infrastructure, one innovative solution at a time.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="pl-4 border-l-3 border-[#00C9C9]/30">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Founded in <span className="font-semibold text-[#005F73]">2016</span> by Anil Kumar, a visionary with three decades of experience 
                    in water engineering, APASOL emerged from a critical observation: India&apos;s 
                    rapid urbanization demanded innovative, sustainable water infrastructure solutions.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-[#005F73]/5 to-[#00C9C9]/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#005F73] mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    What APASOL Means
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    The name <span className="font-semibold">APASOL - Aqua Pollution & Solution</span> embodies our dual commitment: 
                    addressing water pollution challenges while delivering comprehensive solutions 
                    that ensure clean water access for all.
                  </p>
                </div>
                
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    What started as a small consultancy in New Delhi has grown into one of India&apos;s 
                    most trusted water engineering firms, with projects spanning from the <span className="font-medium text-[#005F73]">Himalayas 
                    to the coastal regions</span>, each designed with precision, sustainability, and 
                    community impact at its core.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/projects" className="inline-flex items-center text-[#00C9C9] hover:text-[#005F73] font-semibold group">
                  View Our Projects
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <svg className="w-32 h-32 mx-auto mb-6 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
                    </svg>
                    <h3 className="text-2xl font-bold mb-2">Our Journey</h3>
                    <p className="text-lg opacity-90">8 Years of Excellence</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#00C9C9]/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#005F73]/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Journey
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50]">
              Milestones & Achievements
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#005F73] via-[#00C9C9] to-[#005F73]"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 order-2'}`}>
                    <div className={`inline-block p-6 rounded-2xl ${item.highlight ? 'bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white shadow-xl' : 'bg-white shadow-lg'}`}>
                      <div className={`text-2xl font-bold mb-2 ${item.highlight ? 'text-white' : 'text-[#005F73]'}`}>
                        {item.year}
                      </div>
                      <h3 className={`text-xl font-semibold mb-2 ${item.highlight ? 'text-white' : 'text-gray-800'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm ${item.highlight ? 'text-gray-100' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#00C9C9] rounded-full z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                To deliver innovative, sustainable water and wastewater engineering solutions 
                that enhance public health, protect the environment, and contribute to the 
                socio-economic development of communities across India and beyond.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#00C9C9] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Excellence in engineering design</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#00C9C9] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sustainable water management</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#00C9C9] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Community-focused solutions</span>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00C9C9] to-[#005F73] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                To be recognized as India&apos;s most trusted and innovative water engineering 
                consultancy, setting benchmarks in sustainable water infrastructure development 
                and becoming the partner of choice for transformative water projects globally.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#005F73] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Industry leadership by 2030</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#005F73] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pan-India presence</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#005F73] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Global project portfolio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Leadership
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
              Meet the Founder
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#00C9C9]/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#005F73]/10 rounded-full blur-2xl"></div>
              </div>

              {/* Content Side */}
              <div>
                <h3 className="text-3xl font-bold text-[#2C3E50] mb-2">Anil Kumar</h3>
                <p className="text-xl text-[#00C9C9] font-semibold mb-6">Founder & Principal Consultant</p>
                
                <div className="space-y-4 mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    With over three decades of distinguished experience in water engineering, 
                    Anil Kumar has been the driving force behind APASOL Consultants&apos; evolution 
                    into one of India&apos;s most trusted water infrastructure consultancies.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    His vision of creating sustainable water solutions that balance environmental 
                    stewardship with community needs has shaped every project undertaken by APASOL. 
                    Under his leadership, the company has successfully delivered over 100 projects 
                    worth ₹2000+ crores, impacting millions of lives across the nation.
                  </p>
                </div>

                {/* Expertise */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-[#2C3E50] mb-4">Core Expertise</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#00C9C9] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Water Treatment Design</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#00C9C9] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Project Management</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#00C9C9] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Strategic Planning</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#00C9C9] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Sustainable Solutions</span>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-gradient-to-r from-[#005F73]/5 to-[#00C9C9]/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#005F73] mb-3">Notable Achievements</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-[#00C9C9] mr-2">•</span>
                      Led design and implementation of water infrastructure serving over 5 million people
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C9C9] mr-2">•</span>
                      Pioneered adoption of smart water technologies in municipal projects
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C9C9] mr-2">•</span>
                      Recipient of &quot;Best Water Consultancy Firm&quot; award by IWWA (2020)
                    </li>
                  </ul>
                </div>

                {/* Quote */}
                <div className="mt-8 pl-6 border-l-4 border-[#00C9C9]">
                  <p className="text-gray-600 italic text-lg">
                    &quot;Every drop of water saved today secures a better tomorrow for our children. 
                    This philosophy drives our commitment to engineering solutions that are not 
                    just technically sound, but environmentally sustainable and socially responsible.&quot;
                  </p>
                  <p className="text-[#005F73] font-semibold mt-2">- Anil Kumar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Accreditations
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50]">
              Certified Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#005F73]/10 to-[#00C9C9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-[#005F73]">{cert.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm mb-1">{cert.issuer}</p>
                <p className="text-[#00C9C9] font-medium text-sm">Since {cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              What Drives Us
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50]">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Technical Excellence</h3>
              <p className="text-gray-600">
                Delivering world-class engineering solutions with precision and innovation
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00C9C9] to-[#005F73] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Sustainability First</h3>
              <p className="text-gray-600">
                Protecting our planet through eco-friendly water management practices
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Community Impact</h3>
              <p className="text-gray-600">
                Improving lives through accessible and reliable water infrastructure
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00C9C9] to-[#005F73] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Innovation Drive</h3>
              <p className="text-gray-600">
                Embracing cutting-edge technology for smarter water solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Water Infrastructure?</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Partner with us to create sustainable water solutions that make a lasting impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-[#005F73] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Project
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/sectors"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#005F73] transition-all"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}