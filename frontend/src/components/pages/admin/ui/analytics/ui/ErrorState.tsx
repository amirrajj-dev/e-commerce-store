import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <AlertCircle size={48} className="text-error mx-auto mb-4" />
        <p className="text-lg text-error mb-4">Failed to load analytics</p>
        <button onClick={onRetry} className="btn btn-error">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;