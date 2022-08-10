import React from "react";

import * as styles from "./Navbar.styles";
import Assets from "Assets";

function Navbar() {
  return (
    <styles.Main>
      <styles.Search placeholder="Search" />
      <styles.IconBar>
        <styles.Icon>
          <Assets.Reload />
        </styles.Icon>
        <styles.Icon>
          <Assets.Notifications />
        </styles.Icon>
        <styles.Icon>
          <Assets.Settings />
        </styles.Icon>
      </styles.IconBar>
    </styles.Main>
  );
}

export default Navbar;
