import { ChangeEvent, MouseEvent } from 'react';
import SelectInput from './SelectInput';
import NumberInput from './NumberInput';
import PenguinsInputsButton from './PenguinsInputsButton';

type PenguinsInputsProps = {
  newPenguins: Array<{ id: number, species: string, count: string }>,
  handleSelectChange(event: ChangeEvent<HTMLSelectElement>, id: number): void,
  handleNumberChange(event: ChangeEvent<HTMLInputElement>, id: number): void,
  addField(event: MouseEvent): void,
  deleteField(event: MouseEvent, idToRemove: number): void,
};

export default function PenguinsInputs({
  newPenguins, handleSelectChange, handleNumberChange, addField, deleteField
}: PenguinsInputsProps) {
  return (
    <>
      {/* ? Doesn't `<label>` really need a `htmlFor` attribute? */}
      <label>Penguins: </label>
      {newPenguins.map(({ id }) => (
        <div key={id}>
          <SelectInput handleSelectChange={handleSelectChange} id={id} />
          <NumberInput handleNumberChange={handleNumberChange} id={id} />
          <PenguinsInputsButton onClick={addField} text={'+'} />
          {newPenguins.length > 1 ?
            <PenguinsInputsButton onClick={deleteField} id={id} text={'-'} />
          : ''}
        </div>
      ))}
    </>
  );
}
