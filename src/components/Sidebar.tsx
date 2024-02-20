import { useState } from 'react';

import { ChangeZooProps } from '../common/types';
import FilterForm from './FilterForm';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';

type SidebarProps = ChangeZooProps;

export default function Sidebar({ zoos, setZoos }: SidebarProps) {
  const [filterOrAddUpdate, setFilterOrAddUpdate] = useState('filter');
  const [addOrUpdate, setAddOrUpdate] = useState('add');

  function toggleFilterAddUpdate() {
    if (filterOrAddUpdate === 'filter') {
      setFilterOrAddUpdate('addupdate');
    } else {
      setFilterOrAddUpdate('filter');
    }
  }

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
      <button onClick={toggleFilterAddUpdate}>
        {filterOrAddUpdate === 'addupdate' ? 'Filter' : 'Add / Update'}
      </button>
      {filterOrAddUpdate === 'filter' && (
        <>
          <h3>Filter</h3>
          <FilterForm zoos={zoos}/>
        </>
      )}
      {filterOrAddUpdate === 'addupdate' && (
        <>
          <h3>Add / Update</h3>
          <button onClick={toggleAddUpdate}>
            {addOrUpdate === 'add' ? 'Update' : 'Add'}
          </button>
          {addOrUpdate === 'add' ? <AddForm zoos={zoos} setZoos={setZoos}/>
            : <UpdateForm zoos={zoos} setZoos={setZoos} />}
        </>
      )}
    </div>
  );
}
