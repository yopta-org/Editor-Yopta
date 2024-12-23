import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import cn from 'classnames';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'yoo-editor-z-50 yoo-editor-w-72 yoo-editor-rounded-md yoo-editor-border yoo-editor-bg-popover yoo-editor-p-4 yoo-editor-text-popover-foreground yoo-editor-shadow-md yoo-editor-outline-none data-[state=open]:yoo-editor-animate-in data-[state=closed]:yoo-editor-animate-out data-[state=closed]:yoo-editor-fade-out-0 data-[state=open]:yoo-editor-fade-in-0 data-[state=closed]:yoo-editor-zoom-out-95 data-[state=open]:yoo-editor-zoom-in-95 data-[side=bottom]:yoo-editor-slide-in-from-top-2 data-[side=left]:yoo-editor-slide-in-from-right-2 data-[side=right]:yoo-editor-slide-in-from-left-2 data-[side=top]:yoo-editor-slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
