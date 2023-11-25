/***
 * @file index.tsx
 */
import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import Routes from "./routes";

// cor buscada do local storage
// const LS = require('local-storage');

// const ColorSystem = () => {
//   return LS.get("colorSistem");
// };

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// teste sem o local storage
const color = () => {
  return "30, 120, 150";
};

const style = {
  "--primary_color":
    color() /*ColorSystem() <- Para mudar para LocalStorage é só mudar o color() para ColorSstem()*/,
} as React.CSSProperties;

root.render(
  <div style={style}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: "rgba(var(--primary_color),1)",
        },
        algorithm: theme.darkAlgorithm,
        components: {
          Button: {
            colorPrimary: "rgb(var(--primary_color))",
            colorPrimaryHover: "rgba(var(--primary_color),0.5)",
            colorPrimaryActive: "rgba(var(--primary_color),0.2)",
          },
          Checkbox: {
            colorPrimary: "rgb(var(--primary_color))",
            colorPrimaryHover: "rgba(var(--primary_color),0.5)",
          },
          Input: {
            colorPrimaryHover: "rgba(var(--primary_color),1)",
            colorTextPlaceholder: "#ccc",
            colorBgBase: "rgb(var(--primary_color))",
          },
          DatePicker: {
            colorPrimary: "rgba(var(--primary_color),1)",
            colorLinkActive: "rgba(var(--primary_color),1)",
          },
          Slider: {
            colorPrimary: "rgba(var(--primary_color),1)",
            colorPrimaryActive: "rgba(var(--primary_color),0.2)",
            trackBg: "rgba(var(--primary_color),0.2)",
            trackHoverBg: "rgba(var(--primary_color),0.5)",
            handleColor: "rgba(var(--primary_color),1)",
          },
          Table: {
            colorPrimary: "rgba(var(--primary_color),1)",
          },
          Modal: {
            colorPrimary: "rgba(var(--primary_color),1)",
          },
          Timeline: {
            colorPrimary: "rgba(var(--primary_color),1)",
          },
        },
      }}
    >
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    </ConfigProvider>
  </div>
);

reportWebVitals();
