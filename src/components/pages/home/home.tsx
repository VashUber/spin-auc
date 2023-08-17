'use client';

import { AuctionStat, LotForm } from '~molecules';
import { LotsList, Roulette } from '~organisms';

export const Home = function () {
  return (
    <div className="flex flex-col gap-4 py-4">
      <LotForm />

      <div className="flex justify-between">
        <LotsList />

        <Roulette />
      </div>

      <AuctionStat />
    </div>
  );
};
