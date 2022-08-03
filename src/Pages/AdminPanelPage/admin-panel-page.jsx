import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

import components from "Components";
import * as styles from "./admin-panel-page.styles";

function AdminPanelPage({ setAuthState }) {
  useEffect(() => {
    toast.success("Welcome Onboard!");
  }, []);

  return (
    <styles.Layout>
      <components.Sidebar setAuthState={setAuthState} />
      <styles.Main>
        <components.Navbar />
      </styles.Main>
    </styles.Layout>
  );
}

export default AdminPanelPage;
