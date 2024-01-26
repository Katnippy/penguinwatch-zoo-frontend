import { APIProvider, Map } from '@vis.gl/react-google-maps';

import MapPins from './MapPins';

export default function GoogleMap() {
  const centre = { lat: 53.4790, lng: -2.2452 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
      <div id="map" style={{ width: "100vw", height: "100vh" }}>
        <Map
          zoom={7}
          center={centre}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string}
        >
          <MapPins />
        </Map>
      </div>
    </APIProvider>
  );
}
