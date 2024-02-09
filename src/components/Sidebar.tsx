import { useState } from 'react';

import { ChangeZooProps } from '../common/types';
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
      <button onClick={toggleAddUpdate}>
        {addOrUpdate === 'add' ? 'Update' : 'Add'}
      </button>
      {addOrUpdate === 'add' ? <AddForm zoos={zoos} setZoos={setZoos}/>
        : <UpdateForm />}
    </div>
  );
}
