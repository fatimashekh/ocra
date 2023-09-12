import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import { Provider } from "react-redux";
import 'antd/dist/antd.css'
import "./index.css";
import "./css/style.css";
// import App from "./App";
import OcraRoute from "./common/core/ocraRoute";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./common/core/redux/reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
  <OcraRoute store={store} />,
  document.getElementById("root")
);
registerServiceWorker();
