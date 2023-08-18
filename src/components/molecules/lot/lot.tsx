import { FormEvent, memo, useState } from 'react';
import { CircleButton, DefaultButton, NumberInput } from '~atoms';

interface LotPropsI {
  title: string;
  total: number;
  deleteLot: (key: string) => void;
  addValueToLot: (lot: { key: string; value: number }) => void;
}

export const Lot = memo(
  ({ title, total, deleteLot, addValueToLot }: LotPropsI) => {
    const [additionalValue, setAdditionalValue] = useState('');

    const addValue = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      addValueToLot({ key: title, value: Number(additionalValue) });

      setAdditionalValue('');
    };

    return (
      <div className="group relative w-full rounded-lg bg-neutral px-4 py-2 text-primary-content">
        <div className="flex items-center justify-between gap-4 text-neutral-content">
          <div className="flex items-center gap-2">
            <h2 className="w-40 truncate text-xl">{title}</h2>
            <div>{total}₽</div>
          </div>

          <form onSubmit={addValue} className="flex items-center gap-2">
            <NumberInput
              placeholder="Сумма"
              className="w-40"
              value={additionalValue}
              onChange={(e) => setAdditionalValue(e.target.value)}
            />

            <DefaultButton className="max-w-max">Добавить сумму</DefaultButton>
          </form>
        </div>

        <CircleButton
          className="btn-error absolute -right-5 -top-5 hidden text-base-content group-hover:block"
          onClick={() => deleteLot(title)}>
          x
        </CircleButton>
      </div>
    );
  }
);

Lot.displayName = 'Lot';
