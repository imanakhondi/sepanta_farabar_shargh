import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import messageReducer from "./message/messageReducer";

const rootReducer = combineReducers({
  userReducer,
  messageReducer,
});

export default rootReducer;
