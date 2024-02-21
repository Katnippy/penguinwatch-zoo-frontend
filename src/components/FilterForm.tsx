import { useState } from 'react';
import { IZoo } from '../common/types';
import Fieldset from './Fieldset';

type FilterFormProps = {
  zoos: Array<IZoo>,
  setShownZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export default function FilterForm({ zoos, setShownZoos }: FilterFormProps) {
  // const [showWithinLocation, setShowWithinLocation] = useState(false);
  // const [showWithinCoords, setShowWithinCoords] = useState(false);
  const [checkedSpecies, setCheckedSpecies] = useState<Array<string>>([]);

  function filterZoos(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // ? Any way to make this more efficient with sets or something like that?
    // Set `shownZoos` to be every zoo that includes all of (but not only) the
    // checked species.
    setShownZoos(zoos.filter((zoo) =>
      checkedSpecies.every((cSpecies) =>
        (zoo.penguins.map((penguin) =>
          penguin.species).includes(cSpecies)))));
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
        {/* <label htmlFor="name">Name: </label>
        <input id="name" />
        <br />
        <label htmlFor="location">Location: </label>
        <input id="location" />
        <br /> */}
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
