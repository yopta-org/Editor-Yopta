import * as React from 'react';
import cn from 'classnames';

const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      className={cn(
        'yoo-editor-flex yoo-editor-h-6 yoo-editor-w-full yoo-editor-rounded-md yoo-editor-border yoo-editor-border-input yoo-editor-bg-transparent yoo-editor-px-2 yoo-editor-py-1 yoo-editor-text-base yoo-editor-shadow-sm yoo-editor-transition-colors file:yoo-editor-border-0 file:yoo-editor-bg-transparent file:yoo-editor-text-sm file:yoo-editor-font-medium file:yoo-editor-text-foreground placeholder:yoo-editor-text-muted-foreground focus-visible:yoo-editor-outline-none focus-visible:yoo-editor-ring-1 focus-visible:yoo-editor-ring-ring disabled:yoo-editor-cursor-not-allowed disabled:yoo-editor-opacity-50 md:yoo-editor-text-sm',
        className,
      )}
      {...props}
    />
  );
};

export { Input };
