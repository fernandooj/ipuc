import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';

const store = configureStore({
  reducer: {
    events: eventReducer, // cambiar getEventReducer a eventReducer
  },
});

export default store;
