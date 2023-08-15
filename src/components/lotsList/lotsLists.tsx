import { observer } from 'mobx-react-lite';
import { Lot } from '~/components';
import { lotsStore } from '~/store';

export const LotsList = observer(() => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from(lotsStore.lots.entries()).map((e) => (
        <div key={e[0]} className="flex gap-2">
          <Lot title={e[0]} total={e[1]} />
        </div>
      ))}
    </div>
  );
});
