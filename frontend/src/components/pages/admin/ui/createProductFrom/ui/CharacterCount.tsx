interface CharacterCounterProps {
  currentLength: number;
  maxLength: number;
  className?: string;
}

const CharacterCounter = ({ currentLength, maxLength, className = "" }: CharacterCounterProps) => {
  return (
    <span className={`text-sm text-base-content/60 ${className}`}>
      {currentLength}/{maxLength}
    </span>
  );
};

export default CharacterCounter;