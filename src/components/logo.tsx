import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("text-primary", props.className)}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))" }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))" }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#logo-gradient)"
        d="M50 10 C 20 10, 10 30, 10 50 C 10 80, 50 100, 50 100 C 50 100, 90 80, 90 50 C 90 30, 80 10, 50 10 Z"
      />
      <circle cx="50" cy="45" r="18" fill="hsl(var(--background))" />
      <circle cx="50" cy="45" r="12" fill="url(#logo-gradient)" />
      <path
        d="M 35 65 Q 50 80, 65 65"
        stroke="hsl(var(--background))"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
