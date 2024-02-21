type FieldsetProps = {
  name: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void,
};

const distances = [
  { id: 'exact', value: 'Exact' },
  { id: '5-miles', value: '5 miles' },
  { id: '10-miles', value: '10 miles' },
  { id: '25-miles', value: '25 miles' },
  { id: '50-miles', value: '50 miles' },
];

const allSpecies = [
  { id: 'king', value: 'King Penguins' },
  { id: 'emperor', value: 'Emperor Penguins' },
  { id: 'adelie', value: 'Adélie Penguins' },
  { id: 'chinstrap', value: 'Chinstrap Penguins' },
  { id: 'gentoo', value: 'Gentoo Penguins' },
  { id: 'little', value: 'Little Penguins' },
  { id: 'magellanic', value: 'Magellanic Penguins' },
  { id: 'humboldt', value: 'Humboldt Penguins' },
  { id: 'galapagos', value: 'Galápagos Penguins' },
  { id: 'african', value: 'African Penguins' },
  { id: 'yellow-eyed', value: 'Yellow-eyed Penguins' },
  { id: 'fiordland', value: 'Fiordland Penguins' },
  { id: 'snares', value: 'Snares Penguins' },
  { id: 'erect-crested', value: 'Erect-crested Penguins' },
  { id: 'southern-rockhopper', value: 'Southern Rockhopper Penguins' },
  { id: 'northern-rockhopper', value: 'Northern Rockhopper Penguins' },
  { id: 'royal', value: 'Royal Penguins' },
  { id: 'macaroni', value: 'Macaroni Penguins' }
];


export default function Fieldset({ name, onChange }: FieldsetProps) {
  if (name === 'location' || name === 'coords') {
    return (
      <>
        <fieldset>
          <legend>Within</legend>
          {distances.map(({ id, value }) => (
            <div key={id}>
              <input type="radio" id={id} name={name} value={value}
                defaultChecked={id === 'exact'}/>
              <label htmlFor={id}>{value}</label>
            </div>
          ))}
        </fieldset>
      </>
    );
  } else if (name === 'species') {
    return (
      <>
        <fieldset>
          <legend>Species</legend>
          {allSpecies.map(({ id, value }) => (
            <div key={id}>
              <input type="checkbox" id={id} name={name} value={value}
                onChange={onChange} />
              <label htmlFor={id}>{value}</label>
              <br />
            </div>
          ))}
        </fieldset>
      </>
    );
  }
}
