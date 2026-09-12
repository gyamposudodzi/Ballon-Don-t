type BrandMarkProps = {
  className?: string;
  compact?: boolean;
  invert?: boolean;
};

export function BrandMark({ className = "", compact = false, invert = false }: BrandMarkProps) {
  const stroke = invert ? "#000000" : "#FCD4A0";
  return (
    <span className={`inline-flex items-center gap-2 ${invert ? "text-black" : "text-[#FCD4A0]"} ${className}`}>
      <svg viewBox="0 0 36 36" className={compact ? "h-8 w-8" : "h-10 w-10"} aria-hidden>
        <circle cx="18" cy="18" r="15" fill="none" stroke={stroke} strokeWidth="1.6" />
        <path
          d="M8 14c6-4 14-4 20 0M8 22c6 4 14 4 20 0M18 4v28M10 8c5 4 11 4 16 0M10 28c5-4 11-4 16 0"
          fill="none"
          stroke={stroke}
          strokeWidth="1.2"
        />
      </svg>
      <span
        className={`font-medium uppercase leading-none tracking-[0.18em] ${
          compact ? "text-[15px]" : "text-[18px]"
        }`}
      >
        Ballon Don&apos;t
      </span>
    </span>
  );
}
