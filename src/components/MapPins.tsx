import { MapProps } from '../common/types';
import MapPin from './MapPin';

type MapPinsProps = MapProps;

export default function MapPins({ zoos, shownZoos, isFiltering }: MapPinsProps) {
  if (!isFiltering) {
    return (
      <>
        {zoos.map((zoo) => (
          <MapPin key={zoo.id} zoo={zoo}/>
        ))}
      </>
    );
  } else {
    return (
      <>
      {shownZoos.map((zoo) => (
        <MapPin key={zoo.id} zoo={zoo}/>
      ))}
    </>
    );
  }
}
