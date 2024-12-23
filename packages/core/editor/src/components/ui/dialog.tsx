import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cn from 'classnames';

const Dialog: React.ComponentType<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>> = DialogPrimitive.Root;
const DialogTrigger: React.ComponentType<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>> =
  DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose: React.ComponentType<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>> =
  DialogPrimitive.Close;

interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  className?: string;
}

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Overlay
    // @ts-expect-error
    className={cn(
      'yoo-editor-fixed yoo-editor-inset-0 yoo-editor-z-50 yoo-editor-bg-black/80 yoo-editor-data-[state=open]:animate-in yoo-editor-data-[state=closed]:animate-out yoo-editor-data-[state=closed]:fade-out-0 yoo-editor-data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
);

const DialogContent = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'yoo-editor-fixed yoo-editor-left-[50%] yoo-editor-top-[50%] yoo-editor-z-50 yoo-editor-grid yoo-editor-w-full yoo-editor-max-w-lg yoo-editor-translate-x-[-50%] yoo-editor-translate-y-[-50%] yoo-editor-gap-4 yoo-editor-border yoo-editor-bg-background yoo-editor-p-6 yoo-editor-shadow-lg yoo-editor-duration-200 yoo-editor-data-[state=open]:animate-in yoo-editor-data-[state=closed]:animate-out yoo-editor-data-[state=closed]:fade-out-0 yoo-editor-data-[state=open]:fade-in-0 yoo-editor-data-[state=closed]:zoom-out-95 yoo-editor-data-[state=open]:zoom-in-95 yoo-editor-data-[state=closed]:slide-out-to-left-1/2 yoo-editor-data-[state=closed]:slide-out-to-top-[48%] yoo-editor-data-[state=open]:slide-in-from-left-1/2 yoo-editor-data-[state=open]:slide-in-from-top-[48%] sm:yoo-editor-rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      {/* @ts-expect-error */}
      <DialogPrimitive.Close className="yoo-editor-absolute yoo-editor-right-4 yoo-editor-top-4 yoo-editor-rounded-sm yoo-editor-opacity-70 yoo-editor-ring-offset-background yoo-editor-transition-opacity yoo-editor-hover:opacity-100 yoo-editor-focus:outline-none yoo-editor-focus:ring-2 yoo-editor-focus:ring-ring yoo-editor-focus:ring-offset-2 yoo-editor-disabled:pointer-events-none yoo-editor-data-[state=open]:bg-accent yoo-editor-data-[state=open]:text-muted-foreground">
        <span className="yoo-editor-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'yoo-editor-flex yoo-editor-flex-col yoo-editor-space-y-1.5 yoo-editor-text-center sm:yoo-editor-text-left',
      className,
    )}
    {...props}
  />
);

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'yoo-editor-flex yoo-editor-flex-col-reverse sm:yoo-editor-flex-row sm:yoo-editor-justify-end sm:yoo-editor-space-x-2',
      className,
    )}
    {...props}
  />
);

// @ts-expect-error
const DialogTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    // @ts-expect-error
    className={cn(
      'yoo-editor-text-lg yoo-editor-font-semibold yoo-editor-leading-none yoo-editor-tracking-tight',
      className,
    )}
    {...props}
  />
);

const DialogDescription = ({
  // @ts-expect-error
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    // @ts-expect-error
    className={cn('yoo-editor-text-sm yoo-editor-text-muted-foreground', className)}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
