interface IZooable {
  name: string,
  location: string,
  coords: { lat: string, lng: string },
  penguins: Array<{ id: number, species: string, count: string }>,
}

interface IZooUpdateable {
  id: number,
  name: string,
  location: string,
  coords: { lat: number | string, lng: number | string },
  penguins: Array<{ id: number, species: string, count: number | string }>,
}

interface IZoo {
  id: number,
  name: string,
  location: string,
  coords: { lat: number, lng: number },
  penguins: Array<{ id: number, species: string, count: number | string }>,
  date: string,
}

type ChangeZooProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export type { IZooable, IZooUpdateable, IZoo, ChangeZooProps };
