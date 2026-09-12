type TrophyMarkProps = {
  className?: string;
  title?: string;
};

export function TrophyMark({
  className = "h-40 w-40",
  title = "Ballon D'ont trophy",
}: TrophyMarkProps) {
  return (
    <svg viewBox="0 0 200 220" role="img" aria-label={title} className={className}>
      <defs>
        <linearGradient id="gold-ball" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5F1DC" />
          <stop offset="40%" stopColor="#FCD4A0" />
          <stop offset="100%" stopColor="#877458" />
        </linearGradient>
      </defs>
      <line x1="100" y1="8" x2="100" y2="212" stroke="#877458" strokeWidth="2" />
      <line x1="70" y1="8" x2="70" y2="212" stroke="#877458" strokeWidth="1" opacity="0.5" />
      <line x1="130" y1="8" x2="130" y2="212" stroke="#877458" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="108" r="62" fill="url(#gold-ball)" />
      <path
        d="M50 96c18-28 82-28 100 0M50 120c18 28 82 28 100 0M100 48c-18 28-18 92 0 120M100 48c18 28 18 92 0 120"
        fill="none"
        stroke="#050C13"
        strokeWidth="2"
        opacity="0.35"
      />
      <circle cx="78" cy="82" r="8" fill="#F5F1DC" opacity="0.35" />
    </svg>
  );
}
