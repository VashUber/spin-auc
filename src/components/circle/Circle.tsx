'use client';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { lotsStore } from '~/store';
import { drawCircle } from '~/utils/drawCircle';

export const Circle = observer(() => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState(0);

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
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        value={value === 0 ? '' : value}
        onChange={(e) => setValue(+e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />

      <button onClick={() => lotsStore.addLot({ key, value })}>
        click to add slot
      </button>

      {Array.from(lotsStore.lots.entries()).map((e) => (
        <div key={e[0]} className="flex gap-2">
          <div>{e[0]}</div>
          <div>{e[1]}</div>
        </div>
      ))}

      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        //className="animate-spin"
      ></canvas>
    </div>
  );
});
