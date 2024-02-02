import { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from 'react';

import { DateTime } from 'luxon';

import { IZoo } from '../common/types';
import Notifications from './Notifications';
import Input from './Input';

type AddUpdateFormProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export default function AddUpdateForm({ zoos, setZoos }: AddUpdateFormProps) {
  const [notifications, setNotifications] =
    useState<Array<{ message: string, style: string }>>([]);
  const [newName, setNewName] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [newLat, setNewLat] = useState<string>('');
  const [newLng, setNewLng] = useState<string>('');
  const [newPenguins, setNewPenguins] =
    useState<Array<{ id: number, species: string, count: string }>>([]);

  // Maybe a temporary fix because of
  // `setNewPenguins([{ id: 1, species: 'King Penguins', count: '' }])` in
  // `clearInputs()` not working as desired due to its async nature. Instead,
  // we forcefully `setNewPenguins()` every time `newPenguins` is cleared.
  useEffect(() => {
    if (newPenguins.length === 0) {
      setNewPenguins([{ id: 1, species: 'King Penguins', count: '' }]);
    }
  }, [newPenguins]);

  // ! Timer doesn't restart on cumulative notifications.
  function clearNotifications() {
    setTimeout(() => {
      setNotifications([]);
    }, 5000);
  }
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

    // TODO: Need validations for when name, location, or coords already exist.
    const validations = [];
    let validated = true;
    if (zooObject.coords.lat <= MIN_LAT || zooObject.coords.lat >= MAX_LAT) {
      validations.push(
        { message: 'Latitude must be between -90 and 90.', style: 'error' }
      );
      validated = false;
    }
    if (zooObject.coords.lng <= MIN_LNG || zooObject.coords.lng >= MAX_LNG) {
      validations.push(
        { message: 'Longitude must be between -180 and 180.', style: 'error' }
      );
      validated = false;
    }
    if (checkForDuplicateSpecies(zooObject)) {
      validations.push(
        { message: 'Duplicated species.', style: 'error' }
      );
      validated = false;
    }
    if (validated) {
      validations.push({
        message: `Successfully added ${zooObject.name} to the map.`,
        style: 'success'
      });
    }
    setNotifications(validations); // ? Shouldn't this go elsewhere?

    return validated;
  }
  function clearInputs() {
    setNewName('');
    setNewLocation('');
    setNewLat('');
    setNewLng('');
    setNewPenguins([]);
  }
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
      clearNotifications();
    } else {
      clearNotifications();
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
      {notifications ? <Notifications notifications={notifications} /> : ''}
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
