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
  const baseStyles = 'font-sans-elegant cursor-pointer transition-all duration-300 tracking-wider uppercase';
  
  const variantStyles = {
    primary: 'bg-[#1A1A1A] text-white border border-[#1A1A1A] hover:bg-[#333333] active:bg-black',
    secondary: 'bg-[#F8F8F8] text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#E5E5E5] active:bg-[#D5D5D5]',
    success: 'bg-[#1A1A1A] text-white border border-[#1A1A1A] hover:bg-[#333333] active:bg-black',
    danger: 'bg-white text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white active:bg-black',
    outline: 'bg-transparent text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white active:bg-[#333333]'
  };
  
  const sizeStyles = {
    small: 'px-4 py-2 text-xs',
    medium: 'px-6 py-3 text-xs',
    large: 'px-8 py-4 text-xs'
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

