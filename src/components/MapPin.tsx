import { useState } from 'react';

import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

export default function MapPin() {
  const whipsnade = { lat: 51.85, lng: -0.54 };
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdvancedMarker position={whipsnade} onClick={() => setOpen(true)}>
        <Pin />
      </AdvancedMarker>

      {open &&
        <InfoWindow
          position={whipsnade}
          onCloseClick={() => setOpen(false)}
        >
          <h1>Whipsnade Zoo</h1>
        </InfoWindow>
      }
    </>
  );
}