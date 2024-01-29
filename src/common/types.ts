export interface IZoo {
  id: number,
  name: string,
  location: string,
  coords: { lat: number, lng: number },
  penguins: Array<{ species: string, count: number | string }>,
  date: string,
};
