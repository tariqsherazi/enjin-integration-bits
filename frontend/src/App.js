import Router from "./config/router/index";
import "../src/theme/theme.css";
import { Provider } from "react-redux";
import store from "./store/index";
import img from "./assets/images/help.png";
import "./App.css";
import ZendeskComp from "./containers/zendesk";
import { useState } from "react";
import { useEffect } from "react";
import { loadContractIns } from "./store/actions";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { RECORD_VISIT_MUTATION } from "./gql/mutations";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [recordVisit] = useMutation(RECORD_VISIT_MUTATION);

  useEffect(() => {
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    // localStorage.clear()
  }, []);

  store.dispatch(loadContractIns());
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://geolocation-db.com/json/");
        console.log("res.data", res.data?.IPv4);
        if (res.data?.IPv4) {
          const { data } = await recordVisit({
            variables: {
              ip_adress: res.data?.IPv4,
            },
          });

          // Handle the response data
          const { id, ip_adress, timestamp } = data?.RecordVisit;
          console.log("Visit recorded:", { id, ip_adress, timestamp });
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <Router />
      <ZendeskComp showChat={showChat} />
      <div
        className="img-wrapper"
        onClick={() => {
          setShowChat(!showChat);
        }}
      >
        <img src={img} />
      </div>
    </Provider>
  );
}

export default App;
