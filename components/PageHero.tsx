interface PageHeroProps {
  variant?: 'primary' | 'secondary' | 'contact';
  badge?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const variantStyles = {
  primary: {
    gradient: 'from-[#005F73] via-[#007A8A] to-[#00C9C9]',
    overlay: 'bg-black/20',
    dotColor: 'rgba(255,255,255,0.1)',
    badgeColor: 'text-[#00C9C9]'
  },
  secondary: {
    gradient: 'from-[#0077BE] via-[#00A8CC] to-[#00C9FF]',
    overlay: 'bg-black/15',
    dotColor: 'rgba(255,255,255,0.1)',
    badgeColor: 'text-[#87CEEB]'
  },
  contact: {
    gradient: 'from-[#60A5FA] to-[#DBEAFE]',
    overlay: 'bg-black/30',
    dotColor: 'rgba(255,255,255,0.15)',
    badgeColor: 'text-[#1E40AF]'
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
    <section className="relative pt-32 pb-20 overflow-hidden">
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
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
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