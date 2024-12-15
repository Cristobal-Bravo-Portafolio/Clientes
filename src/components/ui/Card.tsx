import Image from 'next/image';
import React from 'react';

interface CardProps {
  variant?: 'menu-category' | 'menu-item' | 'about';
  title?: string;
  description?: string;
  price?: number;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Card = ({
  variant = 'menu-item',
  title,
  description,
  price,
  image,
  className = '',
  children,
  fullWidth = false,
  fullHeight = false,
  onClick,
  style
}: CardProps) => {
  const baseStyles = `
  bg-zinc-900/50 backdrop-blur-sm
  border border-[#F7BA0D]/10
  rounded-lg overflow-visible
  transform transition-all duration-500
  hover:border-[#F7BA0D]/30
  hover:shadow-lg hover:shadow-[#F7BA0D]/5
  cursor-grab
`;
  const sizeStyles = `
    ${fullWidth ? 'w-full' : ''}
    ${fullHeight ? 'h-full' : ''}
  `;

  if (variant === 'about') {
    return (
      <div className={`${baseStyles} ${sizeStyles} ${className}`} style={style}>
        <div className="p-8 md:p-12 w-full h-full flex flex-col justify-center">
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'menu-category') {
    return (
      <button onClick={onClick} className={`${baseStyles} ${className}`} style={style}>
        {children}
      </button>
    );
  }

  return (
    <div 
      className={`
        bg-zinc-900 rounded-lg overflow-hidden
        hover:scale-105 transition-all duration-500
        flex flex-col h-full
        hover:shadow-xl hover:shadow-[#F7BA0D]/20
        ${className}
      `}
      style={style}
    >
{image && (
  <div className="relative h-96 w-full overflow-hidden group">
    <Image 
      src={image} 
      alt={title || ''} 
      fill 
      className="object-cover transition-all duration-700 group-hover:scale-110" 
      priority 
    />
  </div>
)}
      <div className="p-6 flex flex-col flex-grow">
        {title && <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 hover:text-[#F7BA0D]">{title}</h3>}
        {description && <p className="text-gray-400 text-base mb-4 flex-grow">{description}</p>}
        {price && <p className="text-[#F7BA0D] text-lg font-bold">${price.toLocaleString()}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;