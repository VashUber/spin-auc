import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

interface DefaultButtonPropsI extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
}

export const DefaultButton = ({
  children,
  className,
  ...rest
}: DefaultButtonPropsI) => {
  return (
    <button className={cn('btn btn-info max-w-max', className)} {...rest}>
      {children}
    </button>
  );
};
