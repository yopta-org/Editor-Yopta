import * as React from 'react';

import { cn } from 'src/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'yoo-elements-flex yoo-elements-h-9 yoo-elements-w-full yoo-elements-rounded-md yoo-elements-border yoo-elements-border-input yoo-elements-bg-transparent yoo-elements-px-3 yoo-elements-py-1 yoo-elements-text-base yoo-elements-shadow-sm yoo-elements-transition-colors file:yoo-elements-border-0 file:yoo-elements-bg-transparent file:yoo-elements-text-sm file:yoo-elements-font-medium file:yoo-elements-text-foreground placeholder:yoo-elements-text-muted-foreground focus-visible:yoo-elements-outline-none focus-visible:yoo-elements-ring-1 focus-visible:yoo-elements-ring-ring disabled:yoo-elements-cursor-not-allowed disabled:yoo-elements-opacity-50 md:yoo-elements-text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
