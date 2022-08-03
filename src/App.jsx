import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

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
      setAuthState(jwt);
    } else {
      setAuthState(null);
    }
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
