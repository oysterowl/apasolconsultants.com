'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

interface SectorCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

function SectorCard({ id, title, description, features, icon, color }: SectorCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div id={id} className={`mb-16 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
        <div className="p-8">
          <div className="flex items-start mb-6">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mr-6`}
                 style={{ backgroundColor: `${color}20` }}>
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SectorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-32 pb-12 px-6 lg:px-12 bg-gradient-to-br from-[#005F73] to-[#00C9C9]">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Our Sectors
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Comprehensive water engineering solutions across multiple sectors, 
              delivering sustainable infrastructure for communities and industries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <SectorCard
            id="drinking-water"
            title="Drinking Water Supply"
            description="End-to-end solutions for clean drinking water supply systems, from source to tap. We design and optimize water treatment plants, distribution networks, and storage facilities to ensure safe and reliable water supply."
            features={[
              "Water Treatment Plant Design (WTP)",
              "Distribution Network Optimization",
              "Pumping Station Design",
              "Storage Reservoir Engineering",
              "SCADA & Automation Systems",
              "Water Quality Monitoring",
              "Source Development & Protection",
              "24x7 Water Supply Systems"
            ]}
            icon={
              <svg className="w-8 h-8 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
            color="#3498DB"
          />

          <SectorCard
            id="wastewater"
            title="Waste Water Collection & Treatment"
            description="Comprehensive wastewater management solutions including collection systems, treatment plants, and disposal systems. We focus on efficient, sustainable treatment processes that meet environmental standards."
            features={[
              "Sewage Treatment Plant Design (STP)",
              "Collection Network Design",
              "Pumping & Lifting Stations",
              "Industrial Effluent Treatment",
              "Biological Treatment Systems",
              "Advanced Treatment Technologies",
              "Sludge Management Systems",
              "Odor Control Solutions"
            ]}
            icon={
              <svg className="w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            }
            color="#00C9C9"
          />

          <SectorCard
            id="water-reuse"
            title="Waste Water Re-Use"
            description="Innovative water recycling and reuse solutions that promote sustainability and water conservation. We design systems that treat wastewater to standards suitable for various non-potable applications."
            features={[
              "Tertiary Treatment Systems",
              "Water Reclamation Plants",
              "Industrial Water Recycling",
              "Irrigation Water Recovery",
              "Grey Water Treatment",
              "Zero Liquid Discharge Systems",
              "Membrane Bioreactor (MBR) Systems",
              "Water Reuse Distribution Networks"
            ]}
            icon={
              <svg className="w-8 h-8 text-[#27AE60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
            color="#27AE60"
          />

          <SectorCard
            id="storm-water"
            title="Storm Water Drainage"
            description="Comprehensive stormwater management solutions to prevent flooding and protect communities. We design efficient drainage systems that manage runoff while promoting groundwater recharge and water quality."
            features={[
              "Drainage Network Design",
              "Flood Modeling & Analysis",
              "Sustainable Drainage Systems (SuDS)",
              "Rainwater Harvesting Systems",
              "Detention & Retention Ponds",
              "Storm Water Pumping Stations",
              "Green Infrastructure Solutions",
              "Hydraulic & Hydrological Studies"
            ]}
            icon={
              <svg className="w-8 h-8 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            }
            color="#005F73"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}