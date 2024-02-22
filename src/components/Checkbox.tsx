type CheckboxProps = {
  name: string,
  text: string,
  checked: boolean,
  onChange(): void,
};

export default function Checkbox(
  { name, text, checked, onChange }: CheckboxProps
) {
  return (
    <>
      <label htmlFor={name}>{text}</label>
      <input type="checkbox" id={name} checked={checked} onChange={onChange} />
    </>
  );
}
