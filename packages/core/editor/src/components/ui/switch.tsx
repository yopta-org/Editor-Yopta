import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import cn from 'classnames';

const Switch = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>) => (
  <SwitchPrimitives.Root
    className={cn(
      'yoo-editor-peer yoo-editor-inline-flex yoo-editor-h-5 yoo-editor-w-9 yoo-editor-shrink-0 yoo-editor-cursor-pointer yoo-editor-items-center yoo-editor-rounded-full yoo-editor-border-2 yoo-editor-border-transparent yoo-editor-shadow-sm yoo-editor-transition-colors focus-visible:yoo-editor-outline-none focus-visible:yoo-editor-ring-2 focus-visible:yoo-editor-ring-ring focus-visible:yoo-editor-ring-offset-2 focus-visible:yoo-editor-ring-offset-background disabled:yoo-editor-cursor-not-allowed disabled:yoo-editor-opacity-50 data-[state=checked]:yoo-editor-bg-primary data-[state=unchecked]:yoo-editor-bg-input',
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'yoo-editor-pointer-events-none yoo-editor-block yoo-editor-h-4 yoo-editor-w-4 yoo-editor-rounded-full yoo-editor-bg-background yoo-editor-shadow-lg yoo-editor-ring-0 yoo-editor-transition-transform data-[state=checked]:yoo-editor-translate-x-4 data-[state=unchecked]:yoo-editor-translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
);

export { Switch };
