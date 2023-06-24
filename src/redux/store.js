import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "./reducer/alertReducer";
import authReducer from "./reducer/authReducer";
import memberReducer from "./reducer/memberReducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  members: memberReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
