'use client';

import { useState, type ReactNode, type JSX as ReactJSX } from 'react';

type RichTextNode = {
  type?: string;
  tag?: string;
  listType?: string;
  text?: string;
  children?: RichTextNode[];
};

type RichTextContent = {
  root?: {
    children?: RichTextNode[];
  };
} | RichTextNode[] | null | undefined;

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'file';
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
  aboutUsHeading?: string;
  aboutUs?: RichTextContent;
  aboutRoleHeading?: string;
  aboutRole?: RichTextContent;
  responsibilitiesSection?: {
    heading?: string;
    responsibilities?: Array<{
      id?: string;
      responsibility: string;
    }>;
  };
  requirementsSection?: {
    heading?: string;
    requirements?: Array<{
      id?: string;
      requirement: string;
    }>;
  };
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
  const [fileUploads, setFileUploads] = useState<Record<string, File | null>>({});
  const [fileDragActive, setFileDragActive] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getDepartmentDisplay = (dept: string | Department): string => {
    if (typeof dept === 'object' && dept !== null) {
      return dept.name;
    }

    return dept;
  };

  const extractText = (nodes?: RichTextNode[]): string => {
    if (!Array.isArray(nodes)) return '';
    return nodes
      .map(child => {
        if (child?.text) return child.text;
        if (child?.children) return extractText(child.children);
        return '';
      })
      .join('')
      .trim();
  };

  const renderRichText = (content: RichTextContent): ReactNode => {
    const rootChildren =
      (content as { root?: { children?: RichTextNode[] } })?.root?.children ||
      (Array.isArray(content) ? (content as RichTextNode[]) : []);

    if (!Array.isArray(rootChildren)) return null;

    return rootChildren
      .map((node, index) => {
        const key = `rt-${index}`;
        switch (node?.type) {
          case 'paragraph': {
            const text = extractText(node.children);
            if (!text) return null;
            return (
              <p key={key} className="text-gray-700 leading-relaxed text-lg">
                {text}
              </p>
            );
          }
          case 'heading': {
            const HeadingTag = (node.tag as keyof ReactJSX.IntrinsicElements) || 'h3';
            const text = extractText(node.children);
            if (!text) return null;
            return (
              <HeadingTag key={key} className="text-2xl font-semibold text-[#2C3E50]">
                {text}
              </HeadingTag>
            );
          }
          case 'list': {
            const isOrdered = node.listType === 'number' || node.tag === 'ol';
            const ListTag = (isOrdered ? 'ol' : 'ul') as 'ol' | 'ul';
            return (
              <ListTag
                key={key}
                className={`${isOrdered ? 'list-decimal' : 'list-disc'} ml-6 space-y-2 text-gray-700 leading-relaxed`}
              >
                {Array.isArray(node.children)
                  ? node.children.map((item: RichTextNode, liIndex: number) => {
                      const itemText = extractText(item?.children);
                      if (!itemText) return null;
                      return <li key={`${key}-li-${liIndex}`}>{itemText}</li>;
                    })
                  : null}
              </ListTag>
            );
          }
          case 'quote': {
            const text = extractText(node.children);
            if (!text) return null;
            return (
              <blockquote
                key={key}
                className="border-l-4 border-[#0B4DA8]/30 pl-4 italic text-gray-700 leading-relaxed"
              >
                {text}
              </blockquote>
            );
          }
          default: {
            const text = extractText(node?.children);
            if (!text) return null;
            return (
              <p key={key} className="text-gray-700 leading-relaxed text-lg">
                {text}
              </p>
            );
          }
        }
      })
      .filter(Boolean);
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

  const handleFileChange = (fieldName: string, file?: File) => {
    if (file) {
      setFileUploads(prev => ({ ...prev, [fieldName]: file }));
      if (errors[fieldName]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    }
  };

  const handleFileDrag = (fieldName: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isActive = e.type === 'dragenter' || e.type === 'dragover';
    if (e.type === 'dragleave' || e.type === 'drop') {
      setFileDragActive(prev => ({ ...prev, [fieldName]: false }));
    } else if (isActive) {
      setFileDragActive(prev => ({ ...prev, [fieldName]: true }));
    }
  };

  const handleFileDrop = (fieldName: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFileDragActive(prev => ({ ...prev, [fieldName]: false }));
    const file = e.dataTransfer.files?.[0];
    handleFileChange(fieldName, file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    formConfig?.formFields?.forEach((field: FormField) => {
      if (field.required) {
        if (field.type === 'file') {
          const file = fileUploads[field.name];
          if (!file) {
            newErrors[field.name] = `${field.label} is required`;
          }
        } else {
          const value = formData[field.name];
          if (!value || !value.trim()) {
            newErrors[field.name] = `${field.label} is required`;
          } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            newErrors[field.name] = 'Invalid email format';
          } else if (field.type === 'tel') {
            const phonePattern = /^(?=.*\d)\+?[0-9 ]+$/;
            if (!phonePattern.test(value.trim())) {
              newErrors[field.name] = 'Invalid phone number';
            }
          }
        }
      }
    });

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

      const fileFieldOrder: string[] = [];
      const uploadedFiles: Record<string, string> = {};
      for (const field of formConfig?.formFields || []) {
        if (field.type === 'file') {
          fileFieldOrder.push(field.name);
          const selectedFile = fileUploads[field.name];
          if (selectedFile) {
            const uploadData = new FormData();
            uploadData.append('file', selectedFile);

            const uploadResponse = await fetch(`${CMS_URL}/api/media`, {
              method: 'POST',
              body: uploadData,
            });

            if (!uploadResponse.ok) {
              const errorText = await uploadResponse.text();
              throw new Error(`Failed to upload ${field.label}${errorText ? `: ${errorText}` : ''}`);
            }

            const uploadJson = await uploadResponse.json();
            const uploadedId = uploadJson.doc?.id;
            if (uploadedId) {
              uploadedFiles[field.name] = uploadedId;
            }
          }
        }
      }

      const primaryFileId = fileFieldOrder.length ? uploadedFiles[fileFieldOrder[0]] : undefined;

      const applicationData: Record<string, unknown> = {
        jobOpening: posting.id,
        customFieldResponses: Object.keys(formData).reduce((acc: Record<string, string>, key) => {
          if (!['fullName', 'email', 'phone'].includes(key)) {
            acc[key] = formData[key];
          }
          return acc;
        }, {}),
      };
      if (formData.fullName?.trim()) {
        applicationData.applicantName = formData.fullName.trim();
      }
      if (formData.email?.trim()) {
        applicationData.applicantEmail = formData.email.trim();
      }
      if (formData.phone?.trim()) {
        applicationData.applicantPhone = formData.phone.trim();
      }
      if (primaryFileId) {
        applicationData.resume = primaryFileId;
      }

      const applicationResponse = await fetch(`${CMS_URL}/api/job-application-submissions`, {
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
      setFileUploads({});

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

  const goToApplication = () => {
    setActiveTab('application');
    setTimeout(() => {
      const el = document.getElementById('application-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <>
      {/* Job header */}
      <section className="bg-white">
        <div className="container mx-auto max-w-5xl pt-36 pb-12 px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-6">
            {posting.title}
          </h1>
          <div className="flex flex-wrap gap-3 mb-12">
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {getDepartmentDisplay(posting.department)}
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {posting.location}
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-[#0B4DA8]/10 text-[#0B4DA8]">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {posting.type === 'full-time' ? 'Full-time' : posting.type}
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-[#0B4DA8]/10 text-[#0B4DA8]">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {posting.experience}
            </span>
          </div>

          <nav
            role="tablist"
            aria-label="Job content tabs"
            className="border-b-2 border-gray-200"
          >
            <div className="flex">
              <button
                role="tab"
                id="job-overview-tab"
                aria-controls="job-overview-panel"
                aria-selected={activeTab === 'overview'}
                tabIndex={activeTab === 'overview' ? 0 : -1}
                onClick={() => setActiveTab('overview')}
                className={`relative px-6 py-4 text-base font-semibold transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'text-[#0B4DA8]'
                    : 'text-gray-600 hover:text-[#0B4DA8]'
                }`}
              >
                Job Overview
                {activeTab === 'overview' && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#0B4DA8]" />
                )}
              </button>
              <button
                role="tab"
                id="job-application-tab"
                aria-controls="application-form"
                aria-selected={activeTab === 'application'}
                tabIndex={activeTab === 'application' ? 0 : -1}
                onClick={() => setActiveTab('application')}
                className={`relative px-6 py-4 text-base font-semibold transition-all duration-200 ${
                  activeTab === 'application'
                    ? 'text-[#0B4DA8]'
                    : 'text-gray-600 hover:text-[#0B4DA8]'
                }`}
              >
                Apply Now
                {activeTab === 'application' && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#0B4DA8]" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </section>

      {/* Success Banner */}
      {/* Overview */}
      {activeTab === 'overview' && (
      <div
        id="job-overview-panel"
        role="tabpanel"
        aria-labelledby="job-overview-tab"
        className="bg-white py-4"
      >
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
            {/* About Us */}
            {posting.aboutUs && (
              <div className="space-y-4 mb-10">
                <h2 className="text-2xl font-bold text-[#2C3E50]">
                  {posting.aboutUsHeading || 'About APASOL'}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                  {renderRichText(posting.aboutUs)}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-4 mb-10">
              <h2 className="text-2xl font-bold text-[#2C3E50]">
                {posting.aboutRoleHeading || 'About the Role'}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                {renderRichText(posting.aboutRole) || (
                  <p>
                    More details coming soon.
                  </p>
                )}
              </div>
            </div>

            {/* Responsibilities */}
            {posting.responsibilitiesSection?.responsibilities && posting.responsibilitiesSection.responsibilities.length > 0 && (
              <div className="space-y-4 mb-10">
                <h2 className="text-2xl font-bold text-[#2C3E50]">
                  {posting.responsibilitiesSection.heading || 'Key Responsibilities'}
                </h2>
                <ul className="space-y-3">
                  {posting.responsibilitiesSection.responsibilities.map((item, index: number) => (
                    <li key={item.id || index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[#0B4DA8]/10 text-[#0B4DA8] flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item.responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {posting.requirementsSection?.requirements && posting.requirementsSection.requirements.length > 0 && (
              <div className="space-y-4 mb-10">
                <h2 className="text-2xl font-bold text-[#2C3E50]">
                  {posting.requirementsSection.heading || 'Requirements'}
                </h2>
                <ul className="space-y-3">
                  {posting.requirementsSection.requirements.map((item, index: number) => (
                    <li key={item.id || index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[#0B4DA8]/10 text-[#0B4DA8] flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V6.5L12 3 4 6.5V12c0 6 8 10 8 10z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 12.5l2 2 3.5-4" />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item.requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA to apply */}
            <div className="text-center">
              <a
                href="#application-form"
                onClick={(e) => {
                  e.preventDefault();
                  goToApplication();
                }}
                className="inline-flex items-center px-8 py-3.5 bg-[#0B4DA8] text-white font-semibold rounded-lg hover:bg-[#083d82] transition-all duration-200 shadow-sm"
              >
                Apply for this Position
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Application */}
      {activeTab === 'application' && (
      <div
        id="application-form"
        role="tabpanel"
        aria-labelledby="job-application-tab"
        className="bg-white py-4"
      >
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="max-w-4xl">
            {submitStatus === 'success' ? (
              <div className="text-center py-10 text-gray-900 space-y-5">
                <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-emerald-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-emerald-700">Successfully submitted</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We&apos;ll review your application and get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="inline-flex items-center px-6 py-3 rounded-full border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  Submit another application
                </button>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="text-center py-16 space-y-5">
                <div className="inline-flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full bg-red-50 border border-red-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-red-700">
                    {formConfig?.errorMessage || 'Failed to submit application'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    Please try again or contact us directly at{' '}
                    <a
                      href="mailto:careers@apasolconsultants.com"
                      className="text-[#0B4DA8] hover:underline font-medium"
                    >
                      careers@apasolconsultants.com
                    </a>
                  </p>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="inline-flex items-center px-8 py-3.5 rounded-full border border-gray-300 text-[#0B4DA8] font-semibold hover:bg-gray-50 transition-all duration-200 shadow-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
              </div>
            ) : (
              <div className="p-0 lg:p-0">
                <form onSubmit={handleSubmit} className="space-y-8">
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
                              className={`w-full px-4 py-3 rounded-xl border ${
                                hasError ? 'border-red-500' : 'border-gray-300 focus:border-[#0B4DA8]'
                              } focus:outline-none focus:ring-2 focus:ring-[#0B4DA8]/15 transition-all bg-white`}
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
                                      className={`w-full px-4 py-3.5 pr-12 rounded-xl border appearance-none bg-white cursor-pointer ${
                                          hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-[#0B4DA8]/40 focus:border-[#0B4DA8]'
                                        } focus:outline-none focus:ring-2 focus:ring-[#0B4DA8]/15 transition-all duration-150 text-gray-700`}
                                      >
                                        <option value="">{currentField.placeholder}</option>
                                        {currentField.options?.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
                                          <svg className="h-4 w-4 text-[#0B4DA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    className={`w-full px-4 py-3 rounded-xl border ${
                                      hasError ? 'border-red-500' : 'border-gray-300 focus:border-[#0B4DA8]'
                                    } focus:outline-none focus:ring-2 focus:ring-[#0B4DA8]/15 transition-all bg-white`}
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
                                      className={`w-full px-4 py-3.5 pr-12 rounded-xl border appearance-none bg-white cursor-pointer ${
                                          hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-[#0B4DA8]/40 focus:border-[#0B4DA8]'
                                        } focus:outline-none focus:ring-2 focus:ring-[#0B4DA8]/15 transition-all duration-150 text-gray-700`}
                                      >
                                        <option value="">{nextField.placeholder}</option>
                                        {nextField.options?.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
                                          <svg className="h-4 w-4 text-[#0B4DA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    className={`w-full px-4 py-3 rounded-xl border ${
                                      hasError ? 'border-red-500' : 'border-gray-300 focus:border-[#0B4DA8]'
                                    } focus:outline-none focus:ring-2 focus:ring-[#0B4DA8]/15 transition-all bg-white`}
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
                                  className={`w-full px-4 py-3.5 pr-12 rounded-xl border appearance-none bg-white cursor-pointer ${
                                    hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-[#0B4DA8]/40 focus:border-[#0B4DA8]'
                                  } focus:outline-none focus:ring-2 focus:ring-[#0B4DA8]/15 transition-all duration-150 text-gray-700`}
                                >
                                  <option value="">{currentField.placeholder}</option>
                                  {currentField.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                  <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
                                    <svg className="h-4 w-4 text-[#0B4DA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        } else if (currentField.type === 'file') {
                          const hasError = !!errors[currentField.name];
                          const isDragging = fileDragActive[currentField.name];
                          const selectedFile = fileUploads[currentField.name];

                          elements.push(
                            <div key={currentField.name}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {currentField.label}{currentField.required && ' *'}
                              </label>
                              <div
                                onDragEnter={(e) => handleFileDrag(currentField.name, e)}
                                onDragLeave={(e) => handleFileDrag(currentField.name, e)}
                                onDragOver={(e) => handleFileDrag(currentField.name, e)}
                                onDrop={(e) => handleFileDrop(currentField.name, e)}
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                                  isDragging
                                    ? 'border-[#0B4DA8] bg-[#0B4DA8]/5'
                                    : hasError
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 bg-gray-50 hover:border-[#0B4DA8] hover:bg-[#0B4DA8]/5'
                                }`}
                              >
                                <input
                                  type="file"
                                  id={currentField.name}
                                  onChange={(e) => handleFileChange(currentField.name, e.target.files?.[0])}
                                  accept=".pdf,.doc,.docx"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="pointer-events-none">
                                  {selectedFile ? (
                                    <>
                                      <svg className="w-12 h-12 mx-auto mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {(selectedFile.size / 1024).toFixed(2)} KB
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
                                className={`w-full px-4 py-3 rounded-xl border ${
                                  hasError ? 'border-red-500' : 'border-gray-300 focus:border-[#0B4DA8]'
                                } focus:outline-none focus:ring-2 focus:ring-[#0B4DA8]/15 transition-all bg-white`}
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
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-150 flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#0B4DA8] hover:bg-[#083d82] shadow-sm'
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
            )}
          </div>
        </div>
      </div>
      )}
      {/* Spacer below tabs to give breathing room after content */}
      <div aria-hidden="true" className="pb-24" />
    </>
  );
}
