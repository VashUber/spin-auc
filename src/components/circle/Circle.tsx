import { Ref, forwardRef, useEffect, useRef } from 'react';
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
    props: { isRotating: boolean; degree: number; spinTime: number },
    ref: Ref<HTMLCanvasElement>
  ) => {
    const { isRotating, degree, spinTime } = props;
    const prevDegree = useRef(0);

    useEffect(() => {
      prevDegree.current = degree;
    }, [degree]);

    return (
      <div className="flex flex-col items-center overflow-hidden py-2">
        <div className="w-0 h-0 border-l-transparent border-l-[20px] border-r-transparent border-r-[20px] border-t-[30px] border-neutral" />

        <StyleSheetManager
          shouldForwardProp={(prop) =>
            prop !== 'isRotating' && prop !== 'degree' && prop !== 'spinTime'
          }>
          <StyledCanvas
            isRotating={isRotating}
            spinTime={spinTime}
            degree={degree + 360 * (Math.floor(spinTime) + 2)}
            style={{
              transform: `rotate(${prevDegree.current}deg)`
            }}
            ref={ref}
            width={500}
            height={500}
          />
        </StyleSheetManager>
      </div>
    );
  }
);

Circle.displayName = 'Circle';
