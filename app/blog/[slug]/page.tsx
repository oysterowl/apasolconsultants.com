'use server';

import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import CTASection from '@/components/CTASection';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import type { SiteInfo } from '@/types/siteInfo';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content?: React.ReactNode;
}

// Custom content components for better control
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-16 first:mt-0">
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl lg:text-3xl font-bold text-[#0057FF] mb-5 mt-12">
    {children}
  </h3>
);

const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-xl lg:text-2xl font-semibold text-[#007A8F] mb-4 mt-10">
    {children}
  </h4>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-gray-700 leading-[1.8] mb-6">
    {children}
  </p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc list-outside pl-6 mb-8 space-y-3">
    {children}
  </ul>
);

const OL = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal list-outside pl-6 mb-8 space-y-3">
    {children}
  </ol>
);

const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="text-lg text-gray-700 leading-[1.8]">
    {children}
  </li>
);

const Blockquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="relative my-12 pl-8 pr-8 py-8 bg-gradient-to-r from-[#0057FF]/5 to-transparent rounded-2xl border-l-4 border-[#26AFFF]">
    <p className="text-xl lg:text-2xl text-[#2C3E50] leading-relaxed font-medium italic">
      {children}
    </p>
  </blockquote>
);

const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-gray-900">{children}</strong>
);

const blogPosts: BlogPost[] = [
  {
    id: 'advancing-water-security-through-smart-infrastructure',
    title: 'Advancing Water Security Through Smart Infrastructure',
    excerpt: 'Exploring how IoT and AI technologies are revolutionizing water management systems across urban and rural communities.',
    category: 'Innovation',
    author: 'Dr. Rajesh Kumar',
    authorRole: 'Chief Technology Officer',
    date: 'March 15, 2024',
    readTime: '5 min read',
    image: '/blog/smart-water.jpg',
    featured: true,
    content: (
      <>
        <H2>The Digital Transformation of Water Infrastructure</H2>
        <P>
          Water security has become one of the most pressing challenges of our time. As populations grow and climate patterns shift, traditional water management approaches are proving insufficient. Smart infrastructure powered by IoT (Internet of Things) and AI technologies offers a transformative solution.
        </P>

        <H3>Real-Time Monitoring and Control</H3>
        <P>
          Modern smart water systems deploy thousands of sensors throughout the distribution network, continuously monitoring pressure, flow rates, quality parameters, and consumption patterns. This real-time data enables unprecedented visibility into system performance and immediate response to anomalies.
        </P>

        <Blockquote>
          Smart water infrastructure isn&apos;t just about technology—it&apos;s about creating resilient systems that can adapt to changing conditions while ensuring equitable access to clean water for all.
        </Blockquote>

        <H3>Predictive Analytics for Proactive Management</H3>
        <P>
          Machine learning algorithms analyze historical data patterns to predict equipment failures, optimize maintenance schedules, and forecast demand. This proactive approach reduces downtime, extends asset life, and improves overall system reliability.
        </P>

        <H3>Case Study: Smart Water Grid Implementation</H3>
        <P>
          In partnership with the Gujarat Water Supply and Sewerage Board, we implemented a comprehensive smart water management system serving over 2 million residents. Key outcomes included:
        </P>

        <UL>
          <LI><Strong>35% reduction</Strong> in water loss through leak detection</LI>
          <LI><Strong>40% improvement</Strong> in response time to service disruptions</LI>
          <LI><Strong>25% increase</Strong> in operational efficiency</LI>
          <LI><Strong>Real-time water quality monitoring</Strong> at 500+ points</LI>
        </UL>

        <H3>The Future of Water Security</H3>
        <P>
          As we move forward, the integration of blockchain for water rights management, advanced AI for climate adaptation, and satellite imagery for watershed monitoring will further enhance our ability to ensure water security for future generations.
        </P>
      </>
    )
  },
  {
    id: 'sustainable-wastewater-treatment-case-study-maharashtra',
    title: 'Sustainable Wastewater Treatment: A Case Study from Maharashtra',
    excerpt: 'How we designed and implemented a zero-discharge wastewater treatment plant serving 50,000 residents.',
    category: 'Case Studies',
    author: 'Priya Sharma',
    authorRole: 'Senior Project Manager',
    date: 'March 10, 2024',
    readTime: '8 min read',
    image: '/blog/wastewater-case.jpg',
    featured: true,
    content: (
      <>
        <H2>Project Overview</H2>
        <P>
          The Maharashtra Urban Development Project presented unique challenges: treating wastewater for 50,000 residents while achieving zero liquid discharge and creating a model for sustainable water management across India.
        </P>

        <H3>Technical Challenges</H3>
        <P>
          The project faced several critical challenges that required innovative engineering solutions:
        </P>

        <UL>
          <LI>High organic load variations throughout the day</LI>
          <LI>Strict environmental regulations requiring zero discharge</LI>
          <LI>Limited land availability for conventional treatment systems</LI>
          <LI>Need for energy-efficient operations</LI>
          <LI>Community acceptance and odor control</LI>
        </UL>

        <H3>Innovative Design Solutions</H3>
        <P>
          Our team developed a multi-stage treatment approach combining biological and advanced treatment technologies:
        </P>

        <H4>Primary Treatment</H4>
        <P>
          Advanced screening and grit removal systems designed for high-efficiency solids separation while minimizing energy consumption.
        </P>

        <H4>Secondary Treatment</H4>
        <P>
          Moving Bed Biofilm Reactor (MBBR) technology chosen for its compact footprint and ability to handle load variations effectively.
        </P>

        <H4>Tertiary Treatment</H4>
        <P>
          Membrane bioreactor (MBR) system ensuring consistent effluent quality suitable for reuse applications.
        </P>

        <H4>Advanced Treatment</H4>
        <P>
          Reverse osmosis and advanced oxidation processes for achieving zero liquid discharge standards.
        </P>

        <Blockquote>
          This project demonstrates that sustainable wastewater treatment isn&apos;t just possible—it&apos;s economically viable and environmentally necessary.
        </Blockquote>

        <H3>Results and Impact</H3>
        <P>
          The project achieved remarkable results that exceeded initial expectations:
        </P>

        <UL>
          <LI><Strong>100% wastewater treatment</Strong> with zero liquid discharge</LI>
          <LI><Strong>70% energy recovery</Strong> through biogas generation</LI>
          <LI><Strong>2.5 MLD treated water</Strong> available for industrial reuse</LI>
          <LI><Strong>95% reduction</Strong> in groundwater contamination risk</LI>
          <LI><Strong>45 permanent jobs</Strong> created</LI>
        </UL>

        <H3>Lessons Learned</H3>
        <P>
          This project reinforced several key principles for successful wastewater treatment implementation:
        </P>

        <UL>
          <LI>Community engagement is critical from project conception</LI>
          <LI>Modular design allows for future capacity expansion</LI>
          <LI>Integration with renewable energy sources enhances sustainability</LI>
          <LI>Regular monitoring and adaptive management ensure long-term success</LI>
        </UL>
      </>
    )
  },
  {
    id: 'future-of-rural-water-supply-india',
    title: 'The Future of Rural Water Supply in India',
    excerpt: 'Examining challenges and opportunities in providing sustainable water solutions to rural communities.',
    category: 'Industry News',
    author: 'Arun Patel',
    authorRole: 'Rural Development Lead',
    date: 'March 5, 2024',
    readTime: '6 min read',
    image: '/blog/rural-water.jpg',
    content: (
      <>
        <H2>Current State of Rural Water Supply</H2>
        <P>
          India&apos;s rural water supply sector has undergone significant transformation over the past decade. The Jal Jeevan Mission&apos;s ambitious goal of providing tap water connections to every rural household by 2024 has accelerated infrastructure development across the country.
        </P>

        <H3>Key Challenges</H3>
        <P>
          Despite significant progress, rural water supply systems face persistent challenges:
        </P>

        <UL>
          <LI>Groundwater depletion in over-exploited regions</LI>
          <LI>Quality issues including fluoride, arsenic, and salinity</LI>
          <LI>Operational sustainability of water supply schemes</LI>
          <LI>Climate change impacts on water availability</LI>
          <LI>Limited technical capacity at the village level</LI>
        </UL>

        <H3>Innovative Solutions</H3>
        <P>
          Emerging technologies and approaches are addressing these challenges:
        </P>

        <H4>Decentralized Treatment Systems</H4>
        <P>
          Solar-powered reverse osmosis plants and community-scale treatment facilities are making safe water accessible in remote areas.
        </P>

        <H4>Smart Water Management</H4>
        <P>
          IoT-enabled monitoring systems help track water quality, system performance, and usage patterns in real-time.
        </P>

        <H4>Community-Based Management</H4>
        <P>
          Strengthening village water and sanitation committees through training and capacity building ensures long-term sustainability.
        </P>

        <Blockquote>
          The future of rural water supply lies in combining technological innovation with strong community ownership and sustainable financing models.
        </Blockquote>

        <H3>Success Stories</H3>
        <P>
          Several states have demonstrated remarkable success in rural water supply transformation:
        </P>

        <UL>
          <LI><Strong>Goa:</Strong> First state to achieve 100% tap water coverage</LI>
          <LI><Strong>Telangana:</Strong> Innovative bulk water supply through Mission Bhagiratha</LI>
          <LI><Strong>Gujarat:</Strong> Successful water grid connecting multiple sources</LI>
          <LI><Strong>Himachal Pradesh:</Strong> Sustainable mountain water supply systems</LI>
        </UL>

        <H3>Future Opportunities</H3>
        <P>
          The next decade presents significant opportunities for advancing rural water security:
        </P>

        <UL>
          <LI>Integration of renewable energy with water supply systems</LI>
          <LI>Advanced water quality monitoring and treatment technologies</LI>
          <LI>Digital platforms for improved service delivery</LI>
          <LI>Climate-resilient infrastructure development</LI>
          <LI>Public-private partnerships for sustainable financing</LI>
        </UL>
      </>
    )
  },
  {
    id: 'understanding-nrw-reducing-water-loss-distribution-networks',
    title: 'Understanding NRW: Reducing Water Loss in Distribution Networks',
    excerpt: 'Technical guide to identifying and addressing Non-Revenue Water in municipal water systems.',
    category: 'Technical',
    author: 'Eng. Vikram Singh',
    authorRole: 'Principal Engineer',
    date: 'February 28, 2024',
    readTime: '10 min read',
    image: '/blog/nrw-technical.jpg',
    content: (
      <>
        <H2>What is Non-Revenue Water?</H2>
        <P>
          Non-Revenue Water (NRW) represents the difference between the amount of water put into a distribution system and the amount of water billed to customers. In India, NRW levels often exceed 40%, representing a significant economic and environmental loss.
        </P>

        <H3>Components of NRW</H3>
        <P>
          NRW consists of two main categories:
        </P>

        <H4>Physical Losses (Real Losses)</H4>
        <UL>
          <LI>Leakage on transmission and distribution mains</LI>
          <LI>Leakage on service connections up to customer meters</LI>
          <LI>Storage tank overflows</LI>
        </UL>

        <H4>Commercial Losses (Apparent Losses)</H4>
        <UL>
          <LI>Unauthorized consumption</LI>
          <LI>Customer meter inaccuracies</LI>
          <LI>Data handling errors</LI>
          <LI>Billing irregularities</LI>
        </UL>

        <H3>Technical Strategies for NRW Reduction</H3>

        <H4>1. Pressure Management</H4>
        <P>
          Implementing pressure reducing valves and establishing District Metered Areas (DMAs) to optimize system pressure and reduce leak rates.
        </P>

        <H4>2. Active Leak Detection</H4>
        <P>
          Systematic programs using acoustic sensors, correlators, and ground-penetrating radar to identify and locate leaks before they become visible.
        </P>

        <H4>3. Asset Management</H4>
        <P>
          Risk-based pipe replacement programs focusing on aging infrastructure and pipes with high failure rates.
        </P>

        <Blockquote>
          Effective NRW management requires a systematic approach combining technology, skilled personnel, and sustained commitment from utility management.
        </Blockquote>

        <H3>Case Study: DMA Implementation</H3>
        <P>
          In a recent project with Pune Municipal Corporation, we established 15 District Metered Areas covering 200,000 connections:
        </P>

        <UL>
          <LI><Strong>Baseline NRW:</Strong> 45%</LI>
          <LI><Strong>Target NRW:</Strong> 20%</LI>
          <LI><Strong>Achieved NRW:</Strong> 18% within 18 months</LI>
          <LI><Strong>Water saved:</Strong> 25 MLD</LI>
          <LI><Strong>Annual savings:</Strong> ₹15 crores</LI>
        </UL>

        <H3>Technology Solutions</H3>

        <H4>Smart Water Meters</H4>
        <P>
          AMR/AMI systems provide real-time consumption data and enable rapid detection of abnormal usage patterns.
        </P>

        <H4>SCADA Integration</H4>
        <P>
          Centralized monitoring systems track flow, pressure, and quality parameters across the distribution network.
        </P>

        <H4>GIS Mapping</H4>
        <P>
          Digital mapping of infrastructure assets enables better planning and faster response to network issues.
        </P>

        <H3>Implementation Framework</H3>
        <P>
          Successful NRW reduction programs follow a structured approach:
        </P>

        <OL>
          <LI><Strong>Baseline Assessment:</Strong> Comprehensive water audit and NRW quantification</LI>
          <LI><Strong>Infrastructure Mapping:</Strong> GIS-based asset inventory and condition assessment</LI>
          <LI><Strong>DMA Establishment:</Strong> Network sectorization and metering installation</LI>
          <LI><Strong>Leak Detection:</Strong> Systematic survey and repair programs</LI>
          <LI><Strong>Pressure Management:</Strong> Installation of control valves and optimization</LI>
          <LI><Strong>Performance Monitoring:</Strong> Continuous tracking and improvement</LI>
        </OL>

        <H3>Economic Benefits</H3>
        <P>
          NRW reduction delivers substantial economic benefits:
        </P>

        <UL>
          <LI>Reduced raw water abstraction costs</LI>
          <LI>Lower treatment and pumping costs</LI>
          <LI>Deferred capital investment in new sources</LI>
          <LI>Improved customer satisfaction and revenue</LI>
          <LI>Enhanced system reliability</LI>
        </UL>
      </>
    )
  },
  {
    id: 'green-infrastructure-stormwater-management',
    title: 'Green Infrastructure for Stormwater Management',
    excerpt: 'Nature-based solutions that combine flood protection with urban beautification and ecosystem services.',
    category: 'Sustainability',
    author: 'Dr. Meera Nair',
    authorRole: 'Sustainability Director',
    date: 'February 20, 2024',
    readTime: '7 min read',
    image: '/blog/green-infra.jpg',
    content: (
      <>
        <H2>The Need for Green Infrastructure</H2>
        <P>
          Rapid urbanization has transformed natural landscapes into impervious surfaces, disrupting the natural water cycle and creating significant stormwater management challenges. Green infrastructure offers a sustainable alternative to traditional gray infrastructure systems.
        </P>

        <H3>Benefits of Green Infrastructure</H3>
        <P>
          Green infrastructure systems provide multiple benefits beyond stormwater management:
        </P>

        <UL>
          <LI><Strong>Water Quality Improvement:</Strong> Natural filtration removes pollutants</LI>
          <LI><Strong>Flood Risk Reduction:</Strong> Reduces peak flows and volumes</LI>
          <LI><Strong>Urban Heat Island Mitigation:</Strong> Cooling through evapotranspiration</LI>
          <LI><Strong>Air Quality Enhancement:</Strong> Vegetation filters air pollutants</LI>
          <LI><Strong>Biodiversity Support:</Strong> Creates habitat for urban wildlife</LI>
          <LI><Strong>Carbon Sequestration:</Strong> Plants absorb atmospheric CO2</LI>
        </UL>

        <H3>Types of Green Infrastructure</H3>

        <H4>Bioretention Systems</H4>
        <P>
          Engineered landscapes that capture, treat, and infiltrate stormwater runoff through specially designed soil media and plant systems.
        </P>

        <H4>Permeable Pavements</H4>
        <P>
          Allow water to pass through surface materials, reducing runoff while maintaining functionality for pedestrians and vehicles.
        </P>

        <H4>Green Roofs</H4>
        <P>
          Vegetated roof systems that absorb rainfall, provide insulation, and create additional green space in dense urban areas.
        </P>

        <H4>Constructed Wetlands</H4>
        <P>
          Engineered systems that mimic natural wetland processes for treating stormwater and wastewater while providing habitat.
        </P>

        <Blockquote>
          Green infrastructure doesn&apos;t just manage water—it transforms cities into more livable, resilient, and sustainable environments.
        </Blockquote>

        <H3>Design Considerations</H3>
        <P>
          Successful green infrastructure implementation requires careful consideration of multiple factors:
        </P>

        <H4>Site Conditions</H4>
        <UL>
          <LI>Soil types and infiltration rates</LI>
          <LI>Topography and drainage patterns</LI>
          <LI>Groundwater levels and contamination</LI>
          <LI>Available space and land use constraints</LI>
        </UL>

        <H4>Performance Objectives</H4>
        <UL>
          <LI>Volume reduction targets</LI>
          <LI>Peak flow control requirements</LI>
          <LI>Water quality improvement goals</LI>
          <LI>Maintenance and lifecycle considerations</LI>
        </UL>

        <H3>Case Study: Bangalore Lake District</H3>
        <P>
          Our recent project in Bangalore implemented comprehensive green infrastructure across 500 hectares of mixed-use development:
        </P>

        <UL>
          <LI><Strong>150 bioretention gardens</Strong> treating roadway runoff</LI>
          <LI><Strong>25 hectares of permeable pavements</Strong> in parking and pedestrian areas</LI>
          <LI><Strong>10 constructed wetlands</Strong> for community-scale treatment</LI>
          <LI><Strong>200 green roofs</Strong> on residential and commercial buildings</LI>
        </UL>

        <H4>Measured Results</H4>
        <UL>
          <LI>60% reduction in stormwater runoff volume</LI>
          <LI>75% reduction in peak flow rates</LI>
          <LI>80% removal of suspended solids</LI>
          <LI>4°C average temperature reduction in summer</LI>
          <LI>40% increase in local biodiversity</LI>
        </UL>

        <H3>Maintenance and Operations</H3>
        <P>
          Long-term success of green infrastructure requires proper maintenance:
        </P>

        <H4>Routine Maintenance</H4>
        <UL>
          <LI>Vegetation care and replacement</LI>
          <LI>Debris removal and system cleaning</LI>
          <LI>Irrigation during establishment period</LI>
          <LI>Regular inspection and minor repairs</LI>
        </UL>

        <H4>Performance Monitoring</H4>
        <UL>
          <LI>Flow and water quality monitoring</LI>
          <LI>Plant health assessments</LI>
          <LI>Infiltration rate testing</LI>
          <LI>System capacity evaluations</LI>
        </UL>

        <H3>Policy and Implementation</H3>
        <P>
          Successful green infrastructure adoption requires supportive policy frameworks:
        </P>

        <UL>
          <LI>Stormwater management regulations favoring green solutions</LI>
          <LI>Development incentives for green infrastructure implementation</LI>
          <LI>Public-private partnerships for financing and maintenance</LI>
          <LI>Technical guidelines and design standards</LI>
          <LI>Training programs for design and maintenance professionals</LI>
        </UL>
      </>
    )
  },
  {
    id: 'membrane-technology-water-treatment-latest-advances',
    title: 'Membrane Technology in Water Treatment: Latest Advances',
    excerpt: 'Review of cutting-edge membrane technologies and their applications in water and wastewater treatment.',
    category: 'Technical',
    author: 'Dr. Suresh Reddy',
    authorRole: 'Research Director',
    date: 'February 15, 2024',
    readTime: '12 min read',
    image: '/blog/membrane-tech.jpg',
    content: (
      <>
        <H2>Evolution of Membrane Technology</H2>
        <P>
          Membrane technology has revolutionized water treatment, offering precise separation processes that can remove contaminants ranging from suspended solids to dissolved salts and even viruses and bacteria. Recent advances have made these technologies more efficient, cost-effective, and sustainable.
        </P>

        <H3>Types of Membrane Processes</H3>

        <H4>Microfiltration (MF)</H4>
        <P>
          Removes particles larger than 0.1 microns, including bacteria, suspended solids, and some viruses. Commonly used for pretreatment and clarification.
        </P>

        <H4>Ultrafiltration (UF)</H4>
        <P>
          Removes particles and macromolecules larger than 0.01 microns, including all bacteria, most viruses, and colloids. Excellent for surface water treatment.
        </P>

        <H4>Nanofiltration (NF)</H4>
        <P>
          Removes divalent ions, organic molecules larger than 200 Daltons, and provides some monovalent ion rejection. Ideal for water softening and color removal.
        </P>

        <H4>Reverse Osmosis (RO)</H4>
        <P>
          Removes almost all dissolved solids, producing high-quality water from brackish or seawater sources.
        </P>

        <H3>Recent Technological Advances</H3>

        <H4>Advanced Membrane Materials</H4>
        <P>
          New polymer chemistries and surface modifications have improved membrane performance:
        </P>

        <UL>
          <LI><Strong>Thin Film Nanocomposite (TFN) membranes:</Strong> Incorporating nanoparticles for enhanced permeability and selectivity</LI>
          <LI><Strong>Biomimetic membranes:</Strong> Inspired by natural biological membranes</LI>
          <LI><Strong>Mixed matrix membranes:</Strong> Combining polymeric and inorganic materials</LI>
          <LI><Strong>Graphene-based membranes:</Strong> Ultra-thin layers with exceptional separation properties</LI>
        </UL>

        <Blockquote>
          The next generation of membrane technologies will blur the lines between physical and chemical treatment processes, offering unprecedented efficiency and selectivity.
        </Blockquote>

        <H4>Smart Membrane Systems</H4>
        <P>
          Integration of sensors and automation technologies enables:
        </P>

        <UL>
          <LI>Real-time performance monitoring</LI>
          <LI>Predictive maintenance scheduling</LI>
          <LI>Automated cleaning protocols</LI>
          <LI>Energy optimization algorithms</LI>
        </UL>

        <H3>Application Areas</H3>

        <H4>Municipal Water Treatment</H4>
        <P>
          Membrane bioreactors (MBR) combine biological treatment with membrane separation, producing high-quality effluent suitable for reuse applications.
        </P>

        <H4>Industrial Water Treatment</H4>
        <P>
          Customized membrane systems address specific industrial requirements:
        </P>

        <UL>
          <LI>Pharmaceutical manufacturing: Ultra-pure water production</LI>
          <LI>Food and beverage: Concentration and purification processes</LI>
          <LI>Electronics: High-resistivity water for semiconductor manufacturing</LI>
          <LI>Power generation: Boiler feedwater treatment</LI>
        </UL>

        <H4>Desalination</H4>
        <P>
          Advanced RO systems with energy recovery devices make seawater desalination increasingly viable for water-stressed regions.
        </P>

        <H3>Case Study: Advanced MBR Implementation</H3>
        <P>
          Recent implementation of next-generation MBR technology at a 50 MLD municipal wastewater treatment plant:
        </P>

        <H4>System Configuration</H4>
        <UL>
          <LI>Anaerobic-anoxic-oxic biological treatment</LI>
          <LI>Submerged hollow fiber UF membranes</LI>
          <LI>Advanced process control systems</LI>
          <LI>Energy recovery from biogas</LI>
        </UL>

        <H4>Performance Results</H4>
        <UL>
          <LI><Strong>Effluent Quality:</Strong> Consistently below 5 mg/L BOD, 2 NTU turbidity</LI>
          <LI><Strong>Energy Consumption:</Strong> 0.35 kWh/m³ (30% reduction from conventional)</LI>
          <LI><Strong>Footprint:</Strong> 60% smaller than conventional activated sludge</LI>
          <LI><Strong>Membrane Life:</Strong> Greater than 5 years with proper maintenance</LI>
        </UL>

        <H3>Challenges and Solutions</H3>

        <H4>Membrane Fouling</H4>
        <P>
          The primary operational challenge, addressed through:
        </P>

        <UL>
          <LI>Advanced pretreatment systems</LI>
          <LI>Anti-fouling membrane coatings</LI>
          <LI>Optimized cleaning protocols</LI>
          <LI>Real-time fouling monitoring</LI>
        </UL>

        <H4>Energy Consumption</H4>
        <P>
          Minimized through:
        </P>

        <UL>
          <LI>High-permeability membrane materials</LI>
          <LI>Energy recovery devices</LI>
          <LI>Variable frequency drives</LI>
          <LI>Process optimization algorithms</LI>
        </UL>

        <H3>Future Directions</H3>

        <H4>Emerging Technologies</H4>
        <P>
          Several breakthrough technologies are approaching commercial viability:
        </P>

        <UL>
          <LI><Strong>Forward Osmosis:</Strong> Low-energy separation using osmotic gradients</LI>
          <LI><Strong>Membrane Distillation:</Strong> Thermal-driven process for high-salinity waters</LI>
          <LI><Strong>Electrochemical Membranes:</Strong> Combining separation with oxidation/reduction</LI>
          <LI><Strong>AI-Optimized Operations:</Strong> Machine learning for predictive control</LI>
        </UL>

        <H4>Sustainability Focus</H4>
        <P>
          Future developments emphasize:
        </P>

        <UL>
          <LI>Biodegradable membrane materials</LI>
          <LI>Circular economy approaches to membrane recycling</LI>
          <LI>Integration with renewable energy sources</LI>
          <LI>Minimal chemical usage cleaning protocols</LI>
        </UL>

        <H3>Economic Considerations</H3>
        <P>
          Total cost of ownership analysis should consider:
        </P>

        <UL>
          <LI><Strong>Capital costs:</Strong> Membrane modules, housing, pumps, controls</LI>
          <LI><Strong>Operating costs:</Strong> Energy, chemicals, membrane replacement</LI>
          <LI><Strong>Maintenance costs:</Strong> Cleaning, monitoring, labor</LI>
          <LI><Strong>Value benefits:</Strong> Water quality, reliability, footprint savings</LI>
        </UL>

        <P>
          Modern membrane systems typically show positive ROI within 5-7 years when properly designed and operated.
        </P>
      </>
    )
  }
];

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      {/* Progress Bar placeholder (client progress handled elsewhere) */}
      <div className="fixed top-24 left-0 right-0 h-1 bg-gray-200/30 z-40" />

      {/* Breadcrumb Navigation */}
      <nav className="pt-32 pb-6 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <ul className="flex items-center gap-1 text-sm">
            <li>
              <Link href="/" className="relative text-gray-600 hover:text-gray-900 transition-colors py-1 px-2 group">
                Home
                <span className="absolute bottom-0 left-2 right-2 h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/blog" className="relative text-gray-600 hover:text-gray-900 transition-colors py-1 px-2 group">
                Blog
                <span className="absolute bottom-0 left-2 right-2 h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link
                href={`/blog?category=${post.category.toLowerCase().replace(' ', '-')}`}
                className="relative text-gray-900 font-medium py-1 px-2 group"
              >
                {post.category}
                <span className="absolute bottom-0 left-2 right-2 h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Top Meta Info - Centered Grid Layout */}
          <div className="flex justify-center mb-8">
            <div className="inline-grid grid-cols-[auto_auto_auto] gap-2.5 items-center">
              <span className="text-[#0057FF] font-medium">
                {post.category}
              </span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-600">{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-6 text-center">
            {post.title}
          </h1>

          {/* Subtitle/Excerpt */}
          <h2 className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 text-center">
            {post.excerpt}
          </h2>

          {/* Author & Date */}
          <div className="text-sm text-gray-600 mb-8 text-center">
            By <span className="font-medium text-gray-900">{post.author}</span>
            <span className="mx-2">·</span>
            <span>{post.date}</span>
          </div>

          {/* Social Share Icons */}
          <div className="flex items-center justify-center gap-3 pb-8">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://apasolconsultants.com/blog/' + slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group transition-all"
              aria-label="Share on Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="fill-gray-400 group-hover:fill-[#3b5998] transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.40365 18.6274 0 12 0C5.37258 0 0 5.40365 0 12.073C0 18.0988 4.38823 23.0935 10.125 24V15.563H7.07812V12.073H10.125V9.41343C10.125 6.38755 11.9165 4.71615 14.6576 4.71615C15.9705 4.71615 17.3438 4.95195 17.3438 4.95195V7.92313H15.8306C14.3399 7.92313 13.875 8.85379 13.875 9.80857V12.073H17.2031L16.6711 15.563H13.875V24C19.6118 23.0935 24 18.0988 24 12.073Z"/>
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://apasolconsultants.com/blog/' + slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group transition-all"
              aria-label="Share on LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" className="fill-gray-400 group-hover:fill-[#0976b4] transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20 20H15.5797V12.1046C15.5797 10.3869 14.8883 9.21444 13.3679 9.21444C12.2048 9.21444 11.5581 10.0057 11.2571 10.7683C11.1441 11.042 11.1618 11.4233 11.1618 11.8046V20H6.78267C6.78267 20 6.83913 7.04259 6.78267 5.98596H11.1618V7.97612C11.4205 7.10593 12.8199 5.86404 14.9863 5.86404C17.8234 5.86404 20 7.68807 20 11.6157V20ZM2.35418 4.39982H2.32597C0.915203 4.39982 0 3.43045 0 2.20169C0 0.949047 0.941907 0 2.38123 0C3.81937 0 4.70367 0.946666 4.73188 2.19813C4.73188 3.42688 3.81937 4.39982 2.35418 4.39982ZM0.504455 5.98596H4.40263V20H0.504455V5.98596Z"/>
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://apasolconsultants.com/blog/' + slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group transition-all"
              aria-label="Share on X"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" className="fill-gray-400 group-hover:fill-black transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9456 0.25H13.0456L8.41561 5.51L13.7956 13.25H9.52561L6.19561 8.73L2.40561 13.25H0.30561L5.23561 7.64L0.0556102 0.25H4.43561L7.46561 4.43L10.9456 0.25ZM10.0656 11.95H11.1456L3.84561 1.48H2.68561L10.0656 11.95Z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-[#0057FF] via-[#007A8F] to-[#26AFFF]">
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Featured Image Placeholder */}
          <div className="relative h-[320px] lg:h-[420px] bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-3xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Article Content */}
          <main>
            <article className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
              {post.content}
            </article>
          </main>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500">Enjoyed this article?</p>
                <p className="text-lg font-semibold text-gray-900">Share it with your network</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://apasolconsultants.com/blog/' + slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors font-semibold"
                >
                  Share on Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://apasolconsultants.com/blog/' + slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors font-semibold"
                >
                  Share on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-6 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="w-full h-px bg-gray-300"></div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-10 bg-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#2C3E50]">Related Articles</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group block"
                >
                  <article className="space-y-6">
                    {/* Image */}
                    <div className="relative h-64 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-[#26AFFF] uppercase tracking-wide mb-2">
                          {relatedPost.category}
                        </p>
                        <h3 className="text-xl font-bold text-[#2C3E50] group-hover:text-[#0057FF] transition-colors duration-300 leading-tight">
                          {relatedPost.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Implement These Solutions?"
            description="Let's discuss how our expertise can help you achieve similar results in your water infrastructure projects."
            primaryButtonText="Start a Conversation"
            primaryButtonHref="/contact"
          />
        </div>
      </section>

      <FooterWrapper />
    </div>
  );
}
