interface SuccessMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function SuccessMessage({ message, onDismiss }: SuccessMessageProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start justify-between">
      <div className="flex items-start">
        <span className="text-green-500 text-xl mr-3">✓</span>
        <div>
          <h3 className="font-medium text-green-800">Success</h3>
          <p className="text-green-700 text-sm mt-1">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-green-500 hover:text-green-700 font-bold text-lg"
        >
          ×
        </button>
      )}
    </div>
  );
}

