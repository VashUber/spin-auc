import { FormEvent, memo, useState } from 'react';
import { lotsStore } from '~/store';
import { DefaultButton, NumberInput } from '~atoms';

interface LotPropsI {
  title: string;
  total: number;
}

export const Lot = memo(({ title, total }: LotPropsI) => {
  const [additionalValue, setAdditionalValue] = useState('');

  const addValue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    lotsStore.addLot({ key: title, value: Number(additionalValue) });

    setAdditionalValue('');
  };

  return (
    <div className="w-full bg-neutral text-primary-content rounded-lg px-4 py-2">
      <div className="text-neutral-content flex gap-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-xl truncate w-40">{title}</h2>
          <div>{total}₽</div>
        </div>

        <form onSubmit={addValue} className="flex gap-2 items-center">
          <NumberInput
            placeholder="Добавить сумму"
            className="w-40"
            value={additionalValue}
            onChange={(e) => setAdditionalValue(e.target.value)}
          />

          <DefaultButton className="btn btn-info max-w-max">
            Добавить сумму
          </DefaultButton>
        </form>
      </div>
    </div>
  );
});

Lot.displayName = 'Lot';
