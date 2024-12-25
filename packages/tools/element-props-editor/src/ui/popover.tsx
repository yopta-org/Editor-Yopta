import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from 'src/lib/utils';
import { useYooptaEditor } from '@yoopta/editor';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const editor = useYooptaEditor();

  return (
    <PopoverPrimitive.Portal container={editor.refElement}>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'yoo-elements-z-50 yoo-elements-w-72 yoo-elements-rounded-md yoo-elements-border yoo-elements-bg-popover yoo-elements-p-4 yoo-elements-text-popover-foreground yoo-elements-shadow-md yoo-elements-outline-none data-[state=open]:yoo-elements-animate-in data-[state=closed]:yoo-elements-animate-out data-[state=closed]:yoo-elements-fade-out-0 data-[state=open]:yoo-elements-fade-in-0 data-[state=closed]:yoo-elements-zoom-out-95 data-[state=open]:yoo-elements-zoom-in-95 data-[side=bottom]:yoo-elements-slide-in-from-top-2 data-[side=left]:yoo-elements-slide-in-from-right-2 data-[side=right]:yoo-elements-slide-in-from-left-2 data-[side=top]:yoo-elements-slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
