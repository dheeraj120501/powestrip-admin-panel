import { useState } from "react";

import Sidebar from "./components/Sidebar";
import { Layout, Side } from "./App.styles";
import AuthPage from "./pages/AuthPage";

function App() {
  /**
   * Auth state is a ternary state
   * null: not logged in
   * undefined: unknown state (for loader)
   * anything else is the user data
   */
  const [authState, setAuthState] = useState(undefined);

  // return (
  //   <Layout>
  //     <Side>
  //       <Sidebar />
  //     </Side>
  //   </Layout>
  // );

  return <AuthPage />;
}

export default App;
