import { ChangeEvent } from 'react';

type SelectProps = {
  name: string,
  text: string,
  value: string | undefined,
  onChange(event: ChangeEvent<HTMLInputElement> |
    ChangeEvent<HTMLSelectElement>): void,
};

export default function Select({ name, text, value, onChange }: SelectProps) {
  const penguins: Array<string> = [
    'King Penguins',
    'Emperor Penguins',
    'Adélie Penguins',
    'Chinstrap Penguins',
    'Gentoo Penguins',
    'Little Penguins',
    'Magellanic Penguins',
    'Humboldt Penguins',
    'Galápagos Penguins',
    'African Penguins',
    'Yellow-eyed Penguins',
    'Fiordland Penguins',
    'Snares Penguins',
    'Erect-crested Penguins',
    'Southern Rockhopper Penguins',
    'Northern Rockhopper Penguins',
    'Royal Penguins',
    'Macaroni Penguins'
  ];

  return (
    <>
      <label htmlFor={name}>{text}</label>
      <select id={name} value={value} onChange={onChange} required>
        {penguins.map((penguin) =>
          <option key={penguin} value={penguin}>{penguin}</option>)}
      </select>
    </>
  );
}