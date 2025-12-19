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
        <label className="block text-sm font-sans-elegant font-medium mb-2 text-[#5C4D3C] tracking-wide">
          {label} {required && <span className="text-[#B85450]">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border border-[#E0D6CC] bg-[#FAF8F5] focus:border-[#8B7355] focus:ring-1 focus:ring-[#C9B8A8] focus:outline-none transition-all duration-200 font-sans-elegant text-[#2C2420] placeholder:text-[#A69580] ${error ? 'border-[#B85450]' : ''} ${className}`}
      />
      {error && (
        <p className="text-[#B85450] text-xs mt-2 font-sans-elegant">{error}</p>
      )}
    </div>
  );
};

export default Input;

