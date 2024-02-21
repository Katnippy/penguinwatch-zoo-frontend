import { useState } from 'react';

import { IZoo } from '../common/types';
import Input from './Input';
import Fieldset from './Fieldset';

type FilterFormProps = {
  zoos: Array<IZoo>,
  setShownZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export default function FilterForm({ zoos, setShownZoos }: FilterFormProps) {
  const [filteredName, setFilteredName] = useState('');
  const [filteredLocation, setFilteredLocation] = useState('');
  // const [showWithinLocation, setShowWithinLocation] = useState(false);
  // const [showWithinCoords, setShowWithinCoords] = useState(false);
  const [checkedSpecies, setCheckedSpecies] = useState<Array<string>>([]);

  // TODO: Refactor.
  function filterZoos(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setShownZoos(zoos.filter((zoo) =>
      zoo.name.toLowerCase().includes(filteredName.toLowerCase())));
    setShownZoos((shownZoos) => shownZoos.filter((zoo) =>
      zoo.location.toLowerCase().includes(filteredLocation.toLowerCase())));
    // ? Any way to make this more efficient with sets or something like that?
    // Set `shownZoos` to be every zoo already being shown that includes all of
    // (but not only) the checked species.
    setShownZoos((shownZoos) => shownZoos.filter((zoo) =>
      checkedSpecies.every((cSpecies) =>
        (zoo.penguins.map((penguin) => penguin.species).includes(cSpecies)))));
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilteredName(event.target.value);
  }

  function handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilteredLocation(event.target.value);
  }

  function handleSpeciesChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!checkedSpecies.includes(event.target.value)) {
      setCheckedSpecies([...checkedSpecies, event.target.value]);
    } else {
      setCheckedSpecies(
        checkedSpecies.filter((species) => species !== event.target.value)
      );
    }
  }

  return (
    <>
      <form onSubmit={filterZoos}>
        <Input name={'name'} text={'Name: '} value={filteredName}
          onChange={handleNameChange} required={false} />
        <br />
        <Input name={'location'} text={'Location: '}
          value={filteredLocation} onChange={handleLocationChange}
          required={false} />
        <br />
        {/* {showWithinLocation ? <Fieldset name={'location'} /> : '' } */}
        {/* <label htmlFor="lat">Coordinates: </label>
        <input id="lat" />
        <input id="lng" />
        <br /> */}
        {/* {showWithinCoords ? <Fieldset name={'coords'} /> : '' } */}
        <Fieldset name={'species'} onChange={handleSpeciesChange} />
        {/* <br />
        <label htmlFor="num-species">How many species?: </label>
        <input type="number" id="num-species" />
        <br />
        <label htmlFor="num-penguins">How many penguins?: </label>
        <input type="number" id="num-penguins" /> */}
        <button type="submit">Filter</button>
      </form>
    </>
  );
}
