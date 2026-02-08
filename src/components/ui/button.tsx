import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const baseClassName = cn(
      "group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-10 py-5 text-sm font-bold text-white",
      "bg-[var(--brand-red)] transition-colors duration-300",
      className,
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={baseClassName} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} className={baseClassName} {...props}>
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-1/2 w-full -translate-x-1/2 bg-black",
            "origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-350 ease-out",
          )}
        />
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
