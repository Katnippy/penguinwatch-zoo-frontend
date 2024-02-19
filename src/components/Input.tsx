import { ChangeEvent } from 'react';

type InputProps = {
  name: string,
  text: string,
  // ? Should we accept undefined since input is required anyway?
  value: string | number | undefined,
  onChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ): void,
};

export default function Input({ name, text, value, onChange }: InputProps) {
  return (
    <>
      <label htmlFor={name}>{text}</label>
      <input id={name} value={value} onChange={onChange} required />
    </>
  );
}
