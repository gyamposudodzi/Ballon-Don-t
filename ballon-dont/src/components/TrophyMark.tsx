type TrophyMarkProps = {
  className?: string;
  title?: string;
};

export function TrophyMark({
  className = "h-40 w-40",
  title = "Ballon Don't trophy",
}: TrophyMarkProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id="balloon-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4a46a" />
          <stop offset="45%" stopColor="#8a6a3a" />
          <stop offset="100%" stopColor="#5c3d1e" />
        </linearGradient>
        <linearGradient id="balloon-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4efe6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c2410c" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <ellipse cx="102" cy="96" rx="58" ry="70" fill="url(#balloon-skin)" />
      <path
        d="M58 88c18-28 42-22 55-6 14 18 8 38-6 52-20 20-48 8-55-14-6-18 0-22 6-32z"
        fill="url(#balloon-shade)"
      />
      <path
        d="M78 158c8 10 28 18 46 6 6-4 14 2 10 10-10 18-48 22-64 6-8-8-2-18 8-22z"
        fill="#6b4220"
      />
      <path
        d="M118 172c2 14-6 28-4 44"
        fill="none"
        stroke="#c4a46a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M48 118c-18 8-28 28-16 40 10 10 28 4 34-10"
        fill="none"
        stroke="#e05a1a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="78" cy="72" r="7" fill="#f4efe6" opacity="0.35" />
    </svg>
  );
}
