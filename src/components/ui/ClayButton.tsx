import React from 'react';

interface ClayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'mohenjo' | 'dholavira' | 'neutral' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ClayButton: React.FC<ClayButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  disabled = false,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm font-bold rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base font-bold rounded-2xl gap-3',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-clay-button hover:from-amber-400 hover:to-amber-500 active:shadow-clay-button-pressed active:translate-y-0.5 border-t border-amber-300',
    mohenjo:
      'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-clay-button hover:from-blue-400 hover:to-blue-500 active:shadow-clay-button-pressed active:translate-y-0.5 border-t border-blue-300',
    dholavira:
      'bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-clay-button hover:from-orange-400 hover:to-orange-500 active:shadow-clay-button-pressed active:translate-y-0.5 border-t border-orange-300',
    neutral:
      'bg-gradient-to-b from-stone-100 to-stone-200 text-stone-700 shadow-clay-button hover:from-white hover:to-stone-100 active:shadow-clay-button-pressed active:translate-y-0.5 border-t border-white',
    success:
      'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-clay-button hover:from-emerald-400 hover:to-emerald-500 active:shadow-clay-button-pressed active:translate-y-0.5 border-t border-emerald-300',
    danger:
      'bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-clay-button hover:from-rose-400 hover:to-rose-500 active:shadow-clay-button-pressed active:translate-y-0.5 border-t border-rose-300',
  };

  const disabledStyles = disabled
    ? 'opacity-40 cursor-not-allowed transform-none shadow-none pointer-events-none'
    : 'cursor-pointer';

  return (
    <button
      className={`inline-flex items-center justify-center font-body transition-all duration-150 select-none ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
