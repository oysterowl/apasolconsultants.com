'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';

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
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [progress, setProgress] = useState(0);
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
      year: '2019'
    },
    {
      name: 'ISO 14001:2015',
      issuer: 'Environmental Management',
      year: '2020'
    },
    {
      name: 'ISO 45001:2018',
      issuer: 'Safety Management Systems',
      year: '2021'
    },
    {
      name: 'CPCB Approved',
      issuer: 'Central Pollution Control Board',
      year: '2018'
    },
    {
      name: 'IWWA Member',
      issuer: 'Indian Water Works Association',
      year: '2017'
    },
    {
      name: 'NABL Accredited',
      issuer: 'National Accreditation Board',
      year: '2020'
    }
  ];

  // Auto-rotate certifications every 4 seconds with progress
  useEffect(() => {
    const duration = 4000; // 4 seconds
    const fps = 60; // Target 60 FPS for smooth animation
    const updateInterval = 1000 / fps; // ~16.67ms per frame
    const increment = 100 / (duration / updateInterval); // Progress increment per frame

    // Use requestAnimationFrame for smoother animation
    let animationFrame: number;
    let lastTime = Date.now();
    let currentProgress = 0;

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;

      if (deltaTime >= updateInterval) {
        currentProgress += increment * (deltaTime / updateInterval);

        if (currentProgress >= 100) {
          currentProgress = 0;
          setCurrentCertIndex((prev) => (prev + 1) % certifications.length);
        }

        setProgress(currentProgress);
        lastTime = now;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [certifications.length]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="primary"
        badge="Since 2016"
        title="Engineering Water Solutions for a Sustainable Future"
        description="APASOL - Aqua Pollution & Solution Consultants, pioneering innovative water and wastewater engineering solutions across India."
      />

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              See the impact we&apos;ve made
            </h2>
            <p className="text-gray-600 text-lg">
              Over 8 years of transforming water infrastructure across India
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden">
            {/* Projects Completed */}
            <div className="bg-white p-8 text-center">
              <div className="text-5xl lg:text-6xl font-bold text-[#005F73] mb-2 flex items-center justify-center">
                <CountUp end={100} duration={2500} />
                <span className="text-3xl lg:text-4xl ml-1">+</span>
              </div>
              <p className="text-gray-700 font-medium text-lg">Projects</p>
              <p className="text-gray-500 text-sm mt-1">Completed</p>
            </div>

            {/* Treatment Capacity */}
            <div className="bg-white p-8 text-center">
              <div className="text-5xl lg:text-6xl font-bold text-[#005F73] mb-2 flex items-center justify-center">
                <CountUp end={500} duration={2500} />
                <span className="text-3xl lg:text-4xl ml-1">MLD</span>
              </div>
              <p className="text-gray-700 font-medium text-lg">Treatment</p>
              <p className="text-gray-500 text-sm mt-1">Capacity</p>
            </div>

            {/* Lives Impacted */}
            <div className="bg-white p-8 text-center">
              <div className="text-5xl lg:text-6xl font-bold text-[#005F73] mb-2 flex items-center justify-center">
                <CountUp end={10} duration={2500} />
                <span className="text-3xl lg:text-4xl ml-1">M+</span>
              </div>
              <p className="text-gray-700 font-medium text-lg">Lives</p>
              <p className="text-gray-500 text-sm mt-1">Impacted</p>
            </div>

            {/* States Covered */}
            <div className="bg-white p-8 text-center">
              <div className="text-5xl lg:text-6xl font-bold text-[#005F73] mb-2 flex items-center justify-center">
                <CountUp end={8} duration={2500} />
                <span className="text-3xl lg:text-4xl ml-1">+</span>
              </div>
              <p className="text-gray-700 font-medium text-lg">States</p>
              <p className="text-gray-500 text-sm mt-1">Covered</p>
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

                <div className="bg-[#00C9C9]/5 rounded-xl p-6 border border-[#00C9C9]/20">
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
                <Button href="/projects" variant="secondary">
                  View Our Projects
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl">
              </div>
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

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="absolute left-8 w-4 h-4 -translate-x-1/2 bg-white border-2 border-[#00C9C9] rounded-full mt-2"></div>

                    {/* Content */}
                    <div className="ml-20">
                      <div className={`p-6 rounded-xl border ${
                        item.highlight
                          ? 'border-[#00C9C9] bg-[#00C9C9]/5'
                          : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex items-baseline mb-3">
                          <span className={`text-2xl font-bold ${
                            item.highlight ? 'text-[#00C9C9]' : 'text-[#005F73]'
                          }`}>
                            {item.year}
                          </span>
                          <span className="mx-3 text-gray-300">•</span>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-10">
              <div className="w-16 h-16 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-10">
              <div className="w-16 h-16 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-10">
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
                <div className="bg-[#00C9C9]/5 rounded-xl p-6 border border-[#00C9C9]/20">
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

          {/* Certification Carousel */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Current Certification */}
              <div className="bg-white border border-gray-200 rounded-2xl px-12 py-10 shadow-lg">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-[#005F73] mb-3">
                    {certifications[currentCertIndex].name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {certifications[currentCertIndex].issuer}
                  </p>
                  <span className="inline-block px-4 py-2 bg-[#00C9C9]/10 text-[#00C9C9] rounded-full text-sm font-semibold uppercase tracking-wide">
                    Certified {certifications[currentCertIndex].year}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentCertIndex((prev) => (prev - 1 + certifications.length) % certifications.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label="Previous certification"
              >
                <svg className="w-5 h-5 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentCertIndex((prev) => (prev + 1) % certifications.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label="Next certification"
              >
                <svg className="w-5 h-5 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator with Progress */}
            <div className="flex justify-center mt-8 gap-2">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCertIndex(index);
                    setProgress(0);
                  }}
                  className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                    index === currentCertIndex
                      ? 'w-10 h-2.5 bg-gray-300'
                      : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to certification ${index + 1}`}
                >
                  {index === currentCertIndex && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#005F73] to-[#00C9C9] origin-left"
                      style={{
                        transform: `scaleX(${progress / 100})`,
                        transition: 'none',
                        willChange: 'transform'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Additional certifications note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Committed to maintaining the highest standards of quality and compliance in water infrastructure consulting
            </p>
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
            <div className="text-center">
              <div className="w-24 h-24 bg-[#00C9C9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#00C9C9]" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15 6v-2h-2.6l0.6-2.8-2-0.4-0.7 3.2h-3l0.7-2.8-2-0.4-0.7 3.2h-3.3v2h2.9l-0.9 4h-3v2h2.6l-0.6 2.8 2 0.4 0.7-3.2h3l-0.7 2.8 2 0.4 0.7-3.2h3.3v-2h-2.9l0.9-4h3zM9 10h-3l1-4h3l-1 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Technical Excellence</h3>
              <p className="text-gray-600">
                Delivering world-class engineering solutions with precision and innovation
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-[#005F73]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#005F73]" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15 6v-2h-2.6l0.6-2.8-2-0.4-0.7 3.2h-3l0.7-2.8-2-0.4-0.7 3.2h-3.3v2h2.9l-0.9 4h-3v2h2.6l-0.6 2.8 2 0.4 0.7-3.2h3l-0.7 2.8 2 0.4 0.7-3.2h3.3v-2h-2.9l0.9-4h3zM9 10h-3l1-4h3l-1 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Sustainability First</h3>
              <p className="text-gray-600">
                Protecting our planet through eco-friendly water management practices
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-[#00C9C9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#00C9C9]" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15 6v-2h-2.6l0.6-2.8-2-0.4-0.7 3.2h-3l0.7-2.8-2-0.4-0.7 3.2h-3.3v2h2.9l-0.9 4h-3v2h2.6l-0.6 2.8 2 0.4 0.7-3.2h3l-0.7 2.8 2 0.4 0.7-3.2h3.3v-2h-2.9l0.9-4h3zM9 10h-3l1-4h3l-1 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Community Impact</h3>
              <p className="text-gray-600">
                Improving lives through accessible and reliable water infrastructure
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-[#005F73]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#005F73]" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15 6v-2h-2.6l0.6-2.8-2-0.4-0.7 3.2h-3l0.7-2.8-2-0.4-0.7 3.2h-3.3v2h2.9l-0.9 4h-3v2h2.6l-0.6 2.8 2 0.4 0.7-3.2h3l-0.7 2.8 2 0.4 0.7-3.2h3.3v-2h-2.9l0.9-4h3zM9 10h-3l1-4h3l-1 4z"/>
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
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Transform Your Water Infrastructure?"
            description="Partner with us to create sustainable water solutions that make a lasting impact"
            primaryButtonText="Start a Project"
            primaryButtonHref="/contact"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}