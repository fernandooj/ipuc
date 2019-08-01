 
import evento from "./evento";
import usuario from "./usuario";
import categoria from "./categoria";

import { combineReducers } from "redux";

const reducerMap = {
  evento,
  usuario,
  categoria
};

export default combineReducers(reducerMap);
