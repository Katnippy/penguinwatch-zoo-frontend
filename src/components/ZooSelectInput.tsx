import { ChangeEvent } from 'react';

import { IZoo } from '../common/types';

type ZooSelectInputProps = {
  name: string,
  text: string,
  onChange(event: ChangeEvent<HTMLSelectElement>): void,
  zoos: Array<IZoo>,
};

export default function ZooSelectInput({ name, text, onChange, zoos }: ZooSelectInputProps) {
  return (
    <>
      <label htmlFor={name}>{text}</label>
      <select onChange={onChange}>
        {zoos.map((zoo) =>
          <option key={zoo.name} value={zoo.id}>{zoo.name}</option>)}
        </select>
    </>
  );
}
