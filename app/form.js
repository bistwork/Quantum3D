import App from "./components/App";
import React from "react";
import { ConfiguratorProvider } from "./contexts/Configurator"

export default function form() {
  return (
    <React.StrictMode>
      <ConfiguratorProvider>
        <App className="App"/>
      </ConfiguratorProvider>
    </React.StrictMode>
  );
}
