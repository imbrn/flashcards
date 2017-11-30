import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
