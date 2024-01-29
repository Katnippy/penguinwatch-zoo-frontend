import { useState, useEffect } from 'react';

import axios from 'axios';

import { IZoo } from './common/types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GoogleMap from './components/GoogleMap';

export default function App() {
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
      <Header />
      <div id="content">
        <Sidebar zoos={zoos} setZoos={setZoos}/>
        <GoogleMap zoos={zoos}/>
      </div>
    </>
  );
}
