import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";

const AppPage = () => {
  return (
    <div>
      <Switch>
        { routes.map(getRoute) }
      </Switch>
    </div>
  );
};

const getRoute = (route, key) => {
  return <Route
    key={key}
    path={route.path}
    component={route.component}
    exact={route.exact}
  />;
};

export default AppPage;
