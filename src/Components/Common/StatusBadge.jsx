import { AlertTriangle, Shield, Clock, CheckCircle, Skull } from 'lucide-react';

const StatusBadge = ({ status, size = 'md' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Critically Endangered':
        return {
          color: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25',
          icon: Skull,
          text: 'Critically Endangered',
          pulse: true
        };
      case 'Endangered':
        return {
          color: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25',
          icon: AlertTriangle,
          text: 'Endangered',
          pulse: true
        };
      case 'Vulnerable':
        return {
          color: 'bg-gradient-to-r from-yellow-500 to-orange-400 text-white shadow-lg shadow-yellow-500/25',
          icon: Clock,
          text: 'Vulnerable',
          pulse: false
        };
      case 'Near Threatened':
        return {
          color: 'bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 shadow-lg shadow-yellow-500/25',
          icon: Shield,
          text: 'Near Threatened',
          pulse: false
        };
      case 'Least Concern':
        return {
          color: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25',
          icon: CheckCircle,
          text: 'Least Concern',
          pulse: false
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/25',
          icon: Shield,
          text: status,
          pulse: false
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <span className={`inline-flex items-center space-x-2 rounded-full font-semibold ${config.color} ${sizeClasses[size]} ${config.pulse ? 'animate-pulse' : ''} border border-white/20`}>
      <Icon className={iconSizes[size]} />
      <span>{config.text}</span>
    </span>
  );
};

export default StatusBadge;