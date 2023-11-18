import reducer from "./reducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const store = createStore(reducer, applyMiddleware(thunk, logger));

// 5. State Management:
//    - Use React state and props appropriately to handle data.
//    - Optionally, use Redux or Context API for advanced state management.
