'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  projectSize: string;
  message: string;
  consent: boolean;
}

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  details: string[];
  action?: {
    label: string;
    href: string;
  };
}

interface FAQ {
  question: string;
  answer: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectSize: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [activeTab, setActiveTab] = useState<'general' | 'technical' | 'business'>('general');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const contactMethods: ContactMethod[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      details: [
        'Main: +91-9711999843',
        'Alt: +91-11-26846288'
      ],
      action: {
        label: 'Call Now',
        href: 'tel:+919711999843'
      }
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      details: [
        'info@apasolconsultants.com',
        'projects@apasolconsultants.com'
      ],
      action: {
        label: 'Send Email',
        href: 'mailto:info@apasolconsultants.com'
      }
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
      title: 'WhatsApp',
      details: [
        'Quick response',
        '9 AM - 6 PM IST'
      ],
      action: {
        label: 'Chat Now',
        href: 'https://wa.me/919711999843'
      }
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Office',
      details: [
        'Wazir Nagar, New Delhi',
        'India - 110003'
      ]
    }
  ];

  const departmentContacts = {
    general: {
      title: 'General Inquiries',
      email: 'info@apasolconsultants.com',
      phone: '+91-9711999843',
      description: 'For general questions about our services and company'
    },
    technical: {
      title: 'Technical Department',
      email: 'technical@apasolconsultants.com',
      phone: '+91-9711999843',
      description: 'For technical specifications and engineering queries'
    },
    business: {
      title: 'Business Development',
      email: 'business@apasolconsultants.com',
      phone: '+91-9711999843',
      description: 'For partnerships, tenders, and commercial discussions'
    }
  };

  const faqs: FAQ[] = [
    {
      question: 'What is the typical timeline for a water treatment plant project?',
      answer: 'Project timelines vary based on capacity and complexity. Typically, a medium-scale WTP (20-50 MLD) takes 18-24 months from design to commissioning.'
    },
    {
      question: 'Do you provide operation and maintenance services?',
      answer: 'Yes, we offer comprehensive O&M services including training, annual maintenance contracts, and performance optimization consultancy.'
    },
    {
      question: 'What geographic areas do you serve?',
      answer: 'We operate across India with projects in 8+ states. We also undertake international projects in South Asia and Africa.'
    },
    {
      question: 'How do I get a quotation for my project?',
      answer: 'Fill out our contact form with project details or email us at projects@apasolconsultants.com. We typically respond within 24-48 hours.'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
    if (!formData.projectType) newErrors.projectType = 'Please select a project type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.consent) newErrors.consent = 'Please agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, integrate with email service like EmailJS, Formspree, or custom backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        projectSize: '',
        message: '',
        consent: false
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#005F73] to-[#00C9C9]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Get in Touch
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Let&apos;s Discuss Your Water Infrastructure Project
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Connect with our experts to explore innovative solutions for your water 
              and wastewater challenges. We&apos;re here to help you build sustainable infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">Get in Touch</h2>
            <p className="text-gray-600">We&apos;re available through multiple channels</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
                {contactMethods.map((method, index) => (
                  <div key={index} className="p-8 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#00C9C9]/10 rounded-full mb-4 mx-auto text-[#00C9C9]">
                      {method.icon}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-[#2C3E50] text-center mb-3">
                      {method.title}
                    </h3>
                    
                    <div className="space-y-1 text-center mb-4">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                    
                    {method.action && (
                      <div className="text-center">
                        <a
                          href={method.action.href}
                          className="inline-flex items-center text-[#00C9C9] hover:text-[#005F73] font-medium text-sm transition-colors"
                        >
                          {method.action.label}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Alternative minimal layout option - uncomment if preferred */}
            {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#005F73]/5 to-[#00C9C9]/5 rounded-full mb-4">
                    <div className="text-[#005F73]">
                      {React.cloneElement(method.icon as React.ReactElement, { className: "w-6 h-6" })}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-[#2C3E50] mb-3">{method.title}</h3>
                  
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                      {detail}
                    </p>
                  ))}
                  
                  {method.action && (
                    <a
                      href={method.action.href}
                      className="inline-block mt-4 text-[#00C9C9] hover:text-[#005F73] font-medium text-sm transition-colors"
                    >
                      {method.action.label} →
                    </a>
                  )}
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">Contact Our Departments</h2>
            <p className="text-gray-600">Connect with the right team for your specific needs</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {Object.entries(departmentContacts).map(([key, dept]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as keyof typeof departmentContacts)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === key
                      ? 'bg-[#005F73] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {dept.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">
                  {departmentContacts[activeTab].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {departmentContacts[activeTab].description}
                </p>
                <div className="space-y-3">
                  <a
                    href={`mailto:${departmentContacts[activeTab].email}`}
                    className="inline-flex items-center text-[#00C9C9] hover:text-[#005F73] font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {departmentContacts[activeTab].email}
                  </a>
                  <br />
                  <a
                    href={`tel:${departmentContacts[activeTab].phone}`}
                    className="inline-flex items-center text-[#00C9C9] hover:text-[#005F73] font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {departmentContacts[activeTab].phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within 24-48 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-[#00C9C9] focus:border-transparent transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-[#00C9C9] focus:border-transparent transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-[#00C9C9] focus:border-transparent transition-all`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C9C9] focus:border-transparent transition-all"
                      placeholder="ABC Corporation"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <div className="relative">
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 pr-12 rounded-xl border-2 appearance-none bg-white cursor-pointer shadow-sm ${
                          errors.projectType ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-[#00C9C9]/30 focus:border-[#00C9C9]'
                        } focus:outline-none focus:ring-4 focus:ring-[#00C9C9]/20 transition-all duration-200 text-gray-700 bg-gradient-to-r hover:from-gray-50 hover:to-white`}
                      >
                        <option value="">Select project type</option>
                        <option value="water-treatment">Water Treatment Plant</option>
                        <option value="sewage-treatment">Sewage Treatment Plant</option>
                        <option value="distribution">Distribution Network</option>
                        <option value="stormwater">Stormwater Management</option>
                        <option value="consultancy">Consultancy Services</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                        <div className="bg-gradient-to-br from-[#005F73]/5 to-[#00C9C9]/5 rounded-lg p-2 border border-[#00C9C9]/20">
                          <svg className="h-4 w-4 text-[#00C9C9] transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {errors.projectType && (
                      <p className="mt-1 text-sm text-red-500">{errors.projectType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Size
                    </label>
                    <div className="relative">
                      <select
                        name="projectSize"
                        value={formData.projectSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-gray-200 appearance-none bg-white cursor-pointer shadow-sm hover:border-[#00C9C9]/30 focus:border-[#00C9C9] focus:outline-none focus:ring-4 focus:ring-[#00C9C9]/20 transition-all duration-200 text-gray-700 bg-gradient-to-r hover:from-gray-50 hover:to-white"
                      >
                        <option value="">Select project size</option>
                        <option value="small">Small (&lt; 10 MLD)</option>
                        <option value="medium">Medium (10-50 MLD)</option>
                        <option value="large">Large (50-100 MLD)</option>
                        <option value="very-large">Very Large (&gt; 100 MLD)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                        <div className="bg-gradient-to-br from-[#005F73]/5 to-[#00C9C9]/5 rounded-lg p-2 border border-[#00C9C9]/20">
                          <svg className="h-4 w-4 text-[#00C9C9] transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#00C9C9] focus:border-transparent transition-all`}
                    placeholder="Please describe your project requirements, timeline, and any specific challenges..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="mt-1 mr-3 w-4 h-4 rounded border-gray-300 text-[#00C9C9] focus:ring-[#00C9C9] focus:ring-2"
                      style={{ accentColor: '#00C9C9' }}
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the privacy policy and consent to APASOL Consultants contacting 
                      me about my inquiry. *
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-sm text-red-500 ml-7">{errors.consent}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#005F73] to-[#00C9C9] hover:shadow-lg transform hover:-translate-y-0.5 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-800 font-medium">
                      Thank you for your message! We&apos;ll get back to you within 24-48 hours.
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-800 font-medium">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-[400px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.7371831739!2d77.2346!3d28.6377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM4JzE1LjciTiA3N8KwMTQnMDQuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4">
                  <p className="font-semibold text-[#2C3E50]">APASOL Consultants</p>
                  <p className="text-sm text-gray-600">Wazir Nagar, New Delhi</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00C9C9] text-sm font-medium hover:text-[#005F73] mt-1 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
                <p className="mt-6 text-sm opacity-90">
                  * For urgent matters, please contact us via WhatsApp or emergency hotline
                </p>
              </div>

              {/* Download Resources */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Helpful Resources</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#005F73] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-gray-700">Company Profile (PDF)</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#00C9C9] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#005F73] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-gray-700">Service Brochure</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#00C9C9] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and process
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm">
            {faqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full py-5 px-6 flex items-center text-left hover:bg-gray-50 transition-colors duration-200 group focus:outline-none focus:bg-gray-50"
                  >
                    <div className="mr-4 flex-shrink-0">
                      <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}>
                        {isExpanded ? (
                          <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <h3 className="text-base font-medium text-gray-800 group-hover:text-[#005F73] transition-colors">
                      {faq.question}
                    </h3>
                  </button>
                  <div 
                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                    style={{
                      maxHeight: isExpanded ? '300px' : '0'
                    }}
                  >
                    <div className="px-6 pl-16 pb-5">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Have more questions?{' '}
              <a href="mailto:info@apasolconsultants.com" className="text-[#00C9C9] hover:text-[#005F73] font-medium">
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}