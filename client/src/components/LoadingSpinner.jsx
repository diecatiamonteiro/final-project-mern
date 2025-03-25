import React from 'react';

export default function LoadingSpinner({ size = 'medium', className = '' }) {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`
          animate-spin rounded-full
          border-2 border-green/20
          border-b-2 border-b-green
          ${sizeClasses[size]}
          ${className}
        `}
      >
        <span className="sr-only">Loading...</span>
        {/* sr-only class visually hides the text Loading... but keeps it accessible to screen readers */}
      </div>
    </div>
  );
} 