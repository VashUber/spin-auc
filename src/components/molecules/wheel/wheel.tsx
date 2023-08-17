import { forwardRef, useEffect, useRef } from 'react';
import { StyleSheetManager } from 'styled-components';
import { RotatingCanvas } from '~atoms';

interface CirclePropsI {
  isRotating: boolean;
  degree: number;
  spinTime: number;
}
type CircleRefT = HTMLCanvasElement;

export const Wheel = forwardRef<CircleRefT, CirclePropsI>((props, ref) => {
  const { isRotating, degree, spinTime } = props;
  const prevDegree = useRef(0);

  useEffect(() => {
    prevDegree.current = degree;
  }, [degree]);

  return (
    <div className="flex flex-col items-center overflow-hidden py-2">
      <div className="w-0 h-0 border-l-transparent border-l-[20px] border-r-transparent border-r-[20px] border-t-[30px] border-neutral" />

      <StyleSheetManager shouldForwardProp={(prop) => !prop.startsWith('$')}>
        <RotatingCanvas
          $isRotating={isRotating}
          $spinTime={spinTime}
          $degree={degree + 360 * (Math.floor(spinTime) + 2)}
          style={{
            transform: `rotate(${prevDegree.current}deg)`
          }}
          ref={ref}
          width={550}
          height={550}
        />
      </StyleSheetManager>
    </div>
  );
});

Wheel.displayName = 'Circle';
