import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavLink({ 
  to, 
  children, 
  className = "" 
}) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  // Base classes for all nav links
  const baseClasses = "text-base lg:text-lg text-offwhite transition-all";
  
  // Active state classes
  const activeClasses = isActive 
    ? "font-semibold text-green" 
    : "hover:text-offwhite/80";
  
  // Combine all classes
  const linkClasses = `${baseClasses} ${activeClasses} ${className}`;
  
  return (
    <Link to={to} className={linkClasses}>
      {children}
    </Link>
  );
} 