import styled, { css, keyframes } from 'styled-components';

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

export const StyledCanvas = styled.canvas<{
  $isRotating: boolean;
  $degree: number;
  $spinTime: number;
}>`
  animation: ${({ $isRotating, $degree, $spinTime }) =>
    $isRotating ? style($degree, $spinTime) : ''};
`;
