'use client';

import Confetti from 'react-confetti';
import { createPortal } from 'react-dom';

interface WinnerAnnouncementPropsI {
  winner: string;
  setWinner: (value: string) => void;
}

export const WinnerAnnouncement = (props: WinnerAnnouncementPropsI) => {
  const { winner, setWinner } = props;

  return createPortal(
    <div className="w-screen h-screen fixed top-0 left-0 bg-neutral bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <span>Победил вариант - {winner}</span>

        <button className="btn btn-info" onClick={() => setWinner('')}>
          Ок
        </button>
      </div>

      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>,
    document.getElementById('body')!
  );
};
