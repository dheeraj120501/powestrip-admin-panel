import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import * as styles from "./Sidebar.styles";
import assets from "Assets";

function Sidebar({ setAuthState }) {
  const [isAddingDevice, setisAddingDevice] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [deviceCount, setDeviceCount] = useState("");

  const logOut = () => {
    setAuthState(undefined);
    window.localStorage.removeItem("jwt");
    setAuthState(null);
  };

  const navLinks = [
    {
      icon: assets.dashboardIcon,
      name: "Dashboard",
      link: "/",
    },
    {
      icon: assets.devicesIcon,
      name: "Devices",
      link: "/devices",
    },
    // {
    //   icon: assets.sectorsIcon,
    //   name: "Sectors",
    // },
    // {
    //   icon: assets.userIcon,
    //   name: "User Management",
    // },
    // {
    //   icon: assets.reportsIcon,
    //   name: "Reports",
    // },
  ];

  return (
    <styles.Main>
      <styles.Avatar>
        <assets.brandLogo />
      </styles.Avatar>
      {isAddingDevice ? (
        <div className="mt-6 mb-4 relative">
          <input
            value={deviceCount}
            onChange={(e) => {
              setDeviceCount(e.target.value);
            }}
            type="text"
            placeholder="Eg. 3"
            className="p-3 rounded-lg w-full bg-[color:var(--color-bg-primary)] outline-none neumorphism-inner placeholder-[color:var(--color-placeholder)]"
          />
          <div
            className="absolute top-0 right-0 py-3 px-4 bg-[color:var(--color-secondary)] rounded-lg font-bold cursor-pointer"
            onClick={() => {
              if (deviceCount === "") {
                toast.error("Please enter something.");
              } else {
                toast.success(`${deviceCount} devices added.`);
                setDeviceCount("");
                setisAddingDevice(false);
              }
            }}
          >
            Generate
          </div>
        </div>
      ) : (
        <styles.Btn onClick={() => setisAddingDevice(true)}>
          <styles.BtnIcon>
            <assets.add></assets.add>
          </styles.BtnIcon>
          Add New Devices
        </styles.Btn>
      )}
      <styles.ListView>
        {navLinks.map((navLink, idx) => (
          <Link to={navLink["link"]}>
            <styles.ListTile
              key={idx}
              className={`${
                currentTab === idx
                  ? "stroke-[color:var(--color-secondary)] text-[color:var(--color-secondary)]"
                  : ""
              }`}
              onClick={() => setCurrentTab(idx)}
            >
              <styles.ListTileImg>
                <navLink.icon className="highlight" />
              </styles.ListTileImg>
              <styles.ListTileContent>{navLink["name"]}</styles.ListTileContent>
            </styles.ListTile>
          </Link>
        ))}
      </styles.ListView>
      <styles.Card>
        <styles.CardImg>
          <img src={process.env.PUBLIC_URL + "user.png"} alt="User" />
        </styles.CardImg>
        <styles.CardHeading>Kunal Gour</styles.CardHeading>
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
