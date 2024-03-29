import { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from 'react';

import { DateTime } from 'luxon';

import { IZooable, IZoo, ChangeZooProps } from '../common/types';
import validateZoo from '../utils/validator';
import zooService from '../services/zoos';
import Notifications from './Notifications';
import Input from './Input';
import PenguinsInputs from './PenguinsInputs';
import SubmitButton from './SubmitButton';

type AddFormProps = ChangeZooProps;

export default function AddForm({ zoos, setZoos }: AddFormProps) {
  const [notifications, setNotifications] =
    useState<Array<{ message: string, style: string }>>([]);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newLat, setNewLat] = useState(''); // ? Combine as coords?
  const [newLng, setNewLng] = useState('');
  const [newPenguins, setNewPenguins] =
    useState<Array<{ id: number, species: string, count: string }>>([]);

  // Maybe a temporary fix because of
  // `setNewPenguins([{ id: 1, species: 'King Penguins', count: '' }])` in
  // `clearInputs()` not working as desired due to its quasi-async nature.
  // Instead, we forcefully `setNewPenguins()` every time `newPenguins` is
  // cleared.
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
  function clearInputs() {
    setNewName('');
    setNewLocation('');
    setNewLat('');
    setNewLng('');
    setNewPenguins([]);
  }
  // ? Refactor?
  async function addZoo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const unvalidatedZoo: IZooable = {
      name: newName,
      location: newLocation, // ? Determine this from the coords?
      coords: {
        lat: newLat,
        lng: newLng
      },
      penguins: newPenguins,
    };
    const { valid, validations } = validateZoo(unvalidatedZoo, zoos);
    if (valid) {
      const zoo: IZoo = {
        id: (+(zoos.at(-1).id) + 1).toString(),
        name: newName,
        location: newLocation, // ? Determine this from the coords?
        coords: {
          lat: +parseFloat(newLat).toFixed(4),
          lng: +parseFloat(newLng).toFixed(4)
        },
        penguins: newPenguins.map((penguin) => {
          return {
            id: penguin.id,
            species: penguin.species,
            count: penguin.count === '0' ? 'Unknown' : +penguin.count
          };
        }),
        date: DateTime.now().toFormat('dd/MM/yy'),
      };
      const updatedZoo = await zooService.create(zoo);
      setZoos(zoos.concat(updatedZoo));
      clearInputs();
      setNotifications(validations);
      clearNotifications();
    } else {
      setNotifications(validations);
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

  function handleNumberChange(event: ChangeEvent<HTMLInputElement>,
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

  return (
    <>
      {/* ? Is there a better way to handle the conditional rendering here? */}
      {notifications ? <Notifications notifications={notifications} /> : ''}
      <form onSubmit={(event) => void addZoo(event)}>
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
        <PenguinsInputs penguins={newPenguins}
          handleSelectChange={handleSelectChange}
          handleNumberChange={handleNumberChange} addField={addField}
          deleteField={deleteField} />
        <SubmitButton text={'Submit'} />
      </form>
    </>
  );
}
