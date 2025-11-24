import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="../public/logo.jpg"
        alt="Grand Prime Assessoria Contábil"
        className="h-20 md:h-28 w-auto object-contain"
      />
    </div>
  );
};