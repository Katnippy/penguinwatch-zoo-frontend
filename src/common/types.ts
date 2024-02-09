interface IZoo {
  id: number,
  name: string,
  location: string,
  coords: { lat: number, lng: number },
  penguins: Array<{ species: string, count: number | string }>,
  date: string,
};

interface IZooable {
  name: string,
  location: string,
  coords: { lat: string, lng: string },
  penguins: Array<{ id: number, species: string, count: string }>,
}

type ChangeZooProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export type { IZooable, IZoo, ChangeZooProps };
