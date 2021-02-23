/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { LayoutSplashScreen } from "../theme/layout";
import { createServer } from "miragejs"
import mockServer from './../mockAPIServer';

process.env.NODE_ENV === "development" && createServer(mockServer);

export default function App({ store, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
      <React.Suspense fallback={<LayoutSplashScreen />}>
        {/* Override `basename` (e.g: `homepage` in `package.json`) */}
        <HashRouter basename={basename}>
          {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
          {/* Render routes with provided `Layout`. */}
          <Routes />
        </HashRouter>
      </React.Suspense>
    </Provider>
  );
}
