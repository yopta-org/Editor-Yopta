import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from 'src/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'yoo-elements-peer yoo-elements-inline-flex yoo-elements-h-5 yoo-elements-w-9 yoo-elements-shrink-0 yoo-elements-cursor-pointer yoo-elements-items-center yoo-elements-rounded-full yoo-elements-border-2 yoo-elements-border-transparent yoo-elements-shadow-sm yoo-elements-transition-colors focus-visible:yoo-elements-outline-none focus-visible:yoo-elements-ring-2 focus-visible:yoo-elements-ring-ring focus-visible:yoo-elements-ring-offset-2 focus-visible:yoo-elements-ring-offset-background disabled:yoo-elements-cursor-not-allowed disabled:yoo-elements-opacity-50 data-[state=checked]:yoo-elements-bg-primary data-[state=unchecked]:yoo-elements-bg-input',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'yoo-elements-pointer-events-none yoo-elements-block yoo-elements-h-4 yoo-elements-w-4 yoo-elements-rounded-full yoo-elements-bg-background yoo-elements-shadow-lg yoo-elements-ring-0 yoo-elements-transition-transform data-[state=checked]:yoo-elements-translate-x-4 data-[state=unchecked]:yoo-elements-translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
