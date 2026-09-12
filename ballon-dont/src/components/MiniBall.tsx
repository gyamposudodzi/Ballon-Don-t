type MiniBallProps = {
  className?: string;
};

export function MiniBall({ className = "h-12 w-12" }: MiniBallProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#FCD4A0" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#877458" strokeWidth="2" />
      <path
        d="M10 26c14-12 30-12 44 0M10 38c14 12 30 12 44 0M32 4c-10 16-10 40 0 56M32 4c10 16 10 40 0 56"
        fill="none"
        stroke="#877458"
        strokeWidth="1.4"
        opacity="0.7"
      />
    </svg>
  );
}
