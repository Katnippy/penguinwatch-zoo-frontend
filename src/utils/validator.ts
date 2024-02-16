import { IZoo, IZooable, IZooUpdateable } from '../common/types';

let valid = true;
let validations: Array<{ message: string, style: string }> = [];

const MIN_NAME_LENGTH: number = 3;
const MAX_NAME_LENGTH: number = 80;
const MIN_LOCATION_LENGTH: number = 3;
const MAX_LOCATION_LENGTH: number = 100;
const MIN_LAT: number = -90;
const MAX_LAT: number = 90;
const MIN_LNG: number = -180;
const MAX_LNG: number = 180;

function validateName(name: string) {
  if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    validations.push(
      { message: 'Name must be between 3 and 80 characters.', style: 'error' }
    );
    valid = false;
  }
}
function validateLocation(location: string) {
  if (location.length < MIN_LOCATION_LENGTH ||
    location.length > MAX_LOCATION_LENGTH) {
    validations.push({
      message: 'Location must be between 3 and 100 characters.', style: 'error'
    });
    valid = false;
  }
}
// ? Refactor?
function validateCoords(
  { lat, lng }: { lat: string | number, lng: string | number }) {
  if (isNaN(lat)) {
    validations.push(
      { message: 'Latitude must be a valid number.', style: 'error' }
    );
    valid = false;
  }
  if (isNaN(lng)) {
    validations.push(
      { message: 'Longitude must be a valid number.', style: 'error' }
    );
    valid = false;
  }
  if (+lat <= MIN_LAT || +lat >= MAX_LAT) {
    validations.push(
      { message: 'Latitude must be between -90 and 90.', style: 'error' }
    );
    valid = false;
  }
  if (+lng <= MIN_LNG || +lng >= MAX_LNG) {
    validations.push(
      { message: 'Longitude must be between -180 and 180.', style: 'error' }
    );
    valid = false;
  }
}
function validatePenguins(
  penguins: Array<{ id: number, species: string, count: number | string }>) {
  const species = penguins.map((penguin) => penguin.species);
  const speciesSet = new Set(species);
  if (species.length !== speciesSet.size) {
    // ? Specify the species?
    validations.push({ message: 'Duplicated species.', style: 'error' });
    valid = false;
  }
}
// TODO: Check that the user isn't trying to update a zoo with the exact same
// TODO: inputs.
function validateUniqueness(
  name: string,
  location: string,
  coords: { lat: string | number, lng: string | number },
  penguins: Array<{ id: number, species: string, count: number | string }>,
  checkSelf: boolean,
  zoos: Array<IZoo>,
  id?: number
) {
  const filteredZoos = checkSelf ? zoos : zoos.filter((zoo) => zoo.id !== id);

  function isDuplicate(field: string, actual: string) {
    return filteredZoos.some((zoo) =>
      (zoo[field as keyof IZoo] as string).toLowerCase() ===
        actual.toLowerCase());
  }

  function isDuplicateCoords({ lat, lng }: { lat: string, lng: string }) {
    return filteredZoos.some((zoo) =>
      +parseFloat(zoo.coords.lat).toFixed(2) === +parseFloat(lat).toFixed(2))
      && filteredZoos.some((zoo) =>
      +parseFloat(zoo.coords.lng).toFixed(2) === +parseFloat(lng).toFixed(2));
  }

  function isUnchanged(
    updatedName: string,
    updatedLocation: string,
    updatedCoords: { lat: string | number, lng: string | number },
    updatedPenguins: Array<{ id: number, species: string, count: string }>
  ) {
    return zoos.find(({ name, location, coords, penguins }) => {
      return name === updatedName && location === updatedLocation &&
        coords === updatedCoords && penguins === updatedPenguins;
    });
  }

  if (isDuplicate('name', name)) {
    validations.push(
      { message: 'A zoo with this name already exists.', style: 'error' }
    );
    valid = false;
  }
  // TODO: Need to standardise location convention for this to actually work.
  if (isDuplicate('location', location)) {
    validations.push(
      { message: 'A zoo with this location already exists.', style: 'error' }
    );
    valid = false;
  }
  if (isDuplicateCoords(coords)) {
    validations.push({
      message: 'A zoo with these coordinates already exists.',
      style: 'error'
    });
    valid = false;
  }
  if (isUnchanged(name, location, coords, penguins)) {
    // ? Not sure about this message.
    validations.push({
      message: 'Error when trying to update a zoo without changing it first.',
      style: 'error'
    });
    valid = false;
  }

}
export default function validateZoo(
  { id = undefined, name, location, coords, penguins }:
    IZooable | IZooUpdateable,
  zoos: Array<IZoo>,
  checkSelf = true,
) {
  // ? Better way to handle this (initialising then redefining `valid` &
  // ? `validations`)?
  valid = true;
  validations = [];

  validateName(name);
  validateLocation(location);
  validateCoords(coords);
  validatePenguins(penguins);
  validateUniqueness(name, location, coords, penguins, checkSelf, zoos, id);

  if (valid && checkSelf) {
    validations.push({
      message: `Successfully added ${name} to the map.`,
      style: 'success'
    });
  } else if (valid && !checkSelf) {
    validations.push({
      message: `Successfully updated ${name}.`,
      style: 'success'
    });
  }

  return { valid, validations };
}
