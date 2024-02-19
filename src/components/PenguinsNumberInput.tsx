import { ChangeEvent } from 'react';

type PenguinsNumberInputProps = {
  handleNumberChange(event: ChangeEvent<HTMLInputElement>, id: number): void,
  id: number,
  count?: string | number,
};

export default function PenguinsNumberInput({ handleNumberChange, id, count }
  : PenguinsNumberInputProps) {
  return (
    <input type="number" value={count}
      onChange={(event) => handleNumberChange(event, id)} min="0" max="250"
      required />
  );
}
