import { IZoo } from '../common/types';

let validated = true;
let validations: Array<{ message: string, style: string }> = [];

const MIN_LAT: number = -90;
const MAX_LAT: number = 90;
const MIN_LNG: number = -180;
const MAX_LNG: number = 180;

// TODO: Need validations for when name, location, or coords already exist,
// TODO: and when coords aren't a valid number.
// function validateName(zooObject: IZoo) {

// }

// function validateLocation(zooObject: IZoo) {

// }

function validateCoords({ lat, lng }: { lat: number, lng: number }) {
  if (lat <= MIN_LAT || lat >= MAX_LAT) {
    validations.push(
      { message: 'Latitude must be between -90 and 90.', style: 'error' }
    );
    validated = false;
  }
  if (lng <= MIN_LNG || lng >= MAX_LNG) {
    validations.push(
      { message: 'Longitude must be between -180 and 180.', style: 'error' }
    );
    validated = false;
  }
}

function validatePenguins(
  penguins: Array<{ species: string, count: number | string }>) {
  const species = penguins.map((penguin) => penguin.species);
  const speciesSet = new Set(species);
  if (species.length !== speciesSet.size) {
    validations.push({ message: 'Duplicated species.', style: 'error' });
    validated = false;
  }
}

export default function validateZooObject(zooObject: IZoo) {
  // ? Better way to handle this (initialising then redefining `validated` &
  // ? `validations`)?
  validated = true;
  validations = [];

  validateCoords(zooObject.coords);
  validatePenguins(zooObject.penguins);
  if (validated) {
    validations.push({
      message: `Successfully added ${zooObject.name} to the map.`,
      style: 'success'
    });
  }

  return { validated, validations };
}
