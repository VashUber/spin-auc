import Confetti from 'react-confetti';
import { createPortal } from 'react-dom';
import { DefaultButton } from '~atoms';

interface WinnerDialogPropsI {
  winner: string;
  resetWheel: Function;
}

export const WinnerDialog = (props: WinnerDialogPropsI) => {
  const { winner, resetWheel } = props;

  return createPortal(
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-neutral bg-opacity-50">
      <div className="flex flex-col items-center gap-2">
        <span>Победил лот - {winner}</span>

        <DefaultButton onClick={() => resetWheel()}>Ок</DefaultButton>
      </div>

      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>,
    document.getElementById('body')!
  );
};
