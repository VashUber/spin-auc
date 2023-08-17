import cn from 'classnames';
import { ChangeEvent, HTMLAttributes } from 'react';

interface TextInputPropsI extends HTMLAttributes<HTMLInputElement> {
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({ className, ...rest }: TextInputPropsI) => {
  return (
    <input
      type="text"
      className={cn(className, 'input input-bordered')}
      {...rest}
    />
  );
};
