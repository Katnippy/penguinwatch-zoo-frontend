import { useState } from 'react';

import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

import { IZoo } from '../common/types';

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
            {zoo.flagged ?
              <b>
                ⚠️ Flagged for deletion - this zoo may not have any penguins.
              </b>
              : ''}
          </li>
          <p>Correct as of {zoo.date}</p>
        </InfoWindow>
      }
    </>
  );
}
