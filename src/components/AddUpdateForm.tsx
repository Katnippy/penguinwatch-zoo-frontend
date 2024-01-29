import { useState, FormEvent, ChangeEvent } from 'react';

import { DateTime } from 'luxon';

import { IZoo } from '../common/types';
import Input from './Input';

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
        <label htmlFor="species">Penguins: </label>
        <select id="species" value={newSpecies}
          onChange={handleSpeciesChange} required>
          <option value="King Penguins">King Penguins</option>
          <option value="Emperor Penguins">Emperor Penguins</option>
          <option value="Adélie Penguins">Adélie Penguins</option>
          <option value="Chinstrap Penguins">Chinstrap Penguins</option>
          <option value="Gentoo Penguins">Gentoo Penguins</option>
          <option value="Little Penguins">Little Penguins</option>
          <option value="Magellanic Penguins">Magellanic Penguins</option>
          <option value="Humboldt Penguins">Humboldt Penguins</option>
          <option value="Galápagos Penguins">Galápagos Penguins</option>
          <option value="African Penguins">African Penguins</option>
          <option value="Yellow-eyed Penguins">Yellow-eyed Penguins</option>
          <option value="Fiordland Penguins">Fiordland Penguins</option>
          <option value="Snares Penguins">Snares Penguins</option>
          <option value="Erect-crested Penguins">
            Erect-crested Penguins
          </option>
          <option value="Southern Rockhopper Penguins">
            Southern Rockhopper Penguins
          </option>
          <option value="Northern Rockhopper Penguins">
            Northern Rockhopper Penguins
          </option>
          <option value="Royal Penguins">Royal Penguins</option>
          <option value="Macaroni Penguins">Macaroni Penguins</option>
        </select>
        <input type="number" id="count" value={newCount}
          onChange={handleCountChange} min="0" max="250" required />
        <br />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
