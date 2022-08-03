import React from "react";
import * as styles from "./Sidebar.styles";
import assets from "Assets";

function Sidebar({ setAuthState }) {
  const logOut = () => {
    setAuthState(undefined);
    window.localStorage.removeItem("jwt");
    setAuthState(null);
  };
  return (
    <styles.Main>
      <styles.Avatar>
        <assets.brandLogo />
      </styles.Avatar>
      <styles.Btn>
        <styles.BtnIcon>
          <assets.add></assets.add>
        </styles.BtnIcon>
        Add New Devices
      </styles.Btn>
      <styles.ListView>
        <styles.ListTile>
          <styles.ListTileImg>
            <assets.dashboardIcon class="highlight" />
          </styles.ListTileImg>
          <styles.ListTileContent>Dashboard</styles.ListTileContent>
        </styles.ListTile>
        <styles.ListTile>
          <styles.ListTileImg>
            <assets.devicesIcon class="highlight" />
          </styles.ListTileImg>
          <styles.ListTileContent>Devices</styles.ListTileContent>
        </styles.ListTile>
        <styles.ListTile>
          <styles.ListTileImg>
            <assets.sectorsIcon class="highlight" />
          </styles.ListTileImg>
          <styles.ListTileContent>Sectors</styles.ListTileContent>
        </styles.ListTile>
        <styles.ListTile>
          <styles.ListTileImg>
            <assets.userIcon class="highlight" />
          </styles.ListTileImg>
          <styles.ListTileContent>User Management</styles.ListTileContent>
        </styles.ListTile>
        <styles.ListTile>
          <styles.ListTileImg>
            <assets.reportsIcon class="highlight" />
          </styles.ListTileImg>
          <styles.ListTileContent>Reports</styles.ListTileContent>
        </styles.ListTile>
      </styles.ListView>
      <styles.Spacer />
      <styles.Card>
        <styles.CardImg>
          <img src={process.env.PUBLIC_URL + "user.png"} alt="User" />
        </styles.CardImg>
        <styles.CardHeading>Kunal Gaur</styles.CardHeading>
        <styles.CardSubHeading>CEO of Powerstrip</styles.CardSubHeading>
        <styles.CardBtn onClick={logOut}>
          <assets.exit className="mr-2" />
          Log Out
        </styles.CardBtn>
      </styles.Card>
    </styles.Main>
  );
}

export default Sidebar;
