import { autorun } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Circle } from '~/components';
import { lotsStore } from '~/store';
import { drawCircle } from '~/utils/drawCircle';

export const Spin = observer(() => {
  const colorMap = useRef<Record<string, string>>({});
  const degreeMap = useRef<Record<string, number>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const spin = useLocalObservable(() => ({
    isRotating: false,
    winnerDegree: 0,
    spinTime: '20',

    setIsRotating(value: boolean) {
      this.isRotating = value;
    },
    setWinnerDegree(value: number) {
      this.winnerDegree = value;
    },
    setSpinTime(value: string) {
      this.spinTime = value;
    }
  }));

  const runSpinner = () => {
    if (lotsStore.lots.size === 0) return;

    const key = lotsStore.getWinner()!;
    spin.setIsRotating(true);
    spin.setWinnerDegree(degreeMap.current[key]);

    setTimeout(() => {
      spin.setWinnerDegree(0);
      spin.setIsRotating(false);
    }, Number(spin.spinTime) * 1000);
  };

  useEffect(() => {
    const disposer = autorun((a) => {
      drawCircle(
        canvasRef.current,
        colorMap.current,
        degreeMap.current,
        lotsStore.lots,
        lotsStore.bank
      );
    });

    return disposer;
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2">
        <input
          type="text"
          disabled={spin.isRotating}
          className="input input-bordered mb-2"
          placeholder="Время прокрутки"
          value={spin.spinTime}
          onChange={(e) => {
            const inputValue = e.target.value;

            if (inputValue.length && !Number(inputValue)) {
              return;
            }

            spin.setSpinTime(inputValue);
          }}
        />
        <button
          className="btn btn-info max-w-max"
          disabled={spin.isRotating}
          onClick={runSpinner}>
          Крутить
        </button>
      </div>
      <Circle
        ref={canvasRef}
        isRotating={spin.isRotating}
        degree={spin.winnerDegree}
        spinTime={Number(spin.spinTime)}
      />
    </div>
  );
});
