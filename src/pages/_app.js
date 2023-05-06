import '@/styles/globals.css';
import '../styles/dropdown.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import Home from './index';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}
