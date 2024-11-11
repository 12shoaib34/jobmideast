import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store, persistor } from "./store";

//global css add here
import "antd/dist/antd.css";
import "./assets/scss/index.scss";

function Root() {
  // NOTIFICATION ALERT IN FUTURE
  // document.addEventListener("DOMContentLoaded", function () {
  //   if (!Notification) {
  //     alert(
  //       "Desktop notifications not available in your browser. Try Chromium."
  //     );
  //     return;
  //   }

  //   if (Notification.permission !== "granted") Notification.requestPermission();
  // });

  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "f33d1f4b-1626-4d1d-afe4-f1cfe1fdd645";

    (function () {
      var d = document;
      var s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
