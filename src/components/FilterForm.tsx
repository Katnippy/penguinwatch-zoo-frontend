// import { useState } from 'react';
import { IZoo } from '../common/types';
import Fieldset from './Fieldset';

type FilterFormProps = {
  zoos: Array<IZoo>;
};

export default function FilterForm({ zoos }: FilterFormProps) {
  // const [showWithinLocation, setShowWithinLocation] = useState(false);
  // const [showWithinCoords, setShowWithinCoords] = useState(false);

  return (
    <>
      <form>
        <label htmlFor="name">Name: </label>
        <input id="name" />
        <br />
        <label htmlFor="location">Location: </label>
        <input id="location" />
        <br />
        {/* {showWithinLocation ? <Fieldset name={'location'} /> : '' } */}
        <label htmlFor="lat">Coordinates: </label>
        <input id="lat" />
        <input id="lng" />
        <br />
        {/* {showWithinCoords ? <Fieldset name={'coords'} /> : '' } */}
        <Fieldset name={'species'} />
        {/* <br />
        <label htmlFor="num-species">How many species?: </label>
        <input type="number" id="num-species" />
        <br />
        <label htmlFor="num-penguins">How many penguins?: </label>
        <input type="number" id="num-penguins" /> */}
      </form>
    </>
  );
}
