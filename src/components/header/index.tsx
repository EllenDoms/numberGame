import React from 'react';

interface Props {}

export function Header(props: Props) {
  return (
    <div className="text-center">
      <h1 className="text-4xl text-teal-400">Number game!</h1>
      <p className="text-sm text-slate-400">
        Move the numbers until they are in the right position
      </p>
    </div>
  );
}
