import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { useYooptaEditor } from '@yoopta/editor';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'yoo-elements-flex yoo-elements-h-7 yoo-elements-w-full yoo-elements-items-center yoo-elements-justify-between yoo-elements-whitespace-nowrap yoo-elements-rounded-md yoo-elements-border yoo-elements-border-input yoo-elements-bg-transparent yoo-elements-px-3 yoo-elements-py-2 yoo-elements-text-sm yoo-elements-shadow-sm yoo-elements-ring-offset-background placeholder:yoo-elements-text-muted-foreground focus:yoo-elements-outline-none focus:yoo-elements-ring-1 focus:yoo-elements-ring-ring disabled:yoo-elements-cursor-not-allowed disabled:yoo-elements-opacity-50 [&>span]:yoo-elements-line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="yoo-elements-h-4 yoo-elements-w-4 yoo-elements-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'yoo-elements-flex yoo-elements-cursor-default yoo-elements-items-center yoo-elements-justify-center yoo-elements-py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className="yoo-elements-h-4 yoo-elements-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'yoo-elements-flex yoo-elements-cursor-default yoo-elements-items-center yoo-elements-justify-center yoo-elements-py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="yoo-elements-h-4 yoo-elements-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => {
  const editor = useYooptaEditor();

  return (
    <SelectPrimitive.Portal container={editor.refElement}>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'yoo-elements-relative yoo-elements-z-50 yoo-elements-max-h-96 yoo-elements-min-w-[8rem] yoo-elements-overflow-hidden yoo-elements-rounded-md yoo-elements-border yoo-elements-bg-popover yoo-elements-text-popover-foreground yoo-elements-shadow-md data-[state=open]:yoo-elements-animate-in data-[state=closed]:yoo-elements-animate-out data-[state=closed]:yoo-elements-fade-out-0 data-[state=open]:yoo-elements-fade-in-0 data-[state=closed]:yoo-elements-zoom-out-95 data-[state=open]:yoo-elements-zoom-in-95 data-[side=bottom]:yoo-elements-slide-in-from-top-2 data-[side=left]:yoo-elements-slide-in-from-right-2 data-[side=right]:yoo-elements-slide-in-from-left-2 data-[side=top]:yoo-elements-slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:yoo-elements-translate-y-1 data-[side=left]:yoo-elements--translate-x-1 data-[side=right]:yoo-elements-translate-x-1 data-[side=top]:yoo-elements--translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'yoo-elements-p-1',
            position === 'popper' &&
              'yoo-elements-h-[var(--radix-select-trigger-height)] yoo-elements-w-full yoo-elements-min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('yoo-elements-px-2 yoo-elements-py-1.5 yoo-elements-text-sm yoo-elements-font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'yoo-elements-relative yoo-elements-flex yoo-elements-w-full yoo-elements-cursor-default yoo-elements-select-none yoo-elements-items-center yoo-elements-rounded-sm yoo-elements-py-1.5 yoo-elements-pl-2 yoo-elements-pr-8 yoo-elements-text-sm yoo-elements-outline-none focus:yoo-elements-bg-accent focus:yoo-elements-text-accent-foreground data-[disabled]:yoo-elements-pointer-events-none data-[disabled]:yoo-elements-opacity-50',
      className,
    )}
    {...props}
  >
    <span className="yoo-elements-absolute yoo-elements-right-2 yoo-elements-flex yoo-elements-h-3.5 yoo-elements-w-3.5 yoo-elements-items-center yoo-elements-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="yoo-elements-h-4 yoo-elements-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('yoo-elements--mx-1 yoo-elements-my-1 yoo-elements-h-px yoo-elements-bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
