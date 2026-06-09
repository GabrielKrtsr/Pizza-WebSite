import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 no-tap-highlight focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-terracotta-500 to-ember-500 text-cream shadow-glow-ember hover:shadow-[0_0_60px_-10px_rgba(239,90,60,0.65)] hover:-translate-y-0.5",
  ghost:
    "text-cream/80 hover:text-cream hover:bg-white/5",
  outline:
    "border border-white/20 text-cream/90 hover:border-gold-400/60 hover:text-cream hover:bg-white/[0.04]",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsLink = CommonProps & { to: string; href?: never; onClick?: never; type?: never };
type ButtonAsAnchor = CommonProps & { href: string; to?: never };
type ButtonAsButton = CommonProps & {
  to?: never;
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

export default function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className = "" } = props;
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {children}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button
      type={("type" in props && props.type) || "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      className={cls}
    >
      {children}
    </button>
  );
}
