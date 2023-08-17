import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormEvent } from 'react';
import { lotsStore } from '~/store';
import { DefaultButton, NumberInput, TextInput } from '~atoms';

export const LotForm = observer(() => {
  const formState = useLocalObservable(() => ({
    key: '',
    value: '',

    setValue(value: string) {
      this.value = value;
    },
    setKey(value: string) {
      this.key = value;
    }
  }));

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.key || !formState.value) return;

    lotsStore.addLot({ key: formState.key, value: Number(formState.value) });
    formState.setKey('');
    formState.setValue('');
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onFormSubmit}>
      <TextInput
        value={formState.key}
        placeholder="Название лота"
        onChange={(e) => formState.setKey(e.target.value)}
      />
      <NumberInput
        value={formState.value}
        onChange={(e) => formState.setValue(e.target.value)}
        placeholder="Сумма лота"
      />
      <DefaultButton>Добавить лот</DefaultButton>
    </form>
  );
});
