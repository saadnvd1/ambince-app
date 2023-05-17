/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// Uncomment to copy all static images under ./images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('./images', true)
// const imagePath = (name) => images(name, true)

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import Main from "Main";
import { ToastContainer } from "react-toastify";
import * as Sentry from "@sentry/react";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");
const root = createRoot(container);

Sentry.init({
  dsn: "https://718a54e3309844fc800c2ca633503167@o4505200449421312.ingest.sentry.io/4505200449421312",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
  enabled: process.env.NODE_ENV === "production",
});

document.addEventListener("DOMContentLoaded", () => {
  root.render(
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#222426",
          },
        }}
      >
        <Main />
        <ToastContainer />
      </ConfigProvider>
    </Provider>
  );
});
