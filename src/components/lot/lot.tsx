import { FormEvent, useState } from 'react';
import { lotsStore } from '~/store';

interface LotPropsI {
  title: string;
  total: number;
}

export const Lot = ({ title, total }: LotPropsI) => {
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
          <h2 className="text-xl">{title}</h2>
          <div>{total}₽</div>
        </div>

        <form onSubmit={addValue} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Добавить сумму"
            className="input input-bordered w-40"
            value={additionalValue}
            onChange={(e) => {
              const inputValue = e.target.value;

              if (inputValue.length && !Number(inputValue)) {
                return;
              }

              setAdditionalValue(inputValue);
            }}
          />
          <button className="btn btn-info max-w-max">Добавить сумму</button>
        </form>
      </div>
    </div>
  );
};
