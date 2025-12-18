import { TreePine } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <TreePine className={`${sizeClasses[size]} text-emerald-600 animate-spin`} />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-20 animate-ping"></div>
      </div>
      <p className="mt-6 text-slate-600 font-medium text-lg">{message}</p>
      <div className="mt-2 flex space-x-1">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;