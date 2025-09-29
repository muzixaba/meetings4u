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

  // State to track if image failed to load
  const [imageError, setImageError] = React.useState(false);

  // If we have a valid image source and it hasn't failed, show the image
  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={baseClasses}
        onError={() => {
          setImageError(true);
        }}
      />
    );
  }

  // Fallback: Show initials from first and last name if available
  if (fallbackText && fallbackText.trim()) {
    const names = fallbackText.trim().split(' ');
    let initials = '';

    if (names.length >= 2) {
      // Get first letter of first name and first letter of last name
      initials = names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
    } else if (names.length === 1) {
      // If only one name, get first two letters or just first letter
      const singleName = names[0];
      initials = singleName.length >= 2
        ? singleName.charAt(0).toUpperCase() + singleName.charAt(1).toUpperCase()
        : singleName.charAt(0).toUpperCase();
    }

    return (
      <div className={`${baseClasses} bg-blue-100 flex items-center justify-center`}>
        <span className={`font-semibold text-blue-700 ${textSizes[size]}`}>
          {initials}
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