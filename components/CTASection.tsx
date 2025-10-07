interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: CTASectionProps) {

  return (
    <div className="mt-16 bg-gradient-to-br from-[#0c1821] via-[#1b2d3f] to-[#0057FF] rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-white/10">
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(163,213,255,0.4)" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#26AFFF]/10 via-transparent to-[#0057FF]/20"></div>

      {/* Animated Glow Circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#26AFFF]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#0057FF]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 text-center">
        <h3 className="text-4xl lg:text-5xl font-bold mb-6 drop-shadow-lg">{title}</h3>
        <p className="text-xl lg:text-2xl mb-12 text-[#b3b3b3] max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={primaryButtonHref}
            className="inline-flex items-center px-12 py-4 bg-white text-[#0057FF] rounded-full font-semibold shadow-[0_0_30px_rgba(38,175,255,0.3)] hover:shadow-[0_0_50px_rgba(38,175,255,0.5)] transition-all duration-300 hover:-translate-y-1"
            aria-label={primaryButtonText}
          >
            {primaryButtonText}
          </a>
          {secondaryButtonText && secondaryButtonHref && (
            <a
              href={secondaryButtonHref}
              className="inline-flex items-center px-12 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white hover:text-[#0057FF] hover:border-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}