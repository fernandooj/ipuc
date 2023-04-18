import {combineReducers, createStore} from 'redux';
import {getEventReducer} from '../reducers/eventReducer';

const reducers = combineReducers({
  events: getEventReducer,
});

export const store = createStore(reducers);
