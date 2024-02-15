interface IZooable {
  id?: number,
  name: string,
  location: string,
  coords: { lat: string | number, lng: string | number },
  penguins: Array<{ id: number, species: string, count: string }>,
}

interface IZoo {
  id: number,
  name: string,
  location: string,
  coords: { lat: number, lng: number },
  penguins: Array<{ id: number, species: string, count: number | string }>,
  date: string,
};

type ChangeZooProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export type { IZooable, IZoo, ChangeZooProps };
