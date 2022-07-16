import React from 'react';

interface Props {}

export function Header(props: Props) {
  return (
    <div className="text-center">
      <h1 className="text-4xl text-teal-400 leading-loose">Number game!</h1>
      <p className="text-sm text-slate-300">
        Move the numbers around until they are in the right position:
        <br />
        From 1 to the last number, taking up rows from left to right.
        <br />
        The gap should end up in the last spot (bottom right).
      </p>
    </div>
  );
}
