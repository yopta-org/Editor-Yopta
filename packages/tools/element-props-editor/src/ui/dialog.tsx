import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { useYooptaEditor } from '@yoopta/editor';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'yoo-elements-fixed yoo-elements-inset-0 yoo-elements-z-50 yoo-elements-bg-black/80 yoo-elements- data-[state=open]:yoo-elements-animate-in data-[state=closed]:yoo-elements-animate-out data-[state=closed]:yoo-elements-fade-out-0 data-[state=open]:yoo-elements-fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const editor = useYooptaEditor();

  return (
    <DialogPortal container={editor.refElement}>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'yoo-elements-fixed yoo-elements-left-[50%] yoo-elements-top-[50%] yoo-elements-z-50 yoo-elements-grid yoo-elements-w-full yoo-elements-max-w-lg yoo-elements-translate-x-[-50%] yoo-elements-translate-y-[-50%] yoo-elements-gap-4 yoo-elements-border yoo-elements-bg-background yoo-elements-p-6 yoo-elements-shadow-lg yoo-elements-duration-200 data-[state=open]:yoo-elements-animate-in data-[state=closed]:yoo-elements-animate-out data-[state=closed]:yoo-elements-fade-out-0 data-[state=open]:yoo-elements-fade-in-0 data-[state=closed]:yoo-elements-zoom-out-95 data-[state=open]:yoo-elements-zoom-in-95 data-[state=closed]:yoo-elements-slide-out-to-left-1/2 data-[state=closed]:yoo-elements-slide-out-to-top-[48%] data-[state=open]:yoo-elements-slide-in-from-left-1/2 data-[state=open]:yoo-elements-slide-in-from-top-[48%] sm:yoo-elements-rounded-lg',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="yoo-elements-absolute yoo-elements-right-4 yoo-elements-top-4 yoo-elements-rounded-sm yoo-elements-opacity-70 yoo-elements-ring-offset-background yoo-elements-transition-opacity hover:yoo-elements-opacity-100 focus:yoo-elements-outline-none focus:yoo-elements-ring-2 focus:yoo-elements-ring-ring focus:yoo-elements-ring-offset-2 disabled:yoo-elements-pointer-events-none data-[state=open]:yoo-elements-bg-accent data-[state=open]:yoo-elements-text-muted-foreground">
          <X className="yoo-elements-h-4 yoo-elements-w-4" />
          <span className="yoo-elements-sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'yoo-elements-flex yoo-elements-flex-col yoo-elements-space-y-1.5 yoo-elements-text-center sm:yoo-elements-text-left',
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'yoo-elements-flex yoo-elements-flex-col-reverse sm:yoo-elements-flex-row sm:yoo-elements-justify-end sm:yoo-elements-space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'yoo-elements-text-lg yoo-elements-font-semibold yoo-elements-leading-none yoo-elements-tracking-tight',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('yoo-elements-text-sm yoo-elements-text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
