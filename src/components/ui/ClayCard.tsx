import React from 'react';

interface ClayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'neutral' | 'mohenjo' | 'dholavira' | 'terracotta';
  elevation?: 'sm' | 'md' | 'lg' | 'inset';
  className?: string;
}

export const ClayCard: React.FC<ClayCardProps> = ({
  children,
  variant = 'neutral',
  elevation = 'md',
  className = '',
  ...props
}) => {
  const variantStyles = {
    neutral: 'bg-warm-white/90 border-white/80 text-earth-600',
    mohenjo: 'bg-gradient-to-br from-blue-50/95 to-indigo-50/90 border-blue-200/60 text-blue-900',
    dholavira: 'bg-gradient-to-br from-amber-50/95 to-orange-50/90 border-orange-200/60 text-orange-950',
    terracotta: 'bg-gradient-to-br from-terracotta-100/90 to-terracotta-200/80 border-terracotta-300/60 text-terracotta-600',
  };

  const shadowStyles = {
    sm: 'shadow-clay-sm',
    md: 'shadow-clay',
    lg: 'shadow-clay-lg',
    inset: 'shadow-clay-inset',
  };

  return (
    <div
      className={`rounded-3xl border-2 backdrop-blur-sm transition-all duration-200 ${variantStyles[variant]} ${shadowStyles[elevation]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
