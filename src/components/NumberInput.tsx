import { ChangeEvent } from 'react';

type NumberInputProps = {
  handleNumberChange(event: ChangeEvent<HTMLInputElement>, id: number): void,
  id: number,
};

export default function NumberInput({ handleNumberChange, id }
  : NumberInputProps) {
  return (
    <input type="number" onChange={(event) => handleNumberChange(event, id)}
      min="0" max="250" required />
  );
}
