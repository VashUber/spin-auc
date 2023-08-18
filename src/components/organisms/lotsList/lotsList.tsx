import { observer } from 'mobx-react-lite';
import { lotsStore } from '~/store';
import { Lot } from '~molecules';

export const LotsList = observer(() => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from(lotsStore.lots.entries()).map((e) => (
        <Lot
          key={e[0]}
          title={e[0]}
          total={e[1]}
          deleteLot={lotsStore.deleteLot}
        />
      ))}
    </div>
  );
});
