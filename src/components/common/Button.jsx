import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  disabled = false,
  className = '' 
}) => {
  const baseStyles = 'font-sans-elegant cursor-pointer transition-all duration-300 tracking-wide';
  
  const variantStyles = {
    primary: 'bg-[#8B7355] text-white border border-[#6B5A45] hover:bg-[#6B5A45] active:bg-[#5C4D3C]',
    secondary: 'bg-[#E8DED0] text-[#5C4D3C] border border-[#C9B8A8] hover:bg-[#D4C4B0] active:bg-[#C9B8A8]',
    success: 'bg-[#6B8E6B] text-white border border-[#5A7A5A] hover:bg-[#5A7A5A] active:bg-[#4A6A4A]',
    danger: 'bg-[#B85450] text-white border border-[#A04440] hover:bg-[#A04440] active:bg-[#903030]',
    outline: 'bg-transparent text-[#8B7355] border border-[#8B7355] hover:bg-[#8B7355] hover:text-white active:bg-[#6B5A45]'
  };
  
  const sizeStyles = {
    small: 'px-4 py-2 text-xs',
    medium: 'px-6 py-3 text-sm',
    large: 'px-8 py-4 text-base'
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

