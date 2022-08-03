import React from "react";

import * as styles from "./Navbar.styles";
import assets from "Assets";

function Navbar() {
  return (
    <styles.Main>
      <styles.Search placeholder="Search" />
      <styles.IconBar>
        <styles.Icon>
          <assets.reload />
        </styles.Icon>
        <styles.Icon>
          <assets.notifications />
        </styles.Icon>
        <styles.Icon>
          <assets.settings />
        </styles.Icon>
      </styles.IconBar>
    </styles.Main>
  );
}

export default Navbar;
