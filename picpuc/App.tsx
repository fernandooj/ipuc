import React from 'react';
import Providers from './src/routes';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Providers />
    </Provider>
  );
};

export default App;
