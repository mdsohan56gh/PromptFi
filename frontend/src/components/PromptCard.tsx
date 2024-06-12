interface PromptCardProps {
  tokenId: number;
  title: string;
  description: string;
  modelType: string;
  usageCount: number;
  creator: string;
  royaltyRatio: number;
  onUse?: () => void;
}

export default function PromptCard({
  tokenId,
  title,
  description,
  modelType,
  usageCount,
  creator,
  royaltyRatio,
  onUse
}: PromptCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {modelType}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <span>📊 {usageCount} uses</span>
          <span>💰 {royaltyRatio / 100}% royalty</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          by {creator.slice(0, 6)}...{creator.slice(-4)}
        </span>
        {onUse && (
          <button
            onClick={onUse}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Use Prompt
          </button>
        )}
      </div>
    </div>
  );
}

