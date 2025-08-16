// src/components/Button.tsx

'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-700',
        destructive: 'bg-red-600 font-semibold text-white shadow-sm hover:bg-red-700',
        secondary: 'bg-slate-200 font-semibold text-slate-900 shadow-sm hover:bg-slate-300',
        outline: 'border border-input bg-background font-semibold hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-indigo-600 font-semibold underline-offset-4 hover:underline',
        insta: "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm font-semibold hover:opacity-90",
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonProps = {
  isLoading?: boolean;
} & VariantProps<typeof buttonVariants> & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { className, children, variant, size, isLoading, href, ...props },
    ref
  ) => {

    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {children}
        </Link>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        disabled={isLoading}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export default Button;