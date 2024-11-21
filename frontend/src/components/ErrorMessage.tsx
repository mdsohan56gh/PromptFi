interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start justify-between">
      <div className="flex items-start">
        <span className="text-red-500 text-xl mr-3">⚠️</span>
        <div>
          <h3 className="font-medium text-red-800">Error</h3>
          <p className="text-red-700 text-sm mt-1">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700 font-bold text-lg"
        >
          ×
        </button>
      )}
    </div>
  );
}

