import { createContext, useContext } from 'react';

import { FilterOrAddUpdate }
  from '../components/FilterOrAddUpdateContextProvider';

export const FilterOrAddUpdateContext =
  createContext<FilterOrAddUpdate | undefined>(undefined);

export function useFilterOrAddUpdateContext() {
  const context = useContext(FilterOrAddUpdateContext);

  if (context === undefined) {
    throw new Error(
      `useFilterOrAddUpdateContext must be used within a 
      FilterOrAddUpdateContext!`
    );
  }

  return context;
}
