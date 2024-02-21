import { useState } from 'react';

import { IZoo } from '../common/types';
import FilterForm from './FilterForm';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';

type SidebarProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
  setShownZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>,
};

export default function Sidebar(
  { zoos, setZoos, setShownZoos, setIsFiltering }:
    SidebarProps
) {
  const [filterOrAddUpdate, setFilterOrAddUpdate] = useState('filter');
  const [addOrUpdate, setAddOrUpdate] = useState('add');

  function toggleFilterAddUpdate() {
    if (filterOrAddUpdate === 'filter') {
      setFilterOrAddUpdate('addupdate');
      setIsFiltering(false);
    } else {
      setFilterOrAddUpdate('filter');
      setShownZoos(zoos);
      setIsFiltering(true);
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
          <FilterForm zoos={zoos} setShownZoos={setShownZoos} />
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
