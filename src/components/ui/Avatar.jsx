import React from 'react';
import { User } from 'lucide-react';

/**
 * Avatar component that displays a user's profile image or a placeholder
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.size - Size variant ('sm', 'md', 'lg')
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.fallbackText - Text to show as fallback (uses first letter)
 */
const Avatar = ({
  src,
  alt = '',
  size = 'md',
  className = '',
  fallbackText = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const baseClasses = `${sizeClasses[size]} rounded-full object-cover ${className}`;

  // If we have a valid image source, show the image
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={baseClasses}
        onError={(e) => {
          // If image fails to load, hide it and let fallback show
          e.target.style.display = 'none';
        }}
      />
    );
  }

  // Fallback: Show first letter of name if available
  if (fallbackText && fallbackText.trim()) {
    const firstLetter = fallbackText.trim().charAt(0).toUpperCase();
    return (
      <div className={`${baseClasses} bg-primary-100 flex items-center justify-center`}>
        <span className={`font-semibold text-primary-700 ${textSizes[size]}`}>
          {firstLetter}
        </span>
      </div>
    );
  }

  // Final fallback: Show user icon
  return (
    <div className={`${baseClasses} bg-gray-200 flex items-center justify-center`}>
      <User className={`${iconSizes[size]} text-gray-500`} />
    </div>
  );
};

export default Avatar;