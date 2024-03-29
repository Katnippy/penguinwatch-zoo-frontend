interface IZooable {
  name: string,
  location: string,
  coords: { lat: string, lng: string },
  penguins: Array<{ id: number, species: string, count: string }>,
}

interface IZooUpdateable {
  id: string,
  name: string,
  location: string,
  coords: { lat: number | string, lng: number | string },
  flagged: boolean,
  penguins: Array<{ id: number, species: string, count: number | string }>,
}

interface IZoo {
  id: string,
  name: string,
  location: string,
  coords: { lat: number, lng: number },
  penguins: Array<{ id: number, species: string, count: number | string }>,
  flagged: boolean,
  date: string,
}

type ChangeZooProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

type MapProps = {
  zoos: Array<IZoo>,
  shownZoos: Array<IZoo>,
};

export type { IZooable, IZooUpdateable, IZoo, ChangeZooProps, MapProps };
