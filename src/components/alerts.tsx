'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertPopupProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  className?: string;
}

export function AlertPopup({
  message,
  type = 'info',
  onClose,
  className,
}: AlertPopupProps) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      
      if (remaining <= 0) {
        setIsVisible(false);
        onClose?.();
        clearInterval(timer);
      } else {
        setProgress(remaining);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const variants = {
    success: 'bg-green-50 border-green-500 text-green-700',
    error: 'bg-red-50 border-red-500 text-red-700',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
    info: 'bg-blue-50 border-blue-500 text-blue-700',
  };

  const progressColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={cn(
      'fixed bottom-4 right-4 w-96 border-l-4 p-4 shadow-lg rounded-lg animate-in slide-in-from-bottom-5 duration-300',
      variants[type],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 mt-0.5 mr-2" />
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 rounded-b-lg overflow-hidden">
        <div
          className={cn('h-full transition-all duration-100 ease-linear', progressColors[type])}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}