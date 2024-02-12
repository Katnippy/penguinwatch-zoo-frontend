import { useState, useEffect } from 'react';

import { IZoo } from './common/types';
import zooService from './services/zoos';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GoogleMap from './components/GoogleMap';

export default function App() {
  const [zoos, setZoos] = useState<Array<IZoo>>([]);
  useEffect(() => {
    void (async function hook() {
      try {
        const initialZoos = await zooService.read();
        setZoos(initialZoos);
      } catch (e) { // ? Needs to be typed?
        console.error('Error getting data: ', e);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <div id="content">
        <Sidebar zoos={zoos} setZoos={setZoos}/>
        <GoogleMap zoos={zoos}/>
      </div>
    </>
  );
}
