import Router from "./config/router/index";
import "../src/theme/theme.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./store/index";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
  }, []);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
