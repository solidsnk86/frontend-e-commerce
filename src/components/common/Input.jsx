import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  name,
  label,
  error,
  required = false,
  className = '' 
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-xs font-sans-elegant font-medium mb-2 text-[#1A1A1A] tracking-wide uppercase">
          {label} {required && <span className="text-[#1A1A1A]">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border border-[#E5E5E5] bg-white focus:border-[#1A1A1A] focus:ring-0 focus:outline-none transition-all duration-200 font-sans-elegant text-[#1A1A1A] placeholder:text-[#6B6B6B] ${error ? 'border-[#1A1A1A]' : ''} ${className}`}
      />
      {error && (
        <p className="text-[#1A1A1A] text-xs mt-2 font-sans-elegant">{error}</p>
      )}
    </div>
  );
};

export default Input;

