import React from 'react';
import { AnimatePresence } from 'framer-motion';
import AppRouter from './router/index';
import FloatingSocials from './components/layout/FloatingSocials';
import AdmissionsSidebar from './components/layout/AdmissionsSidebar';

export default function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <AppRouter />
      </AnimatePresence>
      <AdmissionsSidebar />
      <FloatingSocials />
    </>
  );
}