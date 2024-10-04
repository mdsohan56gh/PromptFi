interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  change, 
  changeType = 'positive' 
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        
        {change && (
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
    </div>
  );
}

