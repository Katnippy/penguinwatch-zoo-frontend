import { useState, useEffect } from 'react';

import { IZoo } from './common/types';
import zooService from './services/zoos';
import Header from './components/Header';
import FilterOrAddUpdateContextProvider
  from './components/FilterOrAddUpdateContextProvider';
import Sidebar from './components/Sidebar';
import GoogleMap from './components/GoogleMap';

export default function App() {
  const [zoos, setZoos] = useState<Array<IZoo>>([]);
  const [shownZoos, setShownZoos] = useState<Array<IZoo>>([]);

  useEffect(() => {
    void (async function hook() {
      try {
        const initialZoos = await zooService.read();
        setZoos(initialZoos);
        setShownZoos(initialZoos);
      } catch (e) { // ? Needs to be typed?
        console.error('Error getting data: ', e);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <div id="content">
        <FilterOrAddUpdateContextProvider>
          <Sidebar zoos={zoos} setZoos={setZoos} setShownZoos={setShownZoos} />
          <GoogleMap zoos={zoos} shownZoos={shownZoos} />
        </FilterOrAddUpdateContextProvider>
      </div>
    </>
  );
}
