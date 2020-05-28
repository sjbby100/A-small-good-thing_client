import { createStore } from "redux";
import reducer from "./modules/reducer";
import { devToolsEnhancer } from "redux-devtools-extension";
const store = createStore(reducer, devToolsEnhancer({ trace: true }));

export default store;
