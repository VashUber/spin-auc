import { autorun } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { lotsStore } from '~/store';
import { drawCircle } from '~/utils/drawCircle';
import { DefaultButton, NumberInput } from '~atoms';
import { Wheel, WinnerDialog } from '~molecules';

export const Roulette = observer(() => {
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

    setTimeout(
      () => {
        spin.setWinner(key);
        spin.setWinnerDegree(0);
        spin.setIsRotating(false);
      },
      Number(spin.spinTime) * 1000
    );
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
    <div className="flex flex-col items-center gap-2">
      {spin.winner && (
        <WinnerDialog winner={spin.winner} setWinner={spin.setWinner} />
      )}

      <div className="flex gap-2">
        <NumberInput
          disabled={spin.isRotating}
          placeholder="Время прокрутки"
          value={spin.spinTime}
          onChange={(e) => spin.setSpinTime(e.target.value)}
        />
        <DefaultButton
          className="btn btn-info max-w-max"
          disabled={spin.isRotating}
          onClick={runSpinner}>
          Крутить
        </DefaultButton>
      </div>
      <Wheel
        ref={canvasRef}
        isRotating={spin.isRotating}
        degree={spin.winnerDegree}
        spinTime={Number(spin.spinTime)}
      />
    </div>
  );
});
