import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echowave-400 focus-visible:ring-offset-2 focus-visible:ring-offset-echowave-950 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-echowave-500 text-zinc-50 shadow-lg shadow-echowave-500/30 hover:bg-echowave-400",
        secondary:
          "bg-zinc-900/70 text-zinc-100 border border-zinc-700/80 hover:bg-zinc-800/90",
        ghost:
          "bg-transparent text-zinc-300 hover:bg-zinc-800/60 border border-transparent",
        outline:
          "border border-zinc-700/80 bg-echowave-950/40 text-zinc-100 hover:bg-zinc-900/80",
      },
      size: {
        default: "h-11 px-5 gap-2",
        lg: "h-12 px-6 gap-2 text-base",
        sm: "h-9 px-4 gap-2 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={twMerge(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";


