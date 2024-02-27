import { MapProps } from '../common/types';
import { useFilterOrAddUpdateContext } from '../context/context';
import MapPin from './MapPin';

type MapPinsProps = MapProps;

export default function MapPins({ zoos, shownZoos }: MapPinsProps) {
  const { filterOrAddUpdate } = useFilterOrAddUpdateContext();
  if (filterOrAddUpdate !== 'filter') {
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
