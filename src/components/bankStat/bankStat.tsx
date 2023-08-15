import { observer } from 'mobx-react-lite';
import { lotsStore } from '~/store';

export const BankStat = observer(() => {
  return (
    <div className="stats shadow fixed bottom-0 left-0">
      <div className="stat">
        <div className="stat-title">Общая сумма</div>
        <div className="stat-value">{lotsStore.bank}₽</div>
        <div className="stat-desc">Наибольшей донат - {lotsStore.max}</div>
      </div>
    </div>
  );
});
