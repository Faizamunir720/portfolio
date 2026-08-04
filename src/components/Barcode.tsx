/** Decorative GATE-style barcode — visual only, not a real barcode. */
const BAR_WIDTHS = [
  1, 2, 1, 1, 3, 1, 2, 1, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 1,
  1, 2, 1, 3, 1, 1, 2, 1, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 1, 2, 1,
];

export function Barcode({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-7 items-stretch gap-px ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {BAR_WIDTHS.map((w, i) => (
        <span
          key={i}
          className="block h-full bg-foreground"
          style={{ width: `${w}px` }}
        />
      ))}
    </div>
  );
}
