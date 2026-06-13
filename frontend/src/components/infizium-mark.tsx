export function InfiziumMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.1)}
      viewBox="0 0 80 88"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Finial ball */}
      <circle cx="40" cy="3.5" r="2.5" />

      {/* Dome — half-ellipse arch */}
      <path d="M27 21 Q27 7 40 7 Q53 7 53 21 Z" />
      {/* Dome horizontal bands (dark overlay on white dome) */}
      <rect x="28"   y="15.5" width="24" height="1.5" fill="#000" opacity="0.9" />
      <rect x="29.5" y="11.5" width="21" height="1.5" fill="#000" opacity="0.9" />

      {/* Neck platform below dome */}
      <rect x="34" y="21" width="12" height="3.5" rx="0.5" />

      {/* Pediment — triangular gable */}
      <path d="M11 34 L40 25 L69 34 Z" />
      {/* Pediment internal horizontal lines */}
      <rect x="11" y="30.5" width="58" height="1.5" fill="#000" opacity="0.9" />
      <rect x="16" y="28"   width="48" height="1.5" fill="#000" opacity="0.9" />

      {/* 5 Columns */}
      <rect x="13" y="34" width="5.5" height="21" />
      <rect x="25" y="34" width="5.5" height="21" />
      <rect x="37" y="34" width="5.5" height="21" />
      <rect x="49" y="34" width="5.5" height="21" />
      <rect x="61" y="34" width="5.5" height="21" />

      {/* Base drum — three horizontal bands with natural gaps */}
      <rect x="5" y="55"   width="70" height="5.5" rx="0.5" />
      <rect x="5" y="62"   width="70" height="12"  rx="0.5" />
      {/* Square window cutout in middle band */}
      <rect x="37.5" y="66" width="5" height="4.5" fill="#000" opacity="0.9" />
      <rect x="5" y="76"   width="70" height="5.5" rx="0.5" />
    </svg>
  );
}
