import {createElement as ce} from "react";
import {render} from "react-dom";
import {compose, createStore} from "redux";
import {connect, Provider} from "react-redux";
import {identity} from "ramda";

import initialState from "./initialState";
import reducer from "./reducer";
import View from "./view.jsx";
import computer from "./computer";

import {devTools, persistState} from "redux-devtools";
import {DevTools, DebugPanel, LogMonitor} from "redux-devtools/lib/react";

const store = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)(reducer, initialState);

store.subscribe(computer(store));

const App = connect(identity)(View);

const element = document.getElementById("app");
const provider = ce(Provider, {store: store}, ce(App));
const debugPanel = ce(DebugPanel, {top:true, right:true, bottom:true},
  ce(DevTools, {store:store, monitor:LogMonitor}));

render(ce("div", null, [provider, debugPanel]), element);

