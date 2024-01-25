import { useState, Fragment } from 'react';

import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

// ? Can we import this?
interface IZoo {
  id: number,
  name: string,
  location: string,
  coords: { lat: number, lng: number },
  penguins: Array<{ species: string, count: number | string }>,
  date: string,
};

type MapPinProps = {
  zoo: IZoo,
};

export default function MapPin({ zoo }: MapPinProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdvancedMarker position={zoo.coords} onClick={() => setOpen(true)}>
        <Pin />
      </AdvancedMarker>

      {open &&
        <InfoWindow
          position={zoo.coords}
          onCloseClick={() => setOpen(false)}
        >
          <h3>{zoo.name}</h3>
          <p>{zoo.location} ({zoo.coords.lat}, {zoo.coords.lng})</p>
          <li>
            <ul>
              {zoo.penguins.map((penguin) => (
                <li key={penguin.species}>
                  {penguin.species}: {penguin.count}
                </li>
              ))}
            </ul>
          </li>
          <p>Correct as of {zoo.date}</p>
        </InfoWindow>
      }
    </>
  );
}
