type MonogramProps = {
  size?: number;
  className?: string;
};

export function Monogram({ size = 40, className = "" }: MonogramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="18.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        x="20"
        y="24.5"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-newsreader), Georgia, serif",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.04em",
        }}
      >
        FM
      </text>
    </svg>
  );
}
