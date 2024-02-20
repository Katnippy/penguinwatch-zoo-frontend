import { useState } from 'react';

import { ChangeZooProps } from '../common/types';
import FilterForm from './FilterForm';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';

type SidebarProps = ChangeZooProps;

export default function Sidebar({ zoos, setZoos }: SidebarProps) {
  const [addOrUpdate, setAddOrUpdate] = useState('add');

  function toggleAddUpdate() {
    if (addOrUpdate === 'add') {
      setAddOrUpdate('update');
    } else {
      setAddOrUpdate('add');
    }
  }

  return (
    <div id="sidebar">
      <h1>Sidebar</h1>
      <h3>Filter</h3>
      <FilterForm zoos={zoos}/>
      <h3>Add / Update</h3>
      <button onClick={toggleAddUpdate}>
        {addOrUpdate === 'add' ? 'Update' : 'Add'}
      </button>
      {addOrUpdate === 'add' ? <AddForm zoos={zoos} setZoos={setZoos}/>
        : <UpdateForm zoos={zoos} setZoos={setZoos} />}
    </div>
  );
}
