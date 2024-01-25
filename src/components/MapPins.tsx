import { useState, useEffect } from 'react';

import axios from 'axios';

import MapPin from './MapPin';

interface IZoo {
  id: number,
  name: string,
  location: string,
  coords: { lat: number, lng: number },
  penguins: Array<{ species: string, count: number | string }>,
  date: string,
};

export default function MapPins() {
  const [zoos, setZoos] = useState<Array<IZoo>>([]);
  useEffect(() => {
    void (async function hook() {
      try {
        const res = await axios.get<Array<IZoo>>('http://localhost:3001/zoos');
        setZoos(res.data);
      } catch (e) {
        console.error('Error fetching data: ', e);
      }
    })();
  }, []);

  return (
    <>
      {zoos.map((zoo) => (
        <MapPin key={zoo.id} zoo={zoo}/>
      ))}
    </>
  );
}
