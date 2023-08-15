import { FormEvent, useState } from 'react';
import { lotsStore } from '~/store';

export const NewLotForm = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !value) return;

    lotsStore.addLot({ key: name, value: Number(value) });
    setName('');
    setValue('');
  };

  return (
    <form className="flex flex-col gap-4 py-2" onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Название лота"
        className="input input-bordered"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Сумма лота"
        className="input input-bordered"
        value={value}
        onChange={(e) => {
          const inputValue = e.target.value;

          if (inputValue.length && !Number(inputValue)) {
            return;
          }

          setValue(inputValue);
        }}
      />
      <button className="btn btn-info max-w-max">Добавить лот</button>
    </form>
  );
};
