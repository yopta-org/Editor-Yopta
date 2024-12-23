import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import cn from 'classnames';

const labelVariants = cva(
  'yoo-editor-text-xs yoo-editor-font-medium yoo-editor-leading-none yoo-editor-peer-disabled:cursor-not-allowed yoo-editor-peer-disabled:opacity-70',
);

const Label = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />
);

export { Label };
