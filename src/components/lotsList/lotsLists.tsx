import { observer } from 'mobx-react-lite';
import { lotsStore } from '~/store';

export const LotsList = observer(() => {
  return (
    <div>
      {Array.from(lotsStore.lots.entries()).map((e) => (
        <div key={e[0]} className="flex gap-2">
          <div>{e[0]}</div>
          <div>{e[1]}</div>
        </div>
      ))}
    </div>
  );
});
