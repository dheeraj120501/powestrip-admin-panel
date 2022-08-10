import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import pages from "Pages";

function App() {
  /**
   * Auth state is a ternary state
   * null: not logged in
   * undefined: unknown state (for loader)
   * anything else is the user data
   */
  const [authState, setAuthState] = useState(undefined);

  useEffect(() => {
    const jwt = window.localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt && jwt !== "undefined") {
      const config = {
        method: "get",
        url: "https://dev2.powerstrip.in/analytics/current-in-use",
        headers: {
          userAuthToken: jwt,
        },
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "error") {
            window.localStorage.removeItem("jwt");
            setAuthState(null);
          } else {
            setAuthState(jwt);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setAuthState(null);
    }
    console.log(authState);
  }, []);

  return (
    <>
      <Toaster />
      {authState === undefined ? (
        <pages.LoadingPage />
      ) : !authState ? (
        <pages.AuthPage setAuthState={setAuthState} />
      ) : (
        <pages.AdminPanelPage setAuthState={setAuthState} />
      )}
    </>
  );
}

export default App;
