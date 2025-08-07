
import React, { useState, useEffect } from 'react';
import { SuccessIcon, ErrorIcon, InfoIcon, CloseIcon } from './icons/Icons';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(onClose, 400); // Wait for animation to finish
      return () => clearTimeout(exitTimer);
    }, 4500); // Start exit animation before component is removed

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsExiting(true);
    const exitTimer = setTimeout(onClose, 400);
    return () => clearTimeout(exitTimer);
  };

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      icon: <SuccessIcon className="text-green-500" />,
      text: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      icon: <ErrorIcon className="text-red-500" />,
      text: 'text-red-800'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      icon: <InfoIcon className="text-blue-500" />,
      text: 'text-blue-800'
    },
  };

  const styles = typeStyles[type];
  const animationClass = isExiting ? 'animate-toast-out' : 'animate-toast-in';

  return (
    <div className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-lg border-l-4 ${styles.border} ${animationClass}`} role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
            {styles.icon}
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" aria-label="Close" onClick={handleClose}>
            <span className="sr-only">Close</span>
            <CloseIcon />
        </button>
    </div>
  );
};
