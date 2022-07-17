import React from 'react';

interface Props {
  number: number;
  onClick: () => void;
}

export function OneNumber({ number, onClick }: Props) {
  return number === 0 ? (
    <div />
  ) : (
    <div
      onClick={onClick}
      className="text-xl cursor-pointer select-none rounded-lg text-teal-900 px-10 py-8 border-4 border-l-white border-t-white border-b-slate-300 border-r-slate-300 bg-slate-100 hover:border-6 hover:px-10 hover:py-8"
    >
      {number}
    </div>
  );
}

export function OneNumberGap() {
  return <div className="px-10 py-8"></div>;
}
