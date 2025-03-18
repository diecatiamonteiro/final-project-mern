import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ 
  to, 
  onClick, 
  children, 
  variant = "primary", 
  size = "medium",
  disabled = false,
  fullWidth = false,
  className = "" 
}) {
  // Base classes
  const baseClasses = "font-medium rounded-3xl transition-colors";
  
  // Size classes
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  
  // Variant classes using your color palette
  const variantClasses = {
    primary: "bg-green hover:bg-greenHover text-offwhite", 
    secondary: "bg-midnightBlack hover:bg-gray-800 text-offwhite",
    tertiary: "bg-transparent hover:bg-offwhite/10 text-offwhite border border-offwhite/40",
    danger: "bg-red-600 hover:bg-red-700 text-offwhite",
    success: "bg-emerald-500 hover:bg-emerald-600 text-offwhite",
    warning: "bg-amber-500 hover:bg-amber-600 text-midnightBlack",
    light: "bg-offwhite hover:bg-gray-200 text-midnightBlack",
    outline: "bg-transparent hover:bg-green/10 text-green border border-green"
  };
  
  // Disabled state overrides hover effects
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none" 
    : "";
  
  // Full width option
  const widthClasses = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${disabledClasses}
    ${widthClasses}
    ${className}
  `;
  
  // If disabled, prevent default actions
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };
  
  // If we have a 'to' prop and not disabled, it's a navigation button
  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }
  
  // Otherwise it's an action button
  return (
    <button 
      onClick={handleClick} 
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}