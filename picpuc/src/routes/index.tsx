import React from 'react';
import {UserProvider} from '../context/userContext';
import Routes from './Route';

const Providers = () => {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
};

export default Providers;
