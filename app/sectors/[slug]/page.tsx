import { notFound } from 'next/navigation';
import Header from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

interface SectorData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  services: {
    title: string;
    description: string;
    features: string[];
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  approach: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  color: 'municipal' | 'industrial' | 'environmental';
}

const sectorsData: Record<string, SectorData> = {
  'municipal-water': {
    id: 'municipal-water',
    title: 'Municipal Water Infrastructure',
    description: 'End-to-end water supply and sanitation solutions for urban communities',
    longDescription: 'We deliver comprehensive municipal water infrastructure solutions that ensure safe, reliable, and sustainable water services for cities and towns. Our expertise spans from source development to consumer connections, helping municipalities achieve water security while optimizing costs.',
    services: [
      {
        title: 'Water Treatment Plants',
        description: 'State-of-the-art treatment facilities ensuring safe drinking water',
        features: ['Conventional & advanced treatment', 'Membrane technologies', 'Automation & SCADA']
      },
      {
        title: 'Distribution Networks',
        description: 'Optimized pipeline systems for efficient water delivery',
        features: ['Hydraulic modeling', 'DMA implementation', '24x7 supply design']
      },
      {
        title: 'Smart Metering',
        description: 'Digital transformation for water management',
        features: ['AMR/AMI systems', 'Real-time monitoring', 'Consumer apps']
      },
      {
        title: 'NRW Management',
        description: 'Comprehensive water loss reduction programs',
        features: ['Leak detection', 'Pressure management', 'Water audits']
      }
    ],
    stats: [
      { value: '500+', label: 'Projects' },
      { value: '10M+', label: 'People Served' },
      { value: '2000', label: 'MLD Capacity' },
      { value: '30%', label: 'NRW Reduction' }
    ],
    approach: [
      { title: 'Assessment', description: 'Comprehensive evaluation of existing infrastructure and future needs' },
      { title: 'Design', description: 'Innovative engineering solutions tailored to local conditions' },
      { title: 'Implementation', description: 'Efficient project execution with quality assurance' },
      { title: 'Sustainability', description: 'Long-term operation and maintenance support' }
    ],
    benefits: [
      'Improved water quality and public health',
      'Reduced water losses and operational costs',
      'Enhanced service reliability and coverage',
      'Compliance with regulatory standards',
      'Future-ready infrastructure'
    ],
    color: 'municipal'
  },
  'wastewater-treatment': {
    id: 'wastewater-treatment',
    title: 'Wastewater Management',
    description: 'Comprehensive wastewater treatment and resource recovery solutions',
    longDescription: 'Our wastewater management solutions protect public health and the environment while maximizing resource recovery. We design and implement treatment systems that meet stringent discharge standards and enable water reuse, contributing to circular economy principles.',
    services: [
      {
        title: 'Sewage Treatment Plants',
        description: 'Advanced biological treatment for municipal wastewater',
        features: ['SBR & MBR technologies', 'Nutrient removal', 'Odor control systems']
      },
      {
        title: 'Industrial ETPs',
        description: 'Customized treatment for industrial effluents',
        features: ['Sector-specific solutions', 'Zero liquid discharge', 'Chemical recovery']
      },
      {
        title: 'Sludge Management',
        description: 'Sustainable biosolids handling and disposal',
        features: ['Digestion systems', 'Dewatering', 'Biogas generation']
      },
      {
        title: 'Water Reuse',
        description: 'Tertiary treatment for recycling applications',
        features: ['Ultrafiltration', 'UV disinfection', 'Quality monitoring']
      }
    ],
    stats: [
      { value: '300+', label: 'STPs Designed' },
      { value: '1500', label: 'MLD Treated' },
      { value: '80%', label: 'Water Recovery' },
      { value: '50MW', label: 'Biogas Power' }
    ],
    approach: [
      { title: 'Characterization', description: 'Detailed wastewater analysis and flow assessment' },
      { title: 'Technology Selection', description: 'Optimal treatment process based on requirements' },
      { title: 'Resource Recovery', description: 'Maximizing water, energy, and nutrient recovery' },
      { title: 'Compliance', description: 'Meeting and exceeding discharge standards' }
    ],
    benefits: [
      'Environmental protection and sustainability',
      'Resource recovery and circular economy',
      'Compliance with discharge norms',
      'Reduced freshwater demand through reuse',
      'Energy generation from waste'
    ],
    color: 'environmental'
  },
  'industrial-water': {
    id: 'industrial-water',
    title: 'Industrial Water Solutions',
    description: 'Customized water treatment systems for industrial applications',
    longDescription: 'We provide tailored water solutions for industries, ensuring process water quality, regulatory compliance, and operational efficiency. Our expertise covers diverse sectors including power, petrochemical, pharmaceutical, food & beverage, and manufacturing.',
    services: [
      {
        title: 'Process Water Treatment',
        description: 'High-purity water for industrial processes',
        features: ['Demineralization', 'RO systems', 'Ultrapure water']
      },
      {
        title: 'Zero Liquid Discharge',
        description: 'Complete wastewater recycling solutions',
        features: ['Evaporators', 'Crystallizers', 'Brine management']
      },
      {
        title: 'Cooling Water Systems',
        description: 'Efficient cooling tower water management',
        features: ['Chemical dosing', 'Blowdown treatment', 'Legionella control']
      },
      {
        title: 'Water Audits',
        description: 'Optimization of industrial water use',
        features: ['Water balance', 'Loss identification', 'Efficiency improvement']
      }
    ],
    stats: [
      { value: '200+', label: 'Industries' },
      { value: '500', label: 'MLD Capacity' },
      { value: '40%', label: 'Water Savings' },
      { value: '24/7', label: 'Support' }
    ],
    approach: [
      { title: 'Industry Analysis', description: 'Understanding specific process requirements' },
      { title: 'Custom Design', description: 'Tailored solutions for unique challenges' },
      { title: 'Integration', description: 'Seamless integration with existing systems' },
      { title: 'Optimization', description: 'Continuous improvement and efficiency gains' }
    ],
    benefits: [
      'Consistent process water quality',
      'Reduced operational costs',
      'Environmental compliance',
      'Minimized downtime',
      'Sustainable water management'
    ],
    color: 'industrial'
  },
  'rural-water': {
    id: 'rural-water',
    title: 'Rural Water Supply',
    description: 'Sustainable water solutions for rural and remote communities',
    longDescription: 'We bring safe drinking water to rural communities through appropriate, sustainable, and community-managed water supply systems. Our solutions are designed for local conditions, ensuring long-term functionality and community ownership.',
    services: [
      {
        title: 'Village Water Schemes',
        description: 'Complete water supply systems for rural habitations',
        features: ['Source development', 'Treatment units', 'Distribution networks']
      },
      {
        title: 'Hand Pumps & Borewells',
        description: 'Groundwater-based water supply solutions',
        features: ['Hydrogeological surveys', 'Borewell drilling', 'Pump installation']
      },
      {
        title: 'Rainwater Harvesting',
        description: 'Capturing and storing rainwater for use',
        features: ['Rooftop collection', 'Storage systems', 'Recharge structures']
      },
      {
        title: 'Solar Pumping',
        description: 'Renewable energy powered water supply',
        features: ['Solar panels', 'Submersible pumps', 'Remote monitoring']
      }
    ],
    stats: [
      { value: '1000+', label: 'Villages' },
      { value: '5M+', label: 'Beneficiaries' },
      { value: '100%', label: 'Sustainability' },
      { value: '90%', label: 'Coverage' }
    ],
    approach: [
      { title: 'Community Engagement', description: 'Participatory planning with local communities' },
      { title: 'Appropriate Technology', description: 'Solutions suited to local conditions' },
      { title: 'Capacity Building', description: 'Training for operation and maintenance' },
      { title: 'Monitoring', description: 'Regular assessment of system performance' }
    ],
    benefits: [
      'Improved health and quality of life',
      'Reduced water collection burden',
      'Community ownership and sustainability',
      'Climate-resilient water supply',
      'Economic development opportunities'
    ],
    color: 'municipal'
  },
  'stormwater': {
    id: 'stormwater',
    title: 'Stormwater Management',
    description: 'Integrated drainage and flood prevention solutions',
    longDescription: 'Our stormwater management solutions protect communities from flooding while enhancing groundwater recharge and water quality. We design resilient drainage systems that adapt to climate change and urbanization pressures.',
    services: [
      {
        title: 'Drainage Planning',
        description: 'Comprehensive urban drainage master plans',
        features: ['Hydrological studies', 'Network design', 'Flood mapping']
      },
      {
        title: 'Flood Modeling',
        description: 'Advanced simulation for flood risk assessment',
        features: ['2D modeling', 'Climate scenarios', 'Risk mapping']
      },
      {
        title: 'Green Infrastructure',
        description: 'Nature-based stormwater solutions',
        features: ['Rain gardens', 'Bioswales', 'Permeable pavements']
      },
      {
        title: 'Retention Systems',
        description: 'Storage and infiltration structures',
        features: ['Detention ponds', 'Underground tanks', 'Recharge wells']
      }
    ],
    stats: [
      { value: '100+', label: 'Cities' },
      { value: '5000km', label: 'Drains' },
      { value: '60%', label: 'Flood Reduction' },
      { value: '1B', label: 'Litres Recharged' }
    ],
    approach: [
      { title: 'Risk Assessment', description: 'Identifying flood-prone areas and vulnerabilities' },
      { title: 'Integrated Planning', description: 'Combining gray and green infrastructure' },
      { title: 'Climate Adaptation', description: 'Designing for future climate scenarios' },
      { title: 'Community Resilience', description: 'Building local capacity for flood management' }
    ],
    benefits: [
      'Reduced flood risk and damage',
      'Enhanced groundwater recharge',
      'Improved water quality',
      'Climate change adaptation',
      'Urban beautification'
    ],
    color: 'environmental'
  },
  'smart-water': {
    id: 'smart-water',
    title: 'Smart Water Systems',
    description: 'Digital transformation through IoT and AI-powered solutions',
    longDescription: 'We leverage cutting-edge technology to transform traditional water infrastructure into intelligent, efficient systems. Our smart water solutions enable real-time monitoring, predictive maintenance, and data-driven decision making.',
    services: [
      {
        title: 'SCADA Systems',
        description: 'Centralized control and automation',
        features: ['Remote monitoring', 'Process control', 'Alarm management']
      },
      {
        title: 'IoT Sensors',
        description: 'Real-time data collection across networks',
        features: ['Water quality sensors', 'Flow meters', 'Pressure monitors']
      },
      {
        title: 'Data Analytics',
        description: 'Insights from water system data',
        features: ['Dashboards', 'Trend analysis', 'Anomaly detection']
      },
      {
        title: 'Predictive Maintenance',
        description: 'AI-powered asset management',
        features: ['Failure prediction', 'Maintenance scheduling', 'Life cycle optimization']
      }
    ],
    stats: [
      { value: '50+', label: 'Smart Cities' },
      { value: '10K+', label: 'Sensors' },
      { value: '35%', label: 'Cost Reduction' },
      { value: '99.9%', label: 'Uptime' }
    ],
    approach: [
      { title: 'Digital Assessment', description: 'Evaluating digital maturity and opportunities' },
      { title: 'Technology Integration', description: 'Seamless integration of smart solutions' },
      { title: 'Data Management', description: 'Secure and efficient data handling' },
      { title: 'Continuous Innovation', description: 'Adopting emerging technologies' }
    ],
    benefits: [
      'Operational efficiency and cost savings',
      'Proactive issue resolution',
      'Improved service delivery',
      'Data-driven decision making',
      'Enhanced customer engagement'
    ],
    color: 'industrial'
  },
  'irrigation': {
    id: 'irrigation',
    title: 'Irrigation Systems',
    description: 'Efficient water management for agricultural productivity',
    longDescription: 'Our irrigation solutions maximize agricultural productivity while conserving water resources. We design systems that deliver water precisely where and when needed, supporting food security and farmer prosperity.',
    services: [
      {
        title: 'Drip Irrigation',
        description: 'Precision water delivery to crop roots',
        features: ['System design', 'Automation', 'Fertigation']
      },
      {
        title: 'Canal Systems',
        description: 'Gravity-fed irrigation networks',
        features: ['Canal lining', 'Control structures', 'Distribution systems']
      },
      {
        title: 'Pump Stations',
        description: 'Lift irrigation for higher elevations',
        features: ['Pump selection', 'Energy efficiency', 'Surge protection']
      },
      {
        title: 'Water Storage',
        description: 'Reservoirs and tanks for irrigation',
        features: ['Farm ponds', 'Check dams', 'Storage tanks']
      }
    ],
    stats: [
      { value: '100K', label: 'Hectares' },
      { value: '50%', label: 'Water Savings' },
      { value: '40%', label: 'Yield Increase' },
      { value: '10K+', label: 'Farmers' }
    ],
    approach: [
      { title: 'Crop Analysis', description: 'Understanding water requirements by crop type' },
      { title: 'System Design', description: 'Optimal irrigation method selection' },
      { title: 'Water Management', description: 'Efficient scheduling and distribution' },
      { title: 'Farmer Training', description: 'Capacity building for system operation' }
    ],
    benefits: [
      'Increased crop yields',
      'Water conservation',
      'Reduced labor costs',
      'Improved crop quality',
      'Climate resilience'
    ],
    color: 'environmental'
  },
  'water-treatment': {
    id: 'water-treatment',
    title: 'Water Treatment Plants',
    description: 'State-of-the-art treatment facilities for safe drinking water',
    longDescription: 'We design and build water treatment plants that transform raw water into safe, potable water meeting the highest quality standards. Our plants incorporate advanced treatment technologies and automation for reliable operation.',
    services: [
      {
        title: 'Conventional Treatment',
        description: 'Traditional multi-stage treatment process',
        features: ['Coagulation-flocculation', 'Sedimentation', 'Filtration', 'Disinfection']
      },
      {
        title: 'Membrane Systems',
        description: 'Advanced filtration technologies',
        features: ['Ultrafiltration', 'Nanofiltration', 'Reverse osmosis']
      },
      {
        title: 'Disinfection',
        description: 'Ensuring microbiologically safe water',
        features: ['Chlorination', 'UV treatment', 'Ozonation']
      },
      {
        title: 'Quality Monitoring',
        description: 'Continuous water quality assurance',
        features: ['Online analyzers', 'Laboratory testing', 'SCADA integration']
      }
    ],
    stats: [
      { value: '200+', label: 'WTPs' },
      { value: '3000', label: 'MLD Capacity' },
      { value: '100%', label: 'Compliance' },
      { value: '20M+', label: 'People Served' }
    ],
    approach: [
      { title: 'Water Characterization', description: 'Comprehensive raw water quality analysis' },
      { title: 'Process Selection', description: 'Optimal treatment train design' },
      { title: 'Pilot Testing', description: 'Validation of treatment effectiveness' },
      { title: 'Performance Guarantee', description: 'Ensuring treated water quality' }
    ],
    benefits: [
      'Safe drinking water supply',
      'Public health protection',
      'Regulatory compliance',
      'Operational efficiency',
      'Long-term reliability'
    ],
    color: 'municipal'
  },
  'desalination': {
    id: 'desalination',
    title: 'Desalination Plants',
    description: 'Advanced seawater and brackish water treatment solutions',
    longDescription: 'Our desalination solutions provide freshwater from seawater and brackish sources, addressing water scarcity in coastal and arid regions. We implement energy-efficient technologies that minimize environmental impact while ensuring reliable water supply.',
    services: [
      {
        title: 'Reverse Osmosis',
        description: 'Membrane-based desalination technology',
        features: ['High recovery RO', 'Energy recovery devices', 'Membrane management']
      },
      {
        title: 'Thermal Desalination',
        description: 'Distillation-based treatment processes',
        features: ['Multi-stage flash', 'Multi-effect distillation', 'Vapor compression']
      },
      {
        title: 'Brine Management',
        description: 'Sustainable concentrate disposal',
        features: ['Brine treatment', 'Zero liquid discharge', 'Resource recovery']
      },
      {
        title: 'Energy Recovery',
        description: 'Minimizing energy consumption',
        features: ['Pressure exchangers', 'Turbines', 'Renewable integration']
      }
    ],
    stats: [
      { value: '50+', label: 'Plants' },
      { value: '500', label: 'MLD Capacity' },
      { value: '45%', label: 'Energy Savings' },
      { value: '5M+', label: 'People Served' }
    ],
    approach: [
      { title: 'Feasibility Study', description: 'Technical and economic viability assessment' },
      { title: 'Technology Selection', description: 'Optimal desalination method choice' },
      { title: 'Environmental Assessment', description: 'Impact evaluation and mitigation' },
      { title: 'Energy Optimization', description: 'Minimizing operational costs' }
    ],
    benefits: [
      'Drought-proof water supply',
      'Independence from rainfall',
      'Consistent water quality',
      'Scalable capacity',
      'Climate change resilience'
    ],
    color: 'industrial'
  }
};

export default async function SectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = sectorsData[slug];

  if (!sector) {
    notFound();
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'municipal':
        return {
          bg: 'bg-[#0057FF]',
          bgLight: 'bg-[#0057FF]/10',
          text: 'text-[#0057FF]',
          border: 'border-[#0057FF]'
        };
      case 'industrial':
        return {
          bg: 'bg-[#26AFFF]',
          bgLight: 'bg-[#26AFFF]/10',
          text: 'text-[#26AFFF]',
          border: 'border-[#26AFFF]'
        };
      case 'environmental':
        return {
          bg: 'bg-[#0088cc]',
          bgLight: 'bg-[#0088cc]/10',
          text: 'text-[#0088cc]',
          border: 'border-[#0088cc]'
        };
      default:
        return {
          bg: 'bg-[#0057FF]',
          bgLight: 'bg-[#0057FF]/10',
          text: 'text-[#0057FF]',
          border: 'border-[#0057FF]'
        };
    }
  };

  const colors = getColorClasses(sector.color);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="secondary"
        badge={sector.color.charAt(0).toUpperCase() + sector.color.slice(1) + ' Sector'}
        title={sector.title}
        description={sector.description}
      />

      {/* Key Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {sector.stats.map((stat, idx) => (
              <div key={idx} className="text-center relative">
                <p className={`text-4xl font-bold text-[#2C3E50] mb-2`}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </p>
                {/* Divider - show on larger screens, not after last item */}
                {idx < sector.stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
                )}
                {/* Mobile divider - only show after first item in each row */}
                {idx === 1 && (
                  <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
                Comprehensive Solutions for {sector.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {sector.longDescription}
              </p>

              {/* Benefits List */}
              <div className="space-y-3">
                {sector.benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className={`w-5 h-5 ${colors.text} mr-3 mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#0057FF]/25 via-[#007A8F]/25 to-[#26AFFF]/25"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
              Our Services & Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specialized expertise tailored to your sector needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sector.services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center text-sm text-gray-700">
                      <svg className={`w-4 h-4 ${colors.text} mr-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
              Our Proven Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A systematic methodology that delivers results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sector.approach.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                  <div className={`absolute -top-3 -left-3 w-8 h-8 ${colors.bg} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3E50] mb-3 mt-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
                Why Partner With Apasol
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className={`w-6 h-6 ${colors.text} mr-4 mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-1">Proven Expertise</h3>
                    <p className="text-gray-600 text-sm">Decades of experience delivering successful projects in this sector</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className={`w-6 h-6 ${colors.text} mr-4 mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-1">Innovation-Driven</h3>
                    <p className="text-gray-600 text-sm">Latest technologies and best practices for optimal solutions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className={`w-6 h-6 ${colors.text} mr-4 mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-1">End-to-End Support</h3>
                    <p className="text-gray-600 text-sm">From planning to operations, we&apos;re with you at every step</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className={`w-6 h-6 ${colors.text} mr-4 mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-1">Sustainability Focus</h3>
                    <p className="text-gray-600 text-sm">Environmental and social responsibility at the core of our solutions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-6">Key Benefits</h3>
              <div className="space-y-3">
                {sector.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`w-2 h-2 ${colors.bg} rounded-full mr-3`}></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title={`Ready to Transform Your ${sector.title}?`}
            description="Let&apos;s discuss how our expertise can address your specific challenges"
            primaryButtonText="Get Started"
            primaryButtonHref="/contact"
            secondaryButtonText="View Projects"
            secondaryButtonHref="/projects"
          />
        </div>
      </section>

      <FooterWrapper />
    </div>
  );
}