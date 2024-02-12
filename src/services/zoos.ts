import axios from 'axios';
import { IZooable, IZoo } from '../common/types';

const baseUrl = 'http://localhost:3001/zoos';

async function create(newObject: IZooable) {
  const res = await axios.post<IZoo>(baseUrl, newObject);
  return res.data; // ? Correctly typed?
}

async function read() {
  const res = await axios.get<Array<IZoo>>(baseUrl);
  return res.data;
}

async function update(id: number, zoo: IZoo) {
  const res = await axios.put<IZoo>(`${baseUrl}/${id}`, zoo);
  return res.data;
}

// async function destroy(id: number) {
//   await axios.delete(`${baseUrl}/${id}`);
// }


export default { create, read, update };