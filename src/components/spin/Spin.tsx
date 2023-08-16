import { autorun } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Circle, WinnerAnnouncement } from '~/components';
import { lotsStore } from '~/store';
import { drawCircle } from '~/utils/drawCircle';

export const Spin = observer(() => {
  const colorMap = useRef<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const spin = useLocalObservable(() => ({
    isRotating: false,
    winnerDegree: 0,
    spinTime: '20',
    winner: '',

    setIsRotating(value: boolean) {
      this.isRotating = value;
    },
    setWinnerDegree(value: number) {
      this.winnerDegree = value;
    },
    setSpinTime(value: string) {
      this.spinTime = value;
    },
    setWinner(value: string) {
      this.winner = value;
    }
  }));

  const runSpinner = () => {
    if (lotsStore.lots.size === 0) return;

    const [key, angle] = lotsStore.getWinner()!;
    spin.setIsRotating(true);
    spin.setWinnerDegree(angle);

    setTimeout(() => {
      spin.setWinner(key);
      spin.setWinnerDegree(0);
      spin.setIsRotating(false);
    }, Number(spin.spinTime) * 1000);
  };

  useEffect(() => {
    const disposer = autorun((a) => {
      drawCircle(
        canvasRef.current,
        colorMap.current,
        lotsStore.lots,
        lotsStore.bank
      );
    });

    return disposer;
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      {spin.winner && (
        <WinnerAnnouncement winner={spin.winner} setWinner={spin.setWinner} />
      )}

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
