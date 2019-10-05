import React from 'react';
import {IntlProvider} from 'react-intl';
import Content from './Content';

const App = () => (
  <IntlProvider locale="en">
    <Content nights={2} guests={6} price={5000} />
  </IntlProvider>
);

export default App;
