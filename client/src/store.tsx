import { createStore } from "redux";
import reducer from "./modules/reducer";
import { devToolsEnhancer } from "redux-devtools-extension";
// 배포할때 데브툴 끄고 배포하기
const store = createStore(reducer, devToolsEnhancer({ trace: true }));

export default store;
