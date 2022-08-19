import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import * as styles from "./Sidebar.styles";
import Assets from "Assets";
import { useNavigate } from "react-router-dom";

function Sidebar({ setAuthState }) {
  const [isAddingDevice, setisAddingDevice] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [deviceCount, setDeviceCount] = useState("");
  const navigate = useNavigate();

  const logOut = () => {
    setAuthState(undefined);
    window.localStorage.removeItem("jwt");
    navigate("/", { replace: true });
    setAuthState(null);
  };

  const navLinks = [
    {
      icon: Assets.DashboardIcon,
      name: "Dashboard",
      link: "/",
    },
    {
      icon: Assets.DevicesIcon,
      name: "Devices",
      link: "/devices",
    },
    {
      icon: Assets.MapIcon,
      name: "Maps",
      link: "/map",
    },
    // {
    //   icon: Assets.SectorsIcon,
    //   name: "Sectors",
    //   link: "/",
    // },
    // {
    //   icon: Assets.UserIcon,
    //   name: "User Management",
    // },
    // {
    //   icon: Assets.ReportsIcon,
    //   name: "Reports",
    // },
  ];

  return (
    <styles.Main>
      <styles.Avatar>
        <Assets.BrandLogo />
      </styles.Avatar>
      {isAddingDevice ? (
        <div className="mt-6 mb-4 flex items-center">
          <div className="relative flex-1">
            <input
              value={deviceCount}
              onChange={(e) => {
                setDeviceCount(e.target.value);
              }}
              type="text"
              placeholder="Eg. 3"
              className="p-3 rounded-lg bg-[color:var(--color-bg-primary)] outline-none neumorphism-inner placeholder-[color:var(--color-placeholder)]"
            />
            <div
              className="absolute top-0 right-0 py-3 px-4 bg-[color:var(--color-secondary)] rounded-lg font-bold cursor-pointer"
              onClick={() => {
                if (
                  deviceCount === "" ||
                  deviceCount === "0" ||
                  isNaN(+deviceCount)
                ) {
                  toast.error("Please enter a valid device number.");
                } else {
                  toast.success(`${deviceCount} devices added.`);
                  setDeviceCount("");
                  setisAddingDevice(false);
                }
              }}
            >
              Generate
            </div>
            <div
              className="absolute right-[-20%] top-1/2 translate-y-[-50%] p-2 bg-[color:var(--color-secondary)] rounded-full rotate-45 ml-2 flex items-center cursor-pointer"
              onClick={() => setisAddingDevice(false)}
            >
              <Assets.Add />
            </div>
          </div>
        </div>
      ) : (
        <styles.Btn onClick={() => setisAddingDevice(true)}>
          <styles.BtnIcon>
            <Assets.Add />
          </styles.BtnIcon>
          Add New Devices
        </styles.Btn>
      )}
      <styles.ListView>
        {navLinks.map((navLink, idx) => (
          <Link
            to={navLink["link"]}
            className={`${
              currentTab === idx
                ? "stroke-[color:var(--color-secondary)] fill-[color:var(--color-secondary)] text-[color:var(--color-secondary)]"
                : "stroke-[#dedede] fill-[#dedede] text-[#dedede]"
            }`}
          >
            <styles.ListTile
              key={idx}
              onClick={() => setCurrentTab(idx)}
              className="stroke-inherit fill-inherit"
            >
              <styles.ListTileImg>
                <navLink.icon />
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
          <Assets.Exit className="mr-2" />
          Log Out
        </styles.CardBtn>
      </styles.Card>
    </styles.Main>
  );
}

export default Sidebar;
