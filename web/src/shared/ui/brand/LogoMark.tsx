"use client";
import * as React from "react";

export function LogoMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={40}
      height={40}
      aria-label="Neotool"
      {...props}
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#C7CCFF" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        fill="url(#g)"
        d="M24 2c12.15 0 22 9.85 22 22s-9.85 22-22 22S2 36.15 2 24 11.85 2 24 2zm-9.6 11.6c-.8 0-1.4.6-1.4 1.4v17.9c0 .8.6 1.4 1.4 1.4h19.2c.8 0 1.4-.6 1.4-1.4V15c0-.8-.6-1.4-1.4-1.4H14.4zm3.6 4.4h12c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1H18a1 1 0 0 1-1-1V19c0-.55.45-1 1-1z"
      />
    </svg>
  );
}
