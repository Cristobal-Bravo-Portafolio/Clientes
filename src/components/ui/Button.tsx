import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
  isExternal?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  fullWidth = false,
  isExternal = false,
  className = '',
  ...props 
}: ButtonProps) => {
  // Estilos base
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200';
  
  // Variantes
  const variants = {
    primary: 'bg-yellow-500 text-black hover:bg-yellow-400',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
    outline: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black'
  };
  
  // Tamaños
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Combinar clases
  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  // Si hay un href, renderizar como Link
  if (href) {
    const linkProps = isExternal ? {
      target: '_blank',
      rel: 'noopener noreferrer'
    } : {};

    return (
      <Link
        href={href}
        className={buttonClasses}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  // Si no hay href, renderizar como button
  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;