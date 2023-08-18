import styled, { css, keyframes } from 'styled-components';

interface CanvasPropsI {
  $isRotating: boolean;
  $degree: number;
  $spinTime: number;
}

const rotate = (degree: number) => keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(${degree}deg);
  }
`;

const style = (degree: number, spinTime: number) => css`
  ${rotate(degree)} ${spinTime}s cubic-bezier(0.2, 0.75, 0.15, 1) forwards
`;

export const RotatingCanvas = styled.canvas<CanvasPropsI>`
  animation: ${({ $isRotating, $degree, $spinTime }) =>
    $isRotating ? style($degree, $spinTime) : ''};
`;
