import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';

import { DateTime } from 'luxon';

import { IZoo } from '../common/types';
import Notification from './Notification';
import Input from './Input';

type AddUpdateFormProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export default function AddUpdateForm({ zoos, setZoos }: AddUpdateFormProps) {
  const [notification, setNotification] = useState<object | { message: string, style: string }>({});
  const [newName, setNewName] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [newLat, setNewLat] = useState<string>('');
  const [newLng, setNewLng] = useState<string>('');
  const [newPenguins, setNewPenguins] =
    useState<Array<{ id: number, species: string, count: string }>>(
      [{ id: 1, species: 'King Penguins', count: '' }]
    );

  function validateZooObject(zooObject: IZoo) {
    const MIN_LAT: number = -90;
    const MAX_LAT: number = 90;
    const MIN_LNG: number = -180;
    const MAX_LNG: number = 180;

    function checkForDuplicateSpecies(zooObject: IZoo) {
      const species = zooObject.penguins.map((penguin) => penguin.species);
      const speciesSet = new Set(species);
      if (species.length !== speciesSet.size) {
        return true;
      } else {
        return false;
      }
    }

    if (zooObject.coords.lat <= MIN_LAT || zooObject.coords.lat >= MAX_LAT) {
      return false;
    } else if (zooObject.coords.lat <= MIN_LNG || zooObject.coords.lat >= MAX_LNG) {
      return false;
    } else if (checkForDuplicateSpecies(zooObject)) {
      return false;
    }

    return true;
  }
  function clearInputs() {
    setNewName('');
    setNewLocation('');
    setNewLat('');
    setNewLng('');
    setNewPenguins([{ id: 1, species: 'King Penguins', count: '' }]); // ! Broken.
  }
  // ! Needs validation.
  function addZoo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const zooObject: IZoo = {
      id: zoos.length + 1, // ! Bad, will break if a zoo is deleted.
      name: newName,
      location: newLocation, // ? Determine this from the coords?
      coords: { lat: +newLat, lng: +newLng },
      penguins: newPenguins.map((penguin) => {
        return {
          species: penguin.species,
          count: penguin.count === '0' ? 'Unknown' : +penguin.count
        };
      }),
      date: DateTime.now().toFormat('dd/MM/yy'),
    };
    if (validateZooObject(zooObject)) {
      setZoos(zoos.concat(zooObject));
      clearInputs();
    } else {
      alert('INVALID');
    }
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

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>,
                              id: number) {
    const updatedPenguins = newPenguins.map((penguin) =>
      penguin.id === id ? { ...penguin, species: event.target.value } : penguin
    );
    setNewPenguins(updatedPenguins);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>,
                             id: number) {
    const updatedPenguins = newPenguins.map((penguin) =>
      penguin.id === id ? { ...penguin, count: event.target.value } : penguin
    );
    setNewPenguins(updatedPenguins);
  }

  function addField(event: MouseEvent) {
    event.preventDefault();
    if (newPenguins.length < 18) {
      const newId = newPenguins.at(-1).id + 1; // ? Is this solution okay?
      setNewPenguins(
        [...newPenguins, { id: newId, species: 'King Penguins', count: '' }]
      );
    }
  }

  function deleteField(event: MouseEvent, idToRemove: number) {
    event.preventDefault();
    if (newPenguins.length > 0) {
      const updatedPenguins = newPenguins.filter(
        (penguin) => penguin.id !== idToRemove
      );
      setNewPenguins(updatedPenguins);
    }
  }

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

  // TODO: Refactor.
  return (
    <>
      <h2>Add / Update Form</h2>
      {/* ? Is there a better way to handle the conditional rendering here? */}
      {notification ? <Notification notification={notification} /> : ''}
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
        {/* ? Doesn't `<label>` really need a `htmlFor` attribute? */}
        <label>Penguins: </label>
        {newPenguins.map(({ id }) => (
          <div key={id}>
            <select onChange={(event) => handleSelectChange(event, id)}>
              {allSpecies.map((species) =>
                <option key={species} value={species}>{species}</option>)}
            </select>
            <input type="number"
              onChange={(event) => handleInputChange(event, id)}></input>
            <button onClick={(event) => addField(event)}>+</button>
            {newPenguins.length > 1 ?
              <button onClick={(event) => deleteField(event, id)}>
                -
              </button> : ''}
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </>
  );
}
