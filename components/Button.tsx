import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#005F73] to-[#007A8F] text-white hover:from-[#004A5C] hover:to-[#005F73] shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-[#00C9C9]/30',
    secondary: 'bg-white text-[#005F73] border-2 border-[#005F73] hover:bg-[#005F73] hover:text-white hover:border-transparent transform hover:scale-105 focus:ring-[#005F73]/30',
    ghost: 'text-[#005F73] hover:bg-[#005F73]/10 hover:text-[#004A5C] focus:ring-[#005F73]/30',
    outline: 'border-2 border-[#00C9C9] text-[#00C9C9] hover:bg-[#00C9C9] hover:text-white transform hover:scale-105 focus:ring-[#00C9C9]/30',
  };
  
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-7 py-3.5 text-base gap-2.5',
    lg: 'px-9 py-4 text-lg gap-3',
    xl: 'px-11 py-5 text-xl gap-3',
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