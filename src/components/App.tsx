import React from "react";
import { App, View } from "framework7-react";
import routes from "../routes";
export default () => {
  const f7params = {
    id: "io.framework7.testapp", // App bundle ID
    name: "Framework7", // App name
    theme: "auto",
    routes,
  };
  return (
    <App params={f7params}>
      <View main url="/" animate={true} />
    </App>
  );
};
