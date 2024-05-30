import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Provider as Raper } from "use-context-provider";
import "./index.css";
import { MainDashProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainDashProvider>
      <Provider store={store}>
        <Raper>
          <App />
        </Raper>
      </Provider>
    </MainDashProvider>
  </React.StrictMode>
);
