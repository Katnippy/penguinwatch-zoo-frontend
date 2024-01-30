import { useState, FormEvent, ChangeEvent } from 'react';

import { DateTime } from 'luxon';

import { IZoo } from '../common/types';
import Input from './Input';
import Select from './Select';

type AddUpdateFormProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export default function AddUpdateForm({ zoos, setZoos }: AddUpdateFormProps) {
  const [newName, setNewName] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [newLat, setNewLat] = useState<string>('');
  const [newLng, setNewLng] = useState<string>('');
  const [newSpecies, setNewSpecies] = useState<string>('King Penguins');
  const [newCount, setNewCount] = useState<string>('');

  function clearInputs() {
    setNewName('');
    setNewLocation('');
    setNewLat('');
    setNewLng('');
    setNewSpecies('King Penguins');
    setNewCount('');
  }
  // ! Needs validation.
  // TODO: Let the user add as many species as they want.
  function addZoo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const zooObject: IZoo = {
      id: zoos.length + 1, // ! Bad, will break if a zoo is deleted.
      name: newName,
      location: newLocation,
      coords: { lat: +newLat, lng: +newLng },
      penguins: [
        {
          species: newSpecies,
          count: newCount === '0' ? 'Unknown' : +newCount
        }
      ],
      date: DateTime.now().toFormat('dd/MM/yy'),
    };
    setZoos(zoos.concat(zooObject));
    clearInputs();
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value);
  }

  function handleLocationChange(event: ChangeEvent<HTMLInputElement>) {
    setNewLocation(event.target.value);
  }

  function handleLatChange(event: ChangeEvent<HTMLInputElement>) {
    setNewLat(event.target.value);
  }

  function handleLngChange(event: ChangeEvent<HTMLInputElement>) {
    setNewLng(event.target.value);
  }

  function handleSpeciesChange(event: ChangeEvent<HTMLSelectElement>) {
    setNewSpecies(event.target.value);
  }

  function handleCountChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCount(event.target.value);
  }

  // TODO: Refactor.
  return (
    <>
      <h2>Add / Update Form</h2>
      <form onSubmit={addZoo}>
        <Input name={'name'} text={'Name: '} value={newName}
          onChange={handleNameChange} />
        <br />
        <Input name={'location'} text={'Location: '} value={newLocation}
          onChange={handleLocationChange} />
        <br />
        <Input name={'lat'} text={'Coordinates: '} value={newLat}
          onChange={handleLatChange} />
        <Input name={'lng'} text={''} value={newLng}
          onChange={handleLngChange} />
        <br />
        <Select name={'species'} text={'Penguins: '} value={newSpecies}
          onChange={handleSpeciesChange} />
        <input type="number" id="count" value={newCount}
          onChange={handleCountChange} min="0" max="250" required />
        <br />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
