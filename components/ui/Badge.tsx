/* One restrained badge system: warm neutrals + a single gold accent. */
const VARIANTS: Record<string, string> = {
  yellow: "bg-brand-yellow text-cocoa-ink",
  cocoa: "bg-cocoa-ink text-antique",
  walnut: "bg-walnut text-antique",
  cream: "bg-antique text-cocoa",
};

export function Badge({
  children,
  variant = "yellow",
  className = "",
  rotate = 0,
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={`display inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs tracking-wider shadow-sm ${VARIANTS[variant]} ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {children}
    </span>
  );
}

/** Small inline pill used INSIDE big display headlines, like the reference. */
export function InlinePill({
  children,
  variant = "yellow",
  rotate = -4,
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  rotate?: number;
}) {
  return (
    <span
      className={`display mx-1 inline-block align-middle rounded-full px-4 py-1 text-[0.3em] leading-none tracking-widest shadow-md ${VARIANTS[variant]}`}
      style={{ transform: `rotate(${rotate}deg) translateY(-0.35em)` }}
    >
      {children}
    </span>
  );
}
