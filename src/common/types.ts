interface IZooable {
  name: string,
  location: string,
  coords: {
    lat: string,
    lng: string
  },
  penguins: Array<{ id: number, species: string, count: string }>,
}

interface IZoo {
  id: number,
  name: string,
  location: string,
  coords: { lat: number, lng: number },
  penguins: Array<{ species: string, count: number | string }>,
  date: string,
};

export type { IZooable, IZoo };
