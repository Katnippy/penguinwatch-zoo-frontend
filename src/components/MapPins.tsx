import { useState, useEffect } from 'react';

import axios from 'axios';

import MapPin from './MapPin';

interface IZoo {
  id: number,
  name: string,
  location: string,
  coords: string,
  penguins: Array<{ species: string, count: number | string }>,
  date: string,
}

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
      {/* <MapPin /> */}
      <ul>
        {zoos.map((zoo, element) => (
          <li key={element}>
            <h3>{zoo.name}</h3>
            <p>{zoo.location} ({zoo.coords})</p>
            <ul>
              {zoo.penguins.map((penguin, element) => (
                <li key={element}>{penguin.species}: {penguin.count}</li>
              ))}
            </ul>
            <p>Correct as of {zoo.date}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
