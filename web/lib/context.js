import React, { createContext, useContext } from 'react';

import assert from 'assert';

export const createContextProviderAndConsumerHook = (
  useProviderValue,
  contextName = 'GeneratedContext'
) => {
  const Context = createContext();

  function GeneratedContextProvider({ children, ...props }) {
    const { ready, value } = useProviderValue(props);
    assert(typeof ready === 'boolean');
    if (!ready) return null;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }
  GeneratedContextProvider.displayName = `${contextName}Provider`;

  return [
    GeneratedContextProvider,
    function useGeneratedContextConsumer() {
      const context = useContext(Context);
      if (context === undefined) {
        throw new Error('Context must be used within a corresponding Provider');
      }
      return context;
    },
  ];
};
