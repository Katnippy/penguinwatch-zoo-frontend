import { ChangeEvent, MouseEvent } from 'react';
import PenguinsSelectInput from './PenguinsSelectInput';
import PenguinsNumberInput from './PenguinsNumberInput';
import PenguinsInputsButton from './PenguinsInputsButton';

type PenguinsInputsProps = {
  penguins: Array<{ id: number, species: string, count: number | string }>,
  handleSelectChange(event: ChangeEvent<HTMLSelectElement>, id: number): void,
  handleNumberChange(event: ChangeEvent<HTMLInputElement>, id: number): void,
  addField(event: MouseEvent): void,
  deleteField(event: MouseEvent, idToRemove: number): void,
  isUpdating?: boolean,
};

// TODO: Explain.
export default function PenguinsInputs({
  penguins, handleSelectChange, handleNumberChange, addField, deleteField,
  isUpdating = false
}: PenguinsInputsProps) {
  return (
    <>
      {/* ? Doesn't `<label>` really need a `htmlFor` attribute? */}
      <label>Penguins: </label>
      {penguins.map(({ id, species, count }) => (
        <div key={id}>
          {/* ? Is `undefined` the best option here? */}
          <PenguinsSelectInput species={isUpdating ? species : undefined}
            handleSelectChange={handleSelectChange} id={id} />
          <PenguinsNumberInput count={isUpdating ? count : undefined}
            handleNumberChange={handleNumberChange} id={id} />
          <PenguinsInputsButton onClick={addField} text={'+'} />
          {penguins.length > 1 || isUpdating ?
            <PenguinsInputsButton onClick={deleteField} id={id} text={'-'} />
          : ''}
        </div>
      ))}
    </>
  );
}
