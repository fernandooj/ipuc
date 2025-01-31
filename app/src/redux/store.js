import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middlewares = [thunk];

let devToolsExtension = f => f;

// if (process.env.NODE_ENV === "development") {
const { createLogger } = require("redux-logger");

const logger = createLogger({ collapsed: true });
middlewares.push(logger);

if (window.devToolsExtension) {
  devToolsExtension = window.devToolsExtension();
}
// }

export default function configureStore() {
  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middlewares),
      devToolsExtension
    )
  );

  return store;
}
