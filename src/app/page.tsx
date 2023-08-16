'use client';

import { BankStat, LotsList, NewLotForm, Spin } from '~/components';

const Home = function () {
  return (
    <div className="flex flex-col gap-4 py-4">
      <NewLotForm />

      <div className="flex justify-between">
        <LotsList />

        <Spin />
      </div>

      <BankStat />
    </div>
  );
};

export default Home;
