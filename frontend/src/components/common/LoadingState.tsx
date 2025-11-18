import { motion } from "framer-motion";

const LoadingState = ({
  txt = "Loading...",
  size = "md",
}: {
  txt?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "min-h-48",
    md: "min-h-96",
    lg: "min-h-screen",
  };

  return (
    <div
      className={`flex items-center justify-center ${sizeClasses[size]}`}
      role="status"
    >
      <div className="text-center space-y-4">
        {/* Pulsing dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-success rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <p className="text-lg text-success font-bold animate-pulse">{txt}</p>
      </div>
    </div>
  );
};

export default LoadingState;
