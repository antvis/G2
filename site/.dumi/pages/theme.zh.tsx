import React from 'react';
import Page from '../../theme';
import { Header } from '@antv/dumi-theme-antv/dist/slots/Header';
import { Footer } from '@antv/dumi-theme-antv/dist/slots/Footer';

const ThemeSet: React.FC = () => {
  return (
    <>
      <Header />
      <Page />
      <Footer />
    </>
  );
};

export default ThemeSet;
