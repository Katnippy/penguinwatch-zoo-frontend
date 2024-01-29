import { useState } from 'react';

import { DateTime } from 'luxon';

import { IZoo } from '../common/types';

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
  function addZoo(event: MouseEvent) {
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

  function handleNameChange(event: InputEvent) {
    setNewName((event.target as HTMLTextAreaElement).value);
  }

  function handleLocationChange(event: InputEvent) {
    setNewLocation((event.target as HTMLTextAreaElement).value);
  }

  function handleLatChange(event: InputEvent) {
    setNewLat((event.target as HTMLTextAreaElement).value);
  }

  function handleLngChange(event: InputEvent) {
    setNewLng((event.target as HTMLTextAreaElement).value);
  }

  function handleSpeciesChange(event: InputEvent) {
    setNewSpecies((event.target as HTMLTextAreaElement).value);
  }

  function handleCountChange(event: InputEvent) {
    setNewCount((event.target as HTMLTextAreaElement).value);
  }

  // TODO: Refactor.
  return (
    <>
      <h2>Add / Update Form</h2>
      <form onSubmit={addZoo}>
        <label htmlFor="name">Name: </label>
        <input id="name" value={newName} onChange={handleNameChange}
          required />
        <br />
        <label htmlFor="location">Location: </label>
        <input id="location" value={newLocation}
          onChange={handleLocationChange} required />
        <br />
        <label htmlFor="lat">Coordinates: </label>
        <input id="lat" value={newLat} onChange={handleLatChange}
        required />
        <input id="lng" value={newLng} onChange={handleLngChange}
        required />
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
