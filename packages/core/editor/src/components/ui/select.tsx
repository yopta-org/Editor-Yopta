import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import cn from 'classnames';
import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger
    className={cn(
      'yoo-editor-flex yoo-editor-h-6 yoo-editor-w-full yoo-editor-items-center yoo-editor-justify-between yoo-editor-whitespace-nowrap yoo-editor-rounded-md yoo-editor-border yoo-editor-border-input yoo-editor-bg-transparent yoo-editor-px-2 yoo-editor-py-1 yoo-editor-text-xs yoo-editor-shadow-sm yoo-editor-ring-offset-background yoo-placeholder:yoo-editor-text-muted-foreground focus:yoo-editor-outline-none focus:yoo-editor-ring-1 focus:yoo-editor-ring-ring disabled:yoo-editor-cursor-not-allowed disabled:yoo-editor-opacity-50 [&>span]:yoo-editor-line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="yoo-editor-h-4 yoo-editor-w-4 yoo-editor-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>) => (
  <SelectPrimitive.ScrollUpButton
    className={cn(
      'yoo-editor-flex yoo-editor-cursor-default yoo-editor-items-center yoo-editor-justify-center yoo-editor-py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
);

const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>) => (
  <SelectPrimitive.ScrollDownButton
    className={cn(
      'yoo-editor-flex yoo-editor-cursor-default yoo-editor-items-center yoo-editor-justify-center yoo-editor-py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="yoo-editor-h-4 yoo-editor-w-4" />
  </SelectPrimitive.ScrollDownButton>
);

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) => {
  const editor = useYooptaEditor();

  return (
    <SelectPrimitive.Portal container={editor.refElement}>
      <SelectPrimitive.Content
        className={cn(
          'yoo-editor-bg-white yoo-editor-relative yoo-editor-z-50 yoo-editor-max-h-96 yoo-editor-min-w-[8rem] yoo-editor-overflow-hidden yoo-editor-rounded-md yoo-editor-border yoo-editor-bg-popover yoo-editor-text-popover-foreground yoo-editor-shadow-md data-[state=open]:yoo-editor-animate-in data-[state=closed]:yoo-editor-animate-out data-[state=closed]:yoo-editor-fade-out-0 data-[state=open]:yoo-editor-fade-in-0 data-[state=closed]:yoo-editor-zoom-out-95 data-[state=open]:yoo-editor-zoom-in-95 data-[side=bottom]:yoo-editor-slide-in-from-top-2 data-[side=left]:yoo-editor-slide-in-from-right-2 data-[side=right]:yoo-editor-slide-in-from-left-2 data-[side=top]:yoo-editor-slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:yoo-editor-translate-y-1 data-[side=left]:yoo-editor--translate-x-1 data-[side=right]:yoo-editor-translate-x-1 data-[side=top]:yoo-editor--translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'yoo-editor-p-1',
            position === 'popper' &&
              'yoo-editor-h-[var(--radix-select-trigger-height)] yoo-editor-w-full yoo-editor-min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

const SelectLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    className={cn('yoo-editor-px-2 yoo-editor-py-1.5 yoo-editor-text-sm yoo-editor-font-semibold', className)}
    {...props}
  />
);

const SelectItem = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    className={cn(
      'yoo-editor-relative yoo-editor-flex yoo-editor-w-full yoo-editor-cursor-default yoo-editor-select-none yoo-editor-items-center yoo-editor-rounded-sm yoo-editor-py-1.5 yoo-editor-pl-2 yoo-editor-pr-8 yoo-editor-text-sm yoo-editor-outline-none focus:yoo-editor-bg-accent focus:yoo-editor-text-accent-foreground data-[disabled]:yoo-editor-pointer-events-none data-[disabled]:yoo-editor-opacity-50',
      className,
    )}
    {...props}
  >
    <span className="yoo-editor-absolute yoo-editor-right-2 yoo-editor-flex yoo-editor-h-3.5 yoo-editor-w-3.5 yoo-editor-items-center yoo-editor-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="yoo-editor-h-4 yoo-editor-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

const SelectSeparator = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator
    className={cn('yoo-editor--mx-1 yoo-editor-my-1 yoo-editor-h-px yoo-editor-bg-muted', className)}
    {...props}
  />
);

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
