import {configureStore} from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';
import categorieReducer from '../reducers/categorieReducer';

const store = configureStore({
  reducer: {
    events: eventReducer, // cambiar getEventReducer a eventReducer
    categories: categorieReducer, // cambiar getEventReducer a eventReducer
  },
});

export default store;
