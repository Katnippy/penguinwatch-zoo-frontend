import { IZoo } from '../common/types';
import AddUpdateForm from "./AddUpdateForm";

type SidebarProps = {
  zoos: Array<IZoo>,
  setZoos: React.Dispatch<React.SetStateAction<IZoo[]>>,
};

export default function Sidebar({ zoos, setZoos }: SidebarProps) {
  return (
    <div id="sidebar">
      <h1>Sidebar</h1>
      <AddUpdateForm zoos={zoos} setZoos={setZoos}/>
    </div>
  );
}
