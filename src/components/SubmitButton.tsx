type SubmitButtonProps = {
  text: string,
};

export default function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <button type="submit">{text}</button>
  );
}
