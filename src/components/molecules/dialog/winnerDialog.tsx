import Confetti from 'react-confetti';
import { createPortal } from 'react-dom';
import { DefaultButton } from '~atoms';

interface WinnerDialogPropsI {
  winner: string;
  setWinner: (value: string) => void;
}

export const WinnerDialog = (props: WinnerDialogPropsI) => {
  const { winner, setWinner } = props;

  return createPortal(
    <div className="w-screen h-screen fixed top-0 left-0 bg-neutral bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <span>Победил вариант - {winner}</span>

        <DefaultButton onClick={() => setWinner('')}>Ок</DefaultButton>
      </div>

      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>,
    document.getElementById('body')!
  );
};
