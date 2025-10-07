import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'contact' | 'ghost' | 'outline' | 'filter' | 'filter-active' | 'category-active' | 'ghost-menu';
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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#0057FF] text-white hover:bg-[#0046cc] focus-visible:ring-[#0057FF]/30',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-300/30',
    accent: 'bg-white text-[#0057FF] border-2 border-[#0057FF] hover:bg-[#0057FF] hover:text-white focus-visible:ring-[#0057FF]/30',
    contact: 'bg-[#26AFFF] text-white hover:bg-[#1a9ce8] shadow-lg shadow-[#26AFFF]/25 hover:shadow-xl hover:shadow-[#26AFFF]/30 focus-visible:ring-[#26AFFF]/30',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-300/30',
    outline: 'border border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 focus-visible:ring-gray-300/30',
    filter: 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 focus-visible:ring-gray-300/30',
    'filter-active': 'bg-gray-100 text-gray-900 border border-gray-300 focus-visible:ring-gray-300/30',
    'category-active': 'bg-gray-100 text-gray-900 border border-gray-300 focus-visible:ring-gray-300/30',
    'ghost-menu': 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-300/30',
  };
  
  const sizeStyles = {
    sm: 'px-6 py-3 text-sm gap-2',
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