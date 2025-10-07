interface PageHeroProps {
  variant?: 'primary' | 'secondary' | 'contact';
  badge?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const variantStyles = {
  primary: {
    gradient: 'from-[#0c1821] via-[#1b2d3f] to-[#0057FF]',
    overlay: 'bg-gradient-to-b from-black/10 via-transparent to-transparent',
    dotColor: 'rgba(163,213,255,0.12)',
    badgeColor: 'text-[#26AFFF]',
    titleColor: 'text-white',
    descriptionColor: 'text-[#b3b3b3]'
  },
  secondary: {
    gradient: 'from-[#0c1821] via-[#1b2d3f] to-[#2a4a66]',
    overlay: 'bg-gradient-to-b from-black/10 via-transparent to-transparent',
    dotColor: 'rgba(255,255,255,0.10)',
    badgeColor: 'text-[#a3d5ff]',
    titleColor: 'text-white',
    descriptionColor: 'text-[#b3b3b3]'
  },
  contact: {
    gradient: 'from-[#0c1821] via-[#1b2d3f] to-[#0c1821]',
    overlay: 'bg-gradient-to-br from-[#26AFFF]/5 via-transparent to-[#0057FF]/10',
    dotColor: 'rgba(163,213,255,0.15)',
    badgeColor: 'text-[#26AFFF]',
    titleColor: 'text-white',
    descriptionColor: 'text-[#b3b3b3]',
    accentGlow: 'from-[#26AFFF]/20 to-transparent',
    shapeColor: 'rgba(38,175,255,0.06)'
  }
};

export default function PageHero({
  variant = 'primary',
  badge,
  title,
  description,
  children
}: PageHeroProps) {
  const styles = variantStyles[variant];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden hero-section" data-hero="true">
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient}`}>
        <div className={`absolute inset-0 ${styles.overlay}`}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${styles.dotColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          {badge && (
            <p className={`${styles.badgeColor} font-semibold mb-4 tracking-wide uppercase text-sm`}>
              {badge}
            </p>
          )}
          <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${styles.titleColor}`}>
            {title}
          </h1>
          <p className={`text-xl leading-relaxed ${styles.descriptionColor}`}>
            {description}
          </p>
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}