import { Ref, forwardRef } from 'react';

export const Circle = forwardRef((props, ref: Ref<HTMLCanvasElement>) => {
  return <canvas ref={ref} width={650} height={650} />;
});

Circle.displayName = 'Circle';
