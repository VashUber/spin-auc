'use client';

import { Ref, forwardRef, useState } from 'react';
import styled, { StyleSheetManager, css, keyframes } from 'styled-components';

const rotate = (degree: number) => keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(${degree}deg);
  }
`;

const style = (degree: number, spinTime: number) => css`
  ${rotate(degree)} ${spinTime}s cubic-bezier(0, 0, 0.37, 1) forwards
`;

const StyledCanvas = styled.canvas<{
  isRotating: boolean;
  degree: number;
  spinTime: number;
}>`
  animation: ${({ isRotating, degree, spinTime }) =>
    isRotating ? style(degree, spinTime) : ''};
`;

export const Circle = forwardRef(
  (
    props: { isRotating: boolean; degree: number },
    ref: Ref<HTMLCanvasElement>
  ) => {
    const [spinTime, setSpinTime] = useState('20');
    const { isRotating, degree } = props;

    return (
      <div className="flex flex-col items-center">
        <input
          type="text"
          className="input input-bordered mb-2"
          value={spinTime}
          onChange={(e) => {
            const inputValue = e.target.value;

            if (inputValue.length && !Number(inputValue)) {
              return;
            }

            setSpinTime(inputValue);
          }}
        />

        <div className="w-0 h-0 border-l-transparent border-l-[20px] border-r-transparent border-r-[20px] border-t-[30px] border-t-gray-600" />

        <StyleSheetManager
          shouldForwardProp={(prop) =>
            prop !== 'isRotating' && prop !== 'degree' && prop !== 'spinTime'
          }>
          <StyledCanvas
            isRotating={isRotating}
            spinTime={Number(spinTime)}
            degree={degree + 360 * (Math.floor(Number(spinTime) / 1) + 2)}
            ref={ref}
            width={400}
            height={400}
          />
        </StyleSheetManager>
      </div>
    );
  }
);

Circle.displayName = 'Circle';
