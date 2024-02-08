import { ChangeEvent } from 'react';

type SelectInputProps = {
  handleSelectChange(event: ChangeEvent<HTMLSelectElement>, id: number): void,
  id: number,
};

const allSpecies: Array<string> = [
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

export default function SelectInput({ handleSelectChange, id }
  : SelectInputProps) {
  return (
    <select onChange={(event) => handleSelectChange(event, id)}>
      {allSpecies.map((species) =>
        <option key={species} value={species}>{species}</option>)}
    </select>
  );
}
