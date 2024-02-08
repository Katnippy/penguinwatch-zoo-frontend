import { MouseEvent } from 'react';

type PenguinsInputsButtonProps = {
  onClick(event: MouseEvent, idToRemove?: number): void,
  id?: number,
  text: string,
};

export default function PenguinsInputsButton({ onClick, id = undefined, text }
  : PenguinsInputsButtonProps) {
  return <button onClick={(event) => onClick(event, id)}>{text}</button>;
}
