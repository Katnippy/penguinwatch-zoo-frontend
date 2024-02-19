import { ChangeEvent } from 'react';

type PenguinsSelectInputProps = {
  handleSelectChange(event: ChangeEvent<HTMLSelectElement>, id: number): void,
  id: number,
  species?: string,
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

export default function PenguinsSelectInput({ handleSelectChange, id, species }
  : PenguinsSelectInputProps) {
  return (
    <select value={species} onChange={(event) => handleSelectChange(event, id)}>
      {allSpecies.map((asSpecies) =>
        <option key={asSpecies} value={asSpecies}>{asSpecies}</option>)}
    </select>
  );
}
