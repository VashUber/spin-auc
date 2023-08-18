import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { lotsStore } from '~/store';

export const AuctionStat = observer(() => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setIsTop(false);
        return;
      }

      setIsTop(true);
    };

    window.addEventListener('scroll', onScroll);

    return window.removeEventListener.bind(null, 'scroll', onScroll);
  }, []);

  return (
    <div
      className={`stats fixed left-0 shadow ${isTop ? 'bottom-0' : 'top-0'}`}>
      <div className="stat">
        <div className="stat-title">Общая сумма</div>
        <div className="stat-value">{lotsStore.bank}₽</div>
        <div className="stat-desc">Наибольший донат - {lotsStore.max}₽</div>
      </div>
    </div>
  );
});
