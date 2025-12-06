'use client';

import React, { useEffect, useRef, useState } from 'react';

type RichTextTextNode = {
  type: 'text';
  text: string;
  bold?: boolean;
};

type RichTextParagraphNode = {
  type: 'paragraph';
  children: RichTextTextNode[];
};

type RichTextContent = {
  root?: {
    children?: RichTextParagraphNode[];
  };
};

interface AboutSectionProps {
  badge?: string;
  heading?: string;
  headingGradient?: string;
  content?: RichTextContent;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  brandName?: string;
  brandTagline?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

function serializeRichText(content?: RichTextContent): React.ReactNode {
  if (!content?.root?.children) return null;

  return (
    <>
      {content.root.children.map((node, index) => {
        if (node.type === 'paragraph') {
          return (
            <p key={index} className="text-gray-600 text-lg leading-relaxed">
              {node.children.map((child, childIndex) => {
                if (child.type === 'text') {
                  if (child.bold) {
                    return (
                      <span key={childIndex} className="font-semibold text-[#0057FF]">
                        {child.text}
                      </span>
                    );
                  }
                  return <span key={childIndex}>{child.text}</span>;
                }
                return null;
              })}
            </p>
          );
        }
        return null;
      })}
    </>
  );
}

export default function AboutSection({
  badge,
  heading,
  headingGradient,
  content,
  missionTitle,
  missionText,
  visionTitle,
  visionText,
  brandName,
  brandTagline,
  stats,
}: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="py-32 relative overflow-hidden" id="about" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23005F73' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            {badge && (
              <p className="text-[#26AFFF] font-semibold mb-3 tracking-wide uppercase text-sm">{badge}</p>
            )}
            {(heading || headingGradient) && (
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-6 leading-tight">
                {heading}{' '}
                {headingGradient && <span className="text-gradient">{headingGradient}</span>}
              </h2>
            )}

            <div className="space-y-6">
              {content && serializeRichText(content)}

              {((missionTitle && missionText) || (visionTitle && visionText)) && (
                <div className="grid grid-cols-2 gap-6">
                  {missionTitle && missionText && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#26AFFF] hover:shadow-md transition-all duration-300">
                      <h4 className="font-bold text-[#0057FF] mb-2 text-lg">{missionTitle}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{missionText}</p>
                    </div>
                  )}
                  {visionTitle && visionText && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#26AFFF] hover:shadow-md transition-all duration-300">
                      <h4 className="font-bold text-[#0057FF] mb-2 text-lg">{visionTitle}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{visionText}</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Visual Element */}
          <div className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative">
              {/* Main Card - Beautiful blue gradient */}
              <div className="bg-gradient-to-br from-[#1a5fb4] via-[#26AFFF] to-[#7ec8ff] rounded-xl p-12 text-white shadow-2xl shadow-[#26AFFF]/20">
                <div className="space-y-8">
                  {(brandName || brandTagline) && (
                    <div>
                      {brandName && <h3 className="text-6xl font-bold mb-2">{brandName}</h3>}
                      {brandTagline && <p className="text-xl opacity-90 font-light">{brandTagline}</p>}
                    </div>
                  )}

                  {stats && stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
                      {stats.map((stat, index) => (
                        <div key={index}>
                          <p className="text-3xl font-bold">{stat.value}</p>
                          <p className="text-sm opacity-80">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
