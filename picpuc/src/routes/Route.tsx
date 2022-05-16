import React, {ReactElement} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';

const Route = (): ReactElement => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Route;
