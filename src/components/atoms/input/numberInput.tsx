import cn from 'classnames';
import { ChangeEvent, HTMLAttributes } from 'react';

interface NumberInputPropsI extends HTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const NumberInput = ({
  onChange,
  className,
  ...rest
}: NumberInputPropsI) => {
  return (
    <input
      type="text"
      className={cn(className, 'input input-bordered')}
      {...rest}
      onChange={(e) => {
        const inputValue = e.target.value;

        if (inputValue.length && !Number(inputValue)) {
          return;
        }

        onChange(e);
      }}
    />
  );
};
