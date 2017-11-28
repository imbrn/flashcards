import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Page from "./components/Page";

const Main = () => {
  return (
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  );
};

export default Main;
