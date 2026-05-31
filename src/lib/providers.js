'use client';
import React from 'react';

/* Redux */
import { Provider } from 'react-redux';
import { reduxStore, persistor } from '@/lib/redux';
import { PersistGate } from 'redux-persist/integration/react';

import { useState } from 'react';

/* Query Client (TanStack v5) */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProgressProvider from '@/providers/progress';

export const Providers = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Provider store={reduxStore}>
      <PersistGate
        loading={false}
        persistor={persistor}>
        <ProgressProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ProgressProvider>
      </PersistGate>
    </Provider>
  );
};
