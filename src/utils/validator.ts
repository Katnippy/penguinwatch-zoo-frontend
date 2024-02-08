import { IZooable, IZoo } from '../common/types';

let validated = true;
let validations: Array<{ message: string, style: string }> = [];

const MIN_NAME_LENGTH: number = 3;
const MAX_NAME_LENGTH: number = 80;
const MIN_LOCATION_LENGTH: number = 3;
const MAX_LOCATION_LENGTH: number = 100;
const MIN_LAT: number = -90;
const MAX_LAT: number = 90;
const MIN_LNG: number = -180;
const MAX_LNG: number = 180;

function validateName(name: string, zoos: Array<IZoo>) {
  if (
    zoos.map((zoo) => zoo.name.toLowerCase())
        .includes(name.toLowerCase())
  ) {
    validations.push(
      { message: 'A zoo with this name already exists.', style: 'error' }
    );
    validated = false;
  }
  if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    validations.push(
      { message: 'Name must be between 3 and 80 characters.', style: 'error' }
    );
    validated = false;
  }
}

function validateLocation(location: string, zoos: Array<IZoo>) {
// TODO: Need to standardise location convention for this to actually work.
  if (
    zoos.map((zoo) => zoo.location.toLowerCase())
        .includes(location.toLowerCase())
  ) {
    validations.push(
      { message: 'A zoo with this location already exists.', style: 'error' }
    );
    validated = false;
  }
  if (location.length < MIN_LOCATION_LENGTH ||
    location.length > MAX_LOCATION_LENGTH) {
    validations.push({
      message: 'Location must be between 3 and 100 characters.', style: 'error'
    });
    validated = false;
  }
}

function validateCoords(
  { lat, lng }: { lat: string, lng: string }, zoos: Array<IZoo>) {
  if (isNaN(lat)) {
    validations.push(
      { message: 'Latitude must be a valid number.', style: 'error' }
    );
    validated = false;
  }
  if (isNaN(lng)) {
    validations.push(
      { message: 'Longitude must be a valid number.', style: 'error' }
    );
    validated = false;
  }
  if (+lat <= MIN_LAT || +lat >= MAX_LAT) {
    validations.push(
      { message: 'Latitude must be between -90 and 90.', style: 'error' }
    );
    validated = false;
  }
  if (+lng <= MIN_LNG || +lng >= MAX_LNG) {
    validations.push(
      { message: 'Longitude must be between -180 and 180.', style: 'error' }
    );
    validated = false;
  }
  if (
    zoos.map((zoo) => +parseFloat(zoo.coords.lat).toFixed(2))
        .includes(+parseFloat(lat).toFixed(2))
    && zoos.map((zoo) => +parseFloat(zoo.coords.lng).toFixed(2))
           .includes(+parseFloat(lng).toFixed(2))
  ) {
    validations.push({
      message: 'A zoo with these coordinates already exists.',
      style: 'error'
    });
    validated = false;
  }
}

function validatePenguins(
  penguins: Array<{ species: string, count: number}>) {
  const species = penguins.map((penguin) => penguin.species);
  const counts = penguins.map((penguin) => penguin.count);

  const speciesSet = new Set(species);
  if (species.length !== speciesSet.size) {
    // ? Specify the species?
    validations.push({ message: 'Duplicated species.', style: 'error' });
    validated = false;
  }

  if (!counts.every((count) => count >= 0 && count <= 250)) {
    validations.push(
      { message: 'Count must be between 0 (unknown) and 250.', style: 'error' }
    );
    validated = false;
  }
}

export default function validateZoo(
  { name, location, coords, penguins }: IZooable,
  zoos: Array<IZoo>
) {
  // ? Better way to handle this (initialising then redefining `validated` &
  // ? `validations`)?
  validated = true;
  validations = [];

  validateName(name, zoos);
  validateLocation(location, zoos);
  validateCoords(coords, zoos);
  validatePenguins(penguins);
  if (validated) {
    validations.push({
      message: `Successfully added ${name} to the map.`,
      style: 'success'
    });
  }

  return { validated, validations };
}
