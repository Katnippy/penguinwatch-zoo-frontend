import { useState } from 'react';

import { FilterOrAddUpdateContext } from '../context/context';

type FilterOrAddUpdateContextProviderProps = {
  children: React.ReactNode;
};

export type FilterOrAddUpdate = {
  filterOrAddUpdate: string,
  setFilterOrAddUpdate: React.Dispatch<React.SetStateAction<string>>
};

export default function FilterOrAddUpdateContextProvider(
  { children }: FilterOrAddUpdateContextProviderProps
) {
  const [filterOrAddUpdate, setFilterOrAddUpdate] = useState('filter');

  return (
    <>
      <FilterOrAddUpdateContext.Provider
        value={{ filterOrAddUpdate, setFilterOrAddUpdate }}>
        {children}
      </FilterOrAddUpdateContext.Provider>
    </>
  );
}
