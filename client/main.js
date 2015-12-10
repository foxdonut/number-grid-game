import {createElement as ce} from "react";
import {render} from "react-dom";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";

import initialState from "./initialState";
import reducer from "./reducer";
import View from "./view.jsx";
import computer from "./computer";

const store = createStore(reducer, initialState);
store.subscribe(computer(store));

const App = connect(state => state.toJS())(View);

const element = document.getElementById("app");
render(ce(Provider, {store: store}, ce(App)), element);
