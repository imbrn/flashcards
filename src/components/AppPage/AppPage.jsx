import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import styles from "./AppPage.css";

const AppPage = () => {
  return (
    <div className={styles.root}>
      <Switch>{routes.map(asRoute)}</Switch>
    </div>
  );
};

const asRoute = (route, key) => {
  return (
    <Route
      key={key}
      path={route.path}
      component={route.component}
      exact={route.exact}
    />
  );
};

export default AppPage;
