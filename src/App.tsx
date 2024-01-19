import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';

export default function App() {
  const whipsnade = { lat: 51.85, lng: -0.54 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
      <div style={{ height: "100vh" }}>
        <Map
          zoom={9}
          center={whipsnade}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string}
        />
      </div>
    </APIProvider>
  );
}
