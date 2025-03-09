import { createRoot } from "react-dom/client";
import "./styles/App.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./reducer.js";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
