import React from "react";
import routes from "./routes";
import { objectToRoute } from "../utils";
import Container from "../ResponsiveContainer";

const Content = () => {
  return (
    <Container>
      { routes.map(objectToRoute) }
    </Container>
  );
};

export default Content;
