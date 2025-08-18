import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2C3E50] text-white">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">APASOL</h3>
            <p className="text-gray-400 text-sm">
              Consultants & Engineers Pvt Ltd
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Engineering Water Solutions Since 2020
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/sectors" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
                  Sectors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Sectors</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sectors#drinking-water" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
                  Drinking Water Supply
                </Link>
              </li>
              <li>
                <Link href="/sectors#wastewater" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
                  Waste Water Treatment
                </Link>
              </li>
              <li>
                <Link href="/sectors#water-reuse" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
                  Water Re-Use
                </Link>
              </li>
              <li>
                <Link href="/sectors#storm-water" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
                  Storm Water Drainage
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>+91-9711999843</li>
              <li>info@apasolconsultants.com</li>
              <li>Wazir Nagar, New Delhi</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Apasol Consultants. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/careers" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
              Careers
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#00C9C9] transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}