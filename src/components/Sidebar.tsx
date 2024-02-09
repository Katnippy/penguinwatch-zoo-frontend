import { ChangeZooProps } from '../common/types';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';

type SidebarProps = ChangeZooProps;

export default function Sidebar({ zoos, setZoos }: SidebarProps) {
  return (
    <div id="sidebar">
      <h1>Sidebar</h1>
      <AddForm zoos={zoos} setZoos={setZoos}/>
      <UpdateForm />
    </div>
  );
}
