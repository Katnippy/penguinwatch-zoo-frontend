import { IZoo } from '../common/types';
import MapPin from './MapPin';

type MapPinsProps = {
  zoos: Array<IZoo>,
};

export default function MapPins({ zoos }: MapPinsProps) {
  return (
    <>
      {zoos.map((zoo) => (
        <MapPin key={zoo.id} zoo={zoo}/>
      ))}
    </>
  );
}
