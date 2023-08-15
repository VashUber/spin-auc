'use client';

import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Circle, NewLotForm } from '~/components';
import { lotsStore } from '~/store';
import { drawCircle } from '~/utils/drawCircle';

const Home = observer(function () {
  const colorMap = useRef<Record<string, string>>({});
  const degreeMap = useRef<Record<string, number>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [isRotating, setIsRotation] = useState(false);
  const [winnerDegree, setWinnerDegree] = useState(0);

  const runSpinner = () => {
    if (lotsStore.lots.size === 0) return;

    setIsRotation(true);
    const key = lotsStore.getWinner()!;
    console.log(key);
    const degree = degreeMap.current[key];
    setWinnerDegree(degree);
  };

  useEffect(() => {
    autorun(() => {
      drawCircle(
        canvasRef.current,
        colorMap.current,
        degreeMap.current,
        lotsStore.lots,
        lotsStore.bank
      );
    });
  }, []);

  return (
    <div>
      <NewLotForm />

      {JSON.stringify(degreeMap.current)}

      <div className="flex justify-between px-48">
        <div>
          {Array.from(lotsStore.lots.entries()).map((e) => (
            <div key={e[0]} className="flex gap-2">
              <div>{e[0]}</div>
              <div>{e[1]}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Circle
            ref={canvasRef}
            isRotating={isRotating}
            degree={winnerDegree}
          />

          <button className="btn btn-info max-w-max" onClick={runSpinner}>
            Run
          </button>
        </div>
      </div>
    </div>
  );
});

export default Home;
