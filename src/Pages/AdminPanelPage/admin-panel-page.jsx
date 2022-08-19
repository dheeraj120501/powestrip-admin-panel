import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Components from "Components";
import * as styles from "./admin-panel-page.styles";
import components from "./components";

function AdminPanelPage({ setAuthState }) {
  useEffect(() => {
    toast.success("Welcome Onboard!");
  }, []);

  return (
    <styles.Layout>
      <Components.Sidebar setAuthState={setAuthState} />
      <styles.Main>
        <Components.Navbar />
        <styles.MainContent>
          <Routes>
            <Route path="/" exact element={<components.Dashboard />}></Route>
            <Route path="/devices" element={<components.Devices />}></Route>
            <Route
              path="/add-device"
              element={<components.AddDevice />}
            ></Route>
            <Route path="/map" element={<components.Map />}></Route>
          </Routes>
        </styles.MainContent>
      </styles.Main>
    </styles.Layout>
  );
}

export default AdminPanelPage;
