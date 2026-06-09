import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300/90">
          <span className="h-px w-6 bg-gold-400/50" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed text-cream/60 ${align === "center" ? "" : ""}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
