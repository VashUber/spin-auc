import cn from 'classnames';
import { HTMLAttributes, ReactNode } from 'react';

interface CircleButtonPropsI extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
}

export const CircleButton = ({
  className,
  children,
  ...rest
}: CircleButtonPropsI) => {
  return (
    <button className={cn('btn btn-circle', className)} {...rest}>
      {children}
    </button>
  );
};
