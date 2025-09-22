import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'filter' | 'filter-active' | 'category-active' | 'ghost-menu';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  fullWidth = false,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#005F73] text-white shadow-md hover:bg-[#004A5C] hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-[#00C9C9]/30',
    secondary: 'bg-white text-gray-600 border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md hover:border-gray-300 focus:ring-[#00C9C9]/30',
    accent: 'bg-[#00C9C9] text-white shadow-md hover:bg-[#00B5B5] hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-[#00C9C9]/30',
    ghost: 'text-[#005F73] hover:bg-[#005F73]/5 focus:ring-[#005F73]/30',
    outline: 'border border-[#005F73] text-[#005F73] hover:bg-[#005F73] hover:text-white hover:shadow-md focus:ring-[#005F73]/30',
    filter: 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm hover:border-gray-300',
    'filter-active': 'bg-[#005F73] text-white shadow-md',
    'category-active': 'bg-[#005F73] text-white shadow-md',
    'ghost-menu': 'text-gray-600 hover:text-gray-900',
  };
  
  const sizeStyles = {
    sm: 'px-6 py-3 gap-2',
    md: 'px-8 py-3.5 text-base gap-2.5',
    lg: 'px-10 py-4 text-lg gap-3',
    xl: 'px-12 py-5 text-xl gap-3',
    icon: 'p-2',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  );
  
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
    >
      {content}
    </button>
  );
}