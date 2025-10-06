'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
import type { SiteInfo } from '@/types/siteInfo';

interface ContactMethod {
  icon: React.ReactNode;
  title: string | undefined;
  details: (string | undefined)[];
  action?: {
    label: string | undefined;
    href: string;
  };
}


interface ContactInfoProps {
  heading: string;
  description: string;
  phoneSection: {
    title: string;
    description: string;
    buttonText: string;
  };
  emailSection: {
    title: string;
    description: string;
    buttonText: string;
  };
  addressSection: {
    title: string;
    description: string;
    buttonText: string;
  };
}

interface DepartmentsProps {
  heading: string;
  description: string;
  items: Array<{
    name: string;
    description: string;
    email: string;
    phone?: string;
    icon?: string;
  }>;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required: boolean;
  order?: number;
  options?: Array<{
    label: string;
    value: string;
  }>;
}

interface ContactFormProps {
  heading: string;
  description: string;
  formFields?: FormField[];
  consentText: string;
  consentRequired: boolean;
  submitButton: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
}

interface CTAProps {
  heading: string;
  description: string;
  primaryButton: {
    text: string;
    action: 'email' | 'phone' | 'custom';
    customLink?: string;
  };
  secondaryButton: {
    text: string;
    action: 'email' | 'phone' | 'custom';
    customLink?: string;
  };
}

interface MapSectionProps {
  embedUrl?: string;
}

interface ResourcesProps {
  heading: string;
  resource1?: {
    title?: string;
    description?: string;
    file?: unknown;
  };
  resource2?: {
    title?: string;
    description?: string;
    file?: unknown;
  };
}

interface FaqProps {
  heading: string;
  description: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

interface ContactPageContentProps {
  contactInfo?: ContactInfoProps;
  departments?: DepartmentsProps;
  contactForm?: ContactFormProps;
  mapSection?: MapSectionProps;
  resources?: ResourcesProps;
  faq?: FaqProps;
  cta?: CTAProps;
  siteInfo: SiteInfo | null;
}

export default function ContactPageContent({
  contactInfo,
  departments,
  contactForm,
  mapSection,
  resources,
  faq,
  cta,
  siteInfo
}: ContactPageContentProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<number>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Build dynamic contact methods from CMS data
  const contactMethods: ContactMethod[] = [];

  // Phone card
  if (siteInfo?.contact?.phone) {
    contactMethods.push({
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: contactInfo?.phoneSection?.title,
      details: [
        siteInfo.contact.phone,
        contactInfo?.phoneSection?.description
      ],
      action: {
        label: contactInfo?.phoneSection?.buttonText,
        href: `tel:${siteInfo.contact.phone.replace(/\D/g, '')}`
      }
    });
  }

  // Email card
  if (siteInfo?.contact?.email) {
    contactMethods.push({
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: contactInfo?.emailSection?.title,
      details: [
        siteInfo.contact.email,
        contactInfo?.emailSection?.description
      ],
      action: {
        label: contactInfo?.emailSection?.buttonText,
        href: `mailto:${siteInfo.contact.email}`
      }
    });
  }

  // WhatsApp card
  if (siteInfo?.contact?.whatsapp) {
    contactMethods.push({
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
        href: `https://wa.me/${siteInfo.contact.whatsapp}`
      }
    });
  }

  // Office/Address card
  if (siteInfo?.address) {
    const addressLine = `${siteInfo.address.line1}${siteInfo.address.line2 ? `, ${siteInfo.address.line2}` : ''}`;
    const cityState = `${siteInfo.address.city}, ${siteInfo.address.state}`;
    const countryPin = `${siteInfo.address.country} - ${siteInfo.address.pincode}`;

    contactMethods.push({
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: contactInfo?.addressSection?.title,
      details: [
        addressLine,
        cityState,
        countryPin
      ].filter(Boolean),
      action: siteInfo.address.mapLink ? {
        label: contactInfo?.addressSection?.buttonText,
        href: siteInfo.address.mapLink
      } : undefined
    });
  }


  // Helper function to get autocomplete attribute
  const getAutocomplete = (fieldName: string): string => {
    const autocompleteMap: Record<string, string> = {
      'fullName': 'name',
      'name': 'name',
      'email': 'email',
      'phone': 'tel',
      'company': 'organization',
      'projectType': 'off',
      'projectSize': 'off',
      'projectDetails': 'off'
    };
    return autocompleteMap[fieldName] || 'off';
  };

  // Helper function to get full file URL
  const getFileUrl = (file: unknown): string => {
    if (!file) return '#';
    const fileUrl = typeof file === 'object' && file !== null && 'url' in file ? (file as { url: string }).url : String(file);
    // If URL is relative, prepend CMS URL
    if (fileUrl && fileUrl.startsWith('/')) {
      return `${process.env.NEXT_PUBLIC_CMS_URL}${fileUrl}`;
    }
    return fileUrl || '#';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate dynamic form fields
    contactForm?.formFields?.forEach(field => {
      if (field.required) {
        const value = formData[field.name];
        if (!value || !value.trim()) {
          newErrors[field.name] = `${field.label} is required`;
        } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors[field.name] = 'Invalid email format';
        } else if (field.type === 'tel' && !/^[0-9]{10}$/.test(value.replace(/\D/g, ''))) {
          newErrors[field.name] = 'Invalid phone number';
        }
      }
    });

    // Validate consent if required
    if (contactForm?.consentRequired && !consent) {
      newErrors.consent = 'Please agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', { ...formData, consent });

      setSubmitStatus('success');
      setFormData({});
      setConsent(false);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsent(e.target.checked);
    if (errors.consent) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.consent;
        return newErrors;
      });
    }
  };

  return (
    <>
      {/* Quick Contact Cards */}
      <section className="py-20 bg-gradient-to-br from-white via-[#26AFFF]/5 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6">
              {contactInfo?.heading}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {contactInfo?.description}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-[#26AFFF]/20 overflow-hidden">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-x divide-[#26AFFF]/10">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="p-8 hover:bg-gradient-to-br hover:from-[#26AFFF]/10 hover:to-transparent transition-all duration-300 cursor-pointer group relative"
                    onClick={() => { if (method.action) window.location.href = method.action.href; }}
                  >
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#26AFFF]/20 to-[#26AFFF]/5 rounded-2xl mb-4 mx-auto text-[#26AFFF] group-hover:shadow-lg group-hover:shadow-[#26AFFF]/20 transition-all duration-300">
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
                          className="inline-flex items-center text-[#26AFFF] hover:text-[#0057FF] font-semibold text-sm transition-all hover:gap-2 gap-1"
                        >
                          {method.action.label}
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      {departments && departments.items && departments.items.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6">{departments.heading}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{departments.description}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {departments.items.map((dept, index) => (
                  <Button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    variant={activeTab === index ? 'primary' : 'secondary'}
                    size="md"
                  >
                    {dept.name}
                  </Button>
                ))}
              </div>

              <div className="bg-gradient-to-br from-white to-[#26AFFF]/5 rounded-3xl shadow-xl border border-[#26AFFF]/20 p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">
                    {departments.items[activeTab].name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {departments.items[activeTab].description}
                  </p>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${departments.items[activeTab].email}`}
                      className="inline-flex items-center text-[#26AFFF] hover:text-[#0057FF] font-medium"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {departments.items[activeTab].email}
                    </a>
                    {departments.items[activeTab].phone && (
                      <>
                        <br />
                        <a
                          href={`tel:${departments.items[activeTab].phone}`}
                          className="inline-flex items-center text-[#26AFFF] hover:text-[#0057FF] font-medium"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {departments.items[activeTab].phone}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#26AFFF]/5 via-white to-[#26AFFF]/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6">{contactForm?.heading}</h2>
              <p className="text-lg text-gray-600 mb-8">
                {contactForm?.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dynamic form fields */}
                {(() => {
                  const fields = contactForm?.formFields || [];
                  const elements: React.ReactNode[] = [];
                  let i = 0;

                  while (i < fields.length) {
                    const currentField = fields[i];
                    const nextField = fields[i + 1];

                    // If current field is textarea, render full width
                    if (currentField.type === 'textarea') {
                      const fieldValue = formData[currentField.name] || '';
                      const hasError = !!errors[currentField.name];

                      elements.push(
                        <div key={currentField.name}>
                          <label htmlFor={currentField.name} className="block text-sm font-medium text-gray-700 mb-2">
                            {currentField.label}{currentField.required && ' *'}
                          </label>
                          <textarea
                            id={currentField.name}
                            name={currentField.name}
                            value={fieldValue}
                            onChange={handleInputChange}
                            rows={5}
                            placeholder={currentField.placeholder}
                            autoComplete="off"
                            className={`w-full px-4 py-3 rounded-xl border-2 ${
                              hasError ? 'border-red-500' : 'border-gray-200 focus:border-[#26AFFF]'
                            } focus:outline-none focus:ring-4 focus:ring-[#26AFFF]/20 transition-all bg-white/50 backdrop-blur-sm`}
                          />
                          {hasError && (
                            <p className="mt-1 text-sm text-red-500">{errors[currentField.name]}</p>
                          )}
                        </div>
                      );
                      i++;
                    }
                    // If next field exists and is not textarea, pair them in 2-column grid
                    else if (nextField && nextField.type !== 'textarea') {
                      elements.push(
                        <div key={`grid-${i}`} className="grid md:grid-cols-2 gap-6">
                          {/* Current Field */}
                          {(() => {
                            const fieldValue = formData[currentField.name] || '';
                            const hasError = !!errors[currentField.name];

                            if (currentField.type === 'select') {
                              return (
                                <div>
                                  <label htmlFor={currentField.name} className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentField.label}{currentField.required && ' *'}
                                  </label>
                                  <div className="relative">
                                    <select
                                      id={currentField.name}
                                      name={currentField.name}
                                      value={fieldValue}
                                      onChange={handleInputChange}
                                      autoComplete="off"
                                      className={`w-full px-4 py-3.5 pr-12 rounded-xl border-2 appearance-none bg-white cursor-pointer shadow-sm ${
                                        hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-[#26AFFF]/30 focus:border-[#26AFFF]'
                                      } focus:outline-none focus:ring-4 focus:ring-[#26AFFF]/20 transition-all duration-200 text-gray-700 bg-gradient-to-r hover:from-gray-50 hover:to-white`}
                                    >
                                      <option value="">{currentField.placeholder}</option>
                                      {currentField.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                      <div className="bg-gradient-to-br from-[#26AFFF]/10 to-[#26AFFF]/5 rounded-lg p-2 shadow-sm">
                                        <svg className="h-4 w-4 text-[#26AFFF] transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  {hasError && (
                                    <p className="mt-1 text-sm text-red-500">{errors[currentField.name]}</p>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <div>
                                <label htmlFor={currentField.name} className="block text-sm font-medium text-gray-700 mb-2">
                                  {currentField.label}{currentField.required && ' *'}
                                </label>
                                <input
                                  type={currentField.type}
                                  id={currentField.name}
                                  name={currentField.name}
                                  value={fieldValue}
                                  onChange={handleInputChange}
                                  placeholder={currentField.placeholder}
                                  autoComplete={getAutocomplete(currentField.name)}
                                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                                    hasError ? 'border-red-500' : 'border-gray-200 focus:border-[#26AFFF]'
                                  } focus:outline-none focus:ring-4 focus:ring-[#26AFFF]/20 transition-all bg-white/50 backdrop-blur-sm`}
                                />
                                {hasError && (
                                  <p className="mt-1 text-sm text-red-500">{errors[currentField.name]}</p>
                                )}
                              </div>
                            );
                          })()}

                          {/* Next Field */}
                          {(() => {
                            const fieldValue = formData[nextField.name] || '';
                            const hasError = !!errors[nextField.name];

                            if (nextField.type === 'select') {
                              return (
                                <div>
                                  <label htmlFor={nextField.name} className="block text-sm font-medium text-gray-700 mb-2">
                                    {nextField.label}{nextField.required && ' *'}
                                  </label>
                                  <div className="relative">
                                    <select
                                      id={nextField.name}
                                      name={nextField.name}
                                      value={fieldValue}
                                      onChange={handleInputChange}
                                      autoComplete="off"
                                      className={`w-full px-4 py-3.5 pr-12 rounded-xl border-2 appearance-none bg-white cursor-pointer shadow-sm ${
                                        hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-[#26AFFF]/30 focus:border-[#26AFFF]'
                                      } focus:outline-none focus:ring-4 focus:ring-[#26AFFF]/20 transition-all duration-200 text-gray-700 bg-gradient-to-r hover:from-gray-50 hover:to-white`}
                                    >
                                      <option value="">{nextField.placeholder}</option>
                                      {nextField.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                      <div className="bg-gradient-to-br from-[#26AFFF]/10 to-[#26AFFF]/5 rounded-lg p-2 shadow-sm">
                                        <svg className="h-4 w-4 text-[#26AFFF] transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  {hasError && (
                                    <p className="mt-1 text-sm text-red-500">{errors[nextField.name]}</p>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <div>
                                <label htmlFor={nextField.name} className="block text-sm font-medium text-gray-700 mb-2">
                                  {nextField.label}{nextField.required && ' *'}
                                </label>
                                <input
                                  type={nextField.type}
                                  id={nextField.name}
                                  name={nextField.name}
                                  value={fieldValue}
                                  onChange={handleInputChange}
                                  placeholder={nextField.placeholder}
                                  autoComplete={getAutocomplete(nextField.name)}
                                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                                    hasError ? 'border-red-500' : 'border-gray-200 focus:border-[#26AFFF]'
                                  } focus:outline-none focus:ring-4 focus:ring-[#26AFFF]/20 transition-all bg-white/50 backdrop-blur-sm`}
                                />
                                {hasError && (
                                  <p className="mt-1 text-sm text-red-500">{errors[nextField.name]}</p>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      );
                      i += 2;
                    }
                    // Last field but not textarea, render single column
                    else {
                      const fieldValue = formData[currentField.name] || '';
                      const hasError = !!errors[currentField.name];

                      if (currentField.type === 'select') {
                        elements.push(
                          <div key={currentField.name}>
                            <label htmlFor={currentField.name} className="block text-sm font-medium text-gray-700 mb-2">
                              {currentField.label}{currentField.required && ' *'}
                            </label>
                            <div className="relative">
                              <select
                                id={currentField.name}
                                name={currentField.name}
                                value={fieldValue}
                                onChange={handleInputChange}
                                autoComplete="off"
                                className={`w-full px-4 py-3.5 pr-12 rounded-xl border-2 appearance-none bg-white cursor-pointer shadow-sm ${
                                  hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-[#26AFFF]/30 focus:border-[#26AFFF]'
                                } focus:outline-none focus:ring-4 focus:ring-[#26AFFF]/20 transition-all duration-200 text-gray-700 bg-gradient-to-r hover:from-gray-50 hover:to-white`}
                              >
                                <option value="">{currentField.placeholder}</option>
                                {currentField.options?.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                <div className="bg-gradient-to-br from-[#26AFFF]/10 to-[#26AFFF]/5 rounded-lg p-2 shadow-sm">
                                  <svg className="h-4 w-4 text-[#26AFFF] transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            {hasError && (
                              <p className="mt-1 text-sm text-red-500">{errors[currentField.name]}</p>
                            )}
                          </div>
                        );
                      } else {
                        elements.push(
                          <div key={currentField.name}>
                            <label htmlFor={currentField.name} className="block text-sm font-medium text-gray-700 mb-2">
                              {currentField.label}{currentField.required && ' *'}
                            </label>
                            <input
                              type={currentField.type}
                              id={currentField.name}
                              name={currentField.name}
                              value={fieldValue}
                              onChange={handleInputChange}
                              placeholder={currentField.placeholder}
                              autoComplete={getAutocomplete(currentField.name)}
                              className={`w-full px-4 py-3 rounded-xl border-2 ${
                                hasError ? 'border-red-500' : 'border-gray-200 focus:border-[#26AFFF]'
                              } focus:outline-none focus:ring-4 focus:ring-[#26AFFF]/20 transition-all bg-white/50 backdrop-blur-sm`}
                            />
                            {hasError && (
                              <p className="mt-1 text-sm text-red-500">{errors[currentField.name]}</p>
                            )}
                          </div>
                        );
                      }
                      i++;
                    }
                  }

                  return elements;
                })()}

                {/* Consent checkbox */}
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={consent}
                      onChange={handleConsentChange}
                      className="mt-1 mr-3 w-4 h-4 rounded border-gray-300 text-[#26AFFF] focus:ring-[#26AFFF] focus:ring-2"
                      style={{ accentColor: '#26AFFF' }}
                    />
                    <span className="text-sm text-gray-600">
                      {contactForm?.consentText}{contactForm?.consentRequired && ' *'}
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-sm text-red-500 ml-7">{errors.consent}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : undefined}
                  iconPosition="left"
                >
                  {isSubmitting ? contactForm?.submittingText : contactForm?.submitButton}
                </Button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-800 font-medium">
                      {contactForm?.successMessage}
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-800 font-medium">
                      {contactForm?.errorMessage}
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="flex flex-col h-full">
              {mapSection?.embedUrl && (
                <div className="bg-gray-100 rounded-2xl overflow-hidden h-[530px] relative mb-8">
                  <iframe
                    src={mapSection.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  ></iframe>
                </div>
              )}

              {(Boolean(resources?.resource1?.file) || Boolean(resources?.resource2?.file)) && (
                <div className="relative bg-gradient-to-br from-[#0057FF] via-[#1a75ff] to-[#26AFFF] rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20"></div>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 35px,
                        rgba(255,255,255,.1) 35px,
                        rgba(255,255,255,.1) 70px
                      )`
                    }}></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10 drop-shadow-lg">{resources?.heading}</h3>
                  <div className="flex flex-col space-y-3 relative z-10">
                    {Boolean(resources?.resource1?.file) && (
                      <a href={getFileUrl(resources?.resource1?.file)} target="_blank" rel="noopener noreferrer" className="block group cursor-pointer">
                        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:bg-white/25 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">{resources?.resource1?.title}</h4>
                              <p className="text-white/70 text-sm">{resources?.resource1?.description}</p>
                            </div>
                            <svg className="w-8 h-8 text-white transform transition-all duration-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    )}
                    {Boolean(resources?.resource2?.file) && (
                      <a href={getFileUrl(resources?.resource2?.file)} target="_blank" rel="noopener noreferrer" className="block group cursor-pointer">
                        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:bg-white/25 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">{resources?.resource2?.title}</h4>
                              <p className="text-white/70 text-sm">{resources?.resource2?.description}</p>
                            </div>
                            <svg className="w-8 h-8 text-white transform transition-all duration-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faq && faq.items && faq.items.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white via-[#26AFFF]/5 to-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6">{faq.heading}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {faq.description}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faq.items.map((faqItem, index) => {
                const isExpanded = expandedFaq === index;
                const isLast = index === faq.items.length - 1;

                return (
                  <div key={index} className={`${!isLast ? 'border-b border-[#26AFFF]/10' : ''} py-6`}>
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : index)}
                      className="w-full flex items-start text-left group focus:outline-none"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-[#26AFFF]/20 to-[#26AFFF]/5 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#26AFFF]/20 ${
                          isExpanded ? 'rotate-180 bg-gradient-to-br from-[#26AFFF] to-[#66dbff]' : ''
                        }`}>
                          {isExpanded ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-[#26AFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-[#0057FF] group-hover:to-[#26AFFF] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {faqItem.question}
                        </h3>
                        <div
                          className="overflow-hidden transition-all duration-300 ease-in-out"
                          style={{
                            maxHeight: isExpanded ? '200px' : '0',
                            opacity: isExpanded ? 1 : 0
                          }}
                        >
                          <p className="text-base text-gray-600 leading-relaxed mt-3">
                            {faqItem.answer}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
          </div>

            {/* CTA Section */}
            {cta && (
              <div className="mt-16">
                <CTASection
                  title={cta.heading}
                  description={cta.description}
                  primaryButtonText={cta.primaryButton.text}
                  primaryButtonHref={
                    cta.primaryButton.action === 'email'
                      ? `mailto:${siteInfo?.contact?.email}`
                      : cta.primaryButton.action === 'phone'
                      ? `tel:${siteInfo?.contact?.phone?.replace(/\D/g, '')}`
                      : cta.primaryButton.customLink || '#'
                  }
                  secondaryButtonText={cta.secondaryButton.text}
                  secondaryButtonHref={
                    cta.secondaryButton.action === 'email'
                      ? `mailto:${siteInfo?.contact?.email}`
                      : cta.secondaryButton.action === 'phone'
                      ? `tel:${siteInfo?.contact?.phone?.replace(/\D/g, '')}`
                      : cta.secondaryButton.customLink || '#'
                  }
                />
              </div>
            )}

          </div>
        </section>
      )}
    </>
  );
}