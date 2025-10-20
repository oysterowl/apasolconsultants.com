'use client';

import { useState } from 'react';
import Link from 'next/link';

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

interface Department {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  order?: number;
}

interface CareerPosting {
  id: string;
  title: string;
  department: string | Department;
  location: string;
  type: string;
  experience: string;
  description?: {
    root?: {
      children?: Array<{
        children?: Array<{
          text?: string;
        }>;
      }>;
    };
  };
  responsibilities?: Array<{
    id?: string;
    responsibility: string;
  }>;
  requirements?: Array<{
    id?: string;
    requirement: string;
  }>;
  slug: string;
}

interface FormConfig {
  heading?: string;
  description?: string;
  formFields?: FormField[];
  successMessage?: string;
  errorMessage?: string;
  submitButton?: string;
  submittingText?: string;
}

interface CareerDetailContentProps {
  posting: CareerPosting;
  formConfig: FormConfig | null;
}

export default function CareerDetailContent({ posting, formConfig }: CareerDetailContentProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'application'>('overview');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeDragActive, setResumeDragActive] = useState(false);
  const [coverLetterDragActive, setCoverLetterDragActive] = useState(false);

  const getDepartmentDisplay = (dept: string | Department): string => {
    if (typeof dept === 'object' && dept !== null) {
      return dept.name;
    }

    const deptMap: Record<string, string> = {
      'engineering': 'Engineering',
      'project-management': 'Project Management',
      'business-development': 'Business Development',
      'design': 'Design',
      'operations': 'Operations',
      'administration': 'Administration'
    };
    return deptMap[dept] || dept;
  };

  const getDescriptionText = (): string => {
    try {
      return posting?.description?.root?.children?.[0]?.children?.[0]?.text || '';
    } catch {
      return '';
    }
  };

  const getAutocomplete = (fieldName: string): string => {
    const autocompleteMap: Record<string, string> = {
      'fullName': 'name',
      'name': 'name',
      'email': 'email',
      'phone': 'tel',
      'currentCompany': 'organization',
      'position': 'off',
      'experience': 'off',
      'education': 'off'
    };
    return autocompleteMap[fieldName] || 'off';
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      if (errors.resume) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    }
  };

  const handleCoverLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverLetterFile(file);
    }
  };

  const handleResumeDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setResumeDragActive(true);
    } else if (e.type === 'dragleave') {
      setResumeDragActive(false);
    }
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResumeDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResumeFile(file);
      if (errors.resume) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    }
  };

  const handleCoverLetterDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setCoverLetterDragActive(true);
    } else if (e.type === 'dragleave') {
      setCoverLetterDragActive(false);
    }
  };

  const handleCoverLetterDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCoverLetterDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setCoverLetterFile(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    formConfig?.formFields?.forEach((field: FormField) => {
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

    if (!resumeFile) {
      newErrors.resume = 'Resume is required';
    }

    if (portfolioUrl && !/^https?:\/\/.+/.test(portfolioUrl)) {
      newErrors.portfolioUrl = 'Please enter a valid URL (starting with http:// or https://)';
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
      const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

      const resumeFormData = new FormData();
      resumeFormData.append('file', resumeFile!);

      const resumeResponse = await fetch(`${CMS_URL}/api/media`, {
        method: 'POST',
        body: resumeFormData,
      });

      if (!resumeResponse.ok) {
        throw new Error('Failed to upload resume');
      }

      const resumeData = await resumeResponse.json();
      const resumeId = resumeData.doc?.id;

      let coverLetterId = null;
      if (coverLetterFile) {
        const coverLetterFormData = new FormData();
        coverLetterFormData.append('file', coverLetterFile);

        const coverLetterResponse = await fetch(`${CMS_URL}/api/media`, {
          method: 'POST',
          body: coverLetterFormData,
        });

        if (coverLetterResponse.ok) {
          const coverLetterData = await coverLetterResponse.json();
          coverLetterId = coverLetterData.doc?.id;
        }
      }

      const applicationData: { formData: Record<string, string>; resume: string; jobPosting: string; coverLetter?: string | null; portfolioUrl?: string } = {
        formData: formData,
        resume: resumeId,
        jobPosting: posting.id,
      };

      if (coverLetterId) {
        applicationData.coverLetter = coverLetterId;
      }

      if (portfolioUrl) {
        applicationData.portfolioUrl = portfolioUrl;
      }

      const applicationResponse = await fetch(`${CMS_URL}/api/career-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!applicationResponse.ok) {
        throw new Error('Failed to submit application');
      }

      setSubmitStatus('success');
      setFormData({});
      setResumeFile(null);
      setCoverLetterFile(null);
      setPortfolioUrl('');

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error submitting application:', error);
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

  const handlePortfolioUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioUrl(e.target.value);
    if (errors.portfolioUrl) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.portfolioUrl;
        return newErrors;
      });
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#0057FF] transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/careers" className="text-gray-600 hover:text-[#0057FF] transition-colors">
              Careers
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#0057FF] font-medium">{posting.title}</span>
          </div>
        </div>
      </section>

      {/* Success/Error Banner */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="container mx-auto px-6 lg:px-12 py-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-green-800 font-semibold">
                  {formConfig?.successMessage || 'Application submitted successfully!'}
                </p>
                <p className="text-green-700 text-sm mt-1">
                  We will review your application and get back to you soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="container mx-auto px-6 lg:px-12 py-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-red-800 font-semibold">
                  {formConfig?.errorMessage || 'Failed to submit application'}
                </p>
                <p className="text-red-700 text-sm mt-1">
                  Please try again or contact us directly at careers@apasolconsultants.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-[#0057FF] text-white shadow-lg shadow-[#0057FF]/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Job Overview
            </button>
            <button
              onClick={() => setActiveTab('application')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'application'
                  ? 'bg-[#0057FF] text-white shadow-lg shadow-[#0057FF]/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <section className="py-16 bg-gradient-to-br from-white via-[#26AFFF]/5 to-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
            {/* Job Title */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
                {posting.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-white border-2 border-gray-200 text-gray-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {getDepartmentDisplay(posting.department)}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-white border-2 border-gray-200 text-gray-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {posting.location}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-[#26AFFF]/10 text-[#0057FF] shadow-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {posting.type === 'full-time' ? 'Full-time' : posting.type}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-[#0057FF]/10 text-[#0057FF] shadow-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {posting.experience}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">About the Role</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {getDescriptionText()}
              </p>
            </div>

            {/* Responsibilities */}
            {posting.responsibilities && posting.responsibilities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {posting.responsibilities.map((item, index: number) => (
                    <li key={item.id || index} className="flex items-start">
                      <svg className="w-6 h-6 text-[#26AFFF] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 leading-relaxed">{item.responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {posting.requirements && posting.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {posting.requirements.map((item, index: number) => (
                    <li key={item.id || index} className="flex items-start">
                      <svg className="w-6 h-6 text-[#0057FF] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-gray-700 leading-relaxed">{item.requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA to apply */}
            <div className="text-center">
              <button
                onClick={() => setActiveTab('application')}
                className="inline-flex items-center px-8 py-4 bg-[#0057FF] text-white font-semibold rounded-xl hover:bg-[#0046CC] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Apply for this Position
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Application Tab */}
      {activeTab === 'application' && (
        <section className="py-16 bg-gradient-to-br from-[#26AFFF]/5 via-white to-[#26AFFF]/5">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
                  {formConfig?.heading || 'Apply for this Position'}
                </h2>
                <p className="text-lg text-gray-600">
                  {formConfig?.description || 'Fill out the form below to submit your application'}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dynamic form fields */}
                  {(() => {
                    const fields = formConfig?.formFields || [];
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

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume / CV *
                    </label>
                    <div
                      onDragEnter={handleResumeDrag}
                      onDragLeave={handleResumeDrag}
                      onDragOver={handleResumeDrag}
                      onDrop={handleResumeDrop}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        resumeDragActive
                          ? 'border-[#26AFFF] bg-[#26AFFF]/5'
                          : errors.resume
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 bg-gray-50 hover:border-[#26AFFF] hover:bg-[#26AFFF]/5'
                      }`}
                    >
                      <input
                        type="file"
                        id="resume"
                        onChange={handleResumeFileChange}
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="pointer-events-none">
                        {resumeFile ? (
                          <>
                            <svg className="w-12 h-12 mx-auto mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-700">{resumeFile.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {(resumeFile.size / 1024).toFixed(2)} KB
                            </p>
                          </>
                        ) : (
                          <>
                            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm font-medium text-gray-700">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC, DOCX (max 10MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    {errors.resume && (
                      <p className="mt-1 text-sm text-red-500">{errors.resume}</p>
                    )}
                  </div>

                  {/* Cover Letter Upload (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter (Optional)
                    </label>
                    <div
                      onDragEnter={handleCoverLetterDrag}
                      onDragLeave={handleCoverLetterDrag}
                      onDragOver={handleCoverLetterDrag}
                      onDrop={handleCoverLetterDrop}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        coverLetterDragActive
                          ? 'border-[#26AFFF] bg-[#26AFFF]/5'
                          : 'border-gray-300 bg-gray-50 hover:border-[#26AFFF] hover:bg-[#26AFFF]/5'
                      }`}
                    >
                      <input
                        type="file"
                        id="coverLetter"
                        onChange={handleCoverLetterFileChange}
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="pointer-events-none">
                        {coverLetterFile ? (
                          <>
                            <svg className="w-12 h-12 mx-auto mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-700">{coverLetterFile.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {(coverLetterFile.size / 1024).toFixed(2)} KB
                            </p>
                          </>
                        ) : (
                          <>
                            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm font-medium text-gray-700">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC, DOCX (max 10MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Portfolio URL */}
                  <div>
                    <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio / LinkedIn URL (Optional)
                    </label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      value={portfolioUrl}
                      onChange={handlePortfolioUrlChange}
                      placeholder="https://..."
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.portfolioUrl ? 'border-red-500' : 'border-gray-200 focus:border-[#26AFFF]'
                      } focus:outline-none focus:ring-4 focus:ring-[#26AFFF]/20 transition-all bg-white/50 backdrop-blur-sm`}
                    />
                    {errors.portfolioUrl && (
                      <p className="mt-1 text-sm text-red-500">{errors.portfolioUrl}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#0057FF] hover:bg-[#0046CC] shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {formConfig?.submittingText || 'Submitting...'}
                      </>
                    ) : (
                      <>
                        {formConfig?.submitButton || 'Submit Application'}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
