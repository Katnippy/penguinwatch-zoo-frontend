import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';

import { IZoo, IZooable, ChangeZooProps } from '../common/types';
import validateZoo from '../utils/validator';
import zooService from '../services/zoos';
import Notifications from './Notifications';

type UpdateFormProps = ChangeZooProps;

export default function UpdateForm({ zoos, setZoos }: UpdateFormProps) {
  const [notifications, setNotifications] =
    useState<Array<{ message: string, style: string }>>([]);
  // ? Leave unselected by default? Then clear on update?
  const [selectedZoo, setSelectedZoo] = useState<IZoo | IZooable>(zoos.at(0)!);

  function clearNotifications() {
    setTimeout(() => {
      setNotifications([]);
    }, 5000);
  }

  async function updateZoo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { valid, validations } =
      validateZoo(selectedZoo as IZooable, zoos, false);
    // TODO: Normalise and validate zoo like in AddForm.
    if (valid) {
      try {
        // TODO: Change date of `selectedZoo`.
        const updatedZoo =
          await zooService.update(selectedZoo.id, selectedZoo);
        setZoos(
          zoos.map((zoo) => zoo.id !== selectedZoo.id ? zoo : updatedZoo));
        // TODO: Notification
        setNotifications(validations);
        clearNotifications();
      } catch (e) {
        console.error('Error updating data: ', e);
        // TODO: Notification
      }
    } else {
      setNotifications(validations);
      clearNotifications();
    }
  }

  function handleZooChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedZoo(zoos.find((zoo) => zoo.id === event.target.value)!);
  }

  // ! Some code reuse below (similar to AddForm).
  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedZoo({ ...selectedZoo, name: event.target.value });
  }

  function handleLocationChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedZoo({ ...selectedZoo, location: event.target.value });
  }

  function handleLatChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedZoo({
      ...selectedZoo,
      coords: { ...selectedZoo.coords, lat: event.target.value }
    });
  }

  function handleLngChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedZoo({
      ...selectedZoo,
      coords: { ...selectedZoo.coords, lng: event.target.value }
    });
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>,
    id: number) {
    const updatedPenguins = selectedZoo.penguins.map((penguin) =>
    penguin.id === id ? { ...penguin, species: event.target.value } : penguin
    );
    setSelectedZoo({ ...selectedZoo, penguins: updatedPenguins });
  }

  function handleNumberChange(event: ChangeEvent<HTMLInputElement>,
                              id: number) {
    const updatedPenguins = selectedZoo.penguins.map((penguin) =>
    penguin.id === id ? { ...penguin, count: event.target.value } : penguin
    );
    setSelectedZoo({ ...selectedZoo, penguins: updatedPenguins });
  }

  function addField(event: MouseEvent) {
    event.preventDefault();
    if (selectedZoo.penguins.length < 18) {
      const newId = selectedZoo.penguins.at(-1)!.id + 1; // ? Is this solution okay?
      setSelectedZoo({
        ...selectedZoo,
        penguins: [...selectedZoo.penguins,
                   { id: newId, species: 'King Penguins', count: '' }]
      });
    }
  }

  function deleteField(event: MouseEvent, idToRemove: number) {
    event.preventDefault();
    if (selectedZoo.penguins.length > 0) {
      const updatedPenguins = selectedZoo.penguins.filter(
        (penguin) => penguin.id !== idToRemove
      );
      setSelectedZoo({ ...selectedZoo, penguins: updatedPenguins });
    }
  }

  // TODO: Refactor.
  // TODO: Include `allSpecies`.
  // ! It's possible to delete all penguins fields right now.
  return (
    <>
      {notifications ? <Notifications notifications={notifications} /> : ''}
      <form onSubmit={(event) => void updateZoo(event)}>
        <label htmlFor="zoo">Zoo: </label>
        <select onChange={handleZooChange}>
          {zoos.map((zoo) =>
            <option key={zoo.name} value={zoo.id}>{zoo.name}</option>)}
        </select>
        <br />
        <label htmlFor="name">Name: </label>
        <input id="name" value={selectedZoo.name} onChange={handleNameChange}
          required />
        <br />
        <label htmlFor="location">Location: </label>
        <input id="location" value={selectedZoo.location}
          onChange={handleLocationChange} required />
        <br />
        <label htmlFor="lat">Coordinates: </label>
        <input id="lat" value={selectedZoo.coords.lat}
          onChange={handleLatChange} required />
        <input id="lng" value={selectedZoo.coords.lng}
          onChange={handleLngChange} required />
        <br />
        <label>Penguins: </label>
        {selectedZoo.penguins.map(({ id, species, count }) => (
          <div key={id}>
            <select onChange={(event) => handleSelectChange(event, id)}>
              <option key={id} value={species}>{species}</option>
            </select>
            <input type="number" value={count === 'Unknown' ? 0 : count}
              onChange={(event) => handleNumberChange(event, id)} min="0"
              max="250" required />
            <button onClick={addField}>+</button>
            <button onClick={(event) => deleteField(event, id)}>-</button>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </>
  );
}
