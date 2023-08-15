'use client';

import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { BankStat, Circle, LotsList, NewLotForm } from '~/components';
import { lotsStore } from '~/store';
import { drawCircle } from '~/utils/drawCircle';

const Home = observer(function () {
  const colorMap = useRef<Record<string, string>>({});
  const degreeMap = useRef<Record<string, number>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [isRotating, setIsRotation] = useState(false);
  const [winnerDegree, setWinnerDegree] = useState(-1);
  const [spinTime, setSpinTime] = useState('20');

  const runSpinner = () => {
    if (lotsStore.lots.size === 0) return;

    setIsRotation(true);
    const key = lotsStore.getWinner()!;
    const degree = degreeMap.current[key];
    setWinnerDegree(degree);

    setTimeout(() => {
      setIsRotation(false);
      setWinnerDegree(-1);
    }, Number(spinTime) * 1000);
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
    <div className="flex flex-col gap-4 py-4">
      <NewLotForm />

      <div className="flex justify-between">
        <LotsList />

        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered mb-2"
              placeholder="Время прокрутки"
              value={spinTime}
              onChange={(e) => {
                const inputValue = e.target.value;

                if (inputValue.length && !Number(inputValue)) {
                  return;
                }

                setSpinTime(inputValue);
              }}
            />
            <button className="btn btn-info max-w-max" onClick={runSpinner}>
              Крутить
            </button>
          </div>
          <Circle
            ref={canvasRef}
            isRotating={isRotating}
            degree={winnerDegree}
            spinTime={Number(spinTime)}
          />
        </div>
      </div>

      <BankStat />
    </div>
  );
});

export default Home;
