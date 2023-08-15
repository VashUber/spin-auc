'use client';

import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Circle, NewLotForm } from '~/components';
import { lotsStore } from '~/store';
import { drawCircle } from '~/utils/drawCircle';

const Home = observer(function () {
  const colorMap = useRef<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    autorun(() => {
      drawCircle(
        canvasRef.current,
        colorMap.current,
        lotsStore.lots,
        lotsStore.bank
      );
    });
  }, []);

  return (
    <div>
      <NewLotForm />

      <div className="flex justify-between">
        <div>
          {Array.from(lotsStore.lots.entries()).map((e) => (
            <div key={e[0]} className="flex gap-2">
              <div>{e[0]}</div>
              <div>{e[1]}</div>
            </div>
          ))}
        </div>

        <Circle ref={canvasRef} />
      </div>
    </div>
  );
});

export default Home;
