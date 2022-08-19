import React, { useState, useEffect } from "react";
import axios from "axios";
import Components from "Components";

function Devices() {
  const [devices, setDevices] = useState(undefined);
  const deviceType = ["Public", "Private", "Dealer", "Personal"];
  const [filter, setFilter] = useState({
    sort: "",
    category: "",
    deviceType: "",
    vehicleType: "",
  });
  useEffect(() => {
    const jwt = window.localStorage.getItem("jwt");
    const config = {
      method: "get",
      url: "https://dev2.powerstrip.in/device/admin/get-all",
      headers: {
        userAuthToken: jwt,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const allDevices = response.data;
        setDevices(allDevices);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="flex text-sm font-bold justify-between">
        <select
          name="sort"
          className="text-[#dedede] outline-none bg-[color:var(--color-bg-primary)] px-4 py-2 rounded-lg mr-6 cursor-pointer flex-1 neumorphism-outer"
          value={filter.sort}
          onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
        >
          <option value="">Sort by</option>
          <option value="date">By date</option>
          <option value="name">By name</option>
        </select>
        <select
          name="category"
          className="text-[#dedede] outline-none bg-[color:var(--color-bg-primary)] px-4 py-2 rounded-lg mr-6 cursor-pointer flex-[2] neumorphism-outer"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">Category</option>
          <option value="date">By date</option>
          <option value="name">By name</option>
        </select>
        <select
          name="vehicleType"
          className="text-[#dedede] outline-none bg-[color:var(--color-bg-primary)] px-4 py-2 rounded-lg mr-6 cursor-pointer flex-1 neumorphism-outer"
          value={filter.vehicleType}
          onChange={(e) => {
            setFilter({ ...filter, vehicleType: e.target.value });
            const jwt = window.localStorage.getItem("jwt");
            const config = {
              method: "get",
              url: "https://dev2.powerstrip.in/device/admin/get-all",
              headers: {
                userAuthToken: jwt,
              },
            };

            axios(config)
              .then(function (response) {
                console.log(response.data);
                const allDevices = response.data;
                if (!e.target.value) {
                  setDevices(allDevices);
                } else {
                  setDevices(
                    allDevices.filter(
                      (device) =>
                        +device["device_type"] === +filter.deviceType &&
                        +device["charging_vehicle_type"] === +filter.vehicleType
                    )
                  );
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          <option value="">Vehicle Type</option>
          <option value="2">2 Wheeler</option>
          <option value="4">4 Wheeler</option>
        </select>
        <select
          name="deviceType"
          value={filter.deviceType}
          className="text-[#dedede] outline-none bg-[color:var(--color-bg-primary)] px-4 py-2 rounded-lg mr-8 cursor-pointer flex-1 neumorphism-outer"
          onChange={(e) => {
            setFilter({ ...filter, deviceType: e.target.value });
            const jwt = window.localStorage.getItem("jwt");
            const config = {
              method: "get",
              url: "https://dev2.powerstrip.in/device/admin/get-all",
              headers: {
                userAuthToken: jwt,
              },
            };

            axios(config)
              .then(function (response) {
                console.log(response.data);
                const allDevices = response.data;
                if (!e.target.value) {
                  setDevices(allDevices);
                } else {
                  setDevices(
                    allDevices.filter(
                      (device) =>
                        +device["device_type"] === +filter.deviceType &&
                        +device["charging_vehicle_type"] === +filter.vehicleType
                    )
                  );
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          <option value="">Device Type</option>
          {deviceType.map((type, idx) => (
            <option value={idx} key={idx}>
              {type}
            </option>
          ))}
        </select>
        <div
          className="bg-[#5a5a5a] flex justify-center items-center px-8 py-2 rounded-md border-2 border-[color:var(--color-primary)] cursor-pointer neumorphism-outer"
          onClick={() => {
            setFilter({
              sort: "",
              category: "",
              deviceType: "",
              vehicleType: "",
            });
            const jwt = window.localStorage.getItem("jwt");
            const config = {
              method: "get",
              url: "https://dev2.powerstrip.in/device/admin/get-all",
              headers: {
                userAuthToken: jwt,
              },
            };

            axios(config)
              .then(function (response) {
                console.log(response.data);
                const allDevices = response.data;
                setDevices(allDevices);
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          Reset search
        </div>
      </div>
      {devices && (
        <>
          <div className="text-[#dedede] text-sm mt-8">
            <div className="font-light">
              Search results:{" "}
              <span className="font-bold">{devices.length} devices</span>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <div className="flex justify-between items-center px-2 py-4 rounded-lg bg-[color:var(--color-bg-primary)] mb-8 neumorphism-outer">
              <div className="flex-1 text-center">Device ID</div>
              <div className="flex-1 text-center">Vehicle Type</div>
              <div className="flex-[2] text-center">
                Device Manually Added Address
              </div>
              <div className="flex-1 text-center">Device Type</div>
              <div className="flex-1 text-center">Category</div>
              <div className="flex-1 text-center">Location</div>
            </div>
            {devices === undefined ? (
              <div className="h-full w-full">
                <Components.Loader />
              </div>
            ) : (
              <div className="flex-1">
                {devices.map((device) => {
                  const statusStyle = `rounded-full ${
                    device["status"] ? "bg-green-500" : "bg-red-500"
                  } p-[0.2rem] ml-2`;
                  return (
                    <div
                      className="flex justify-between items-center py-2 px-2 rounded-lg bg-[color:var(--color-bg-primary)] neumorphism-outer mb-6 h-16 font-bold"
                      key={device["id"]}
                    >
                      <div className="flex-1 flex items-center justify-center">
                        {device["device_id"]}
                        <div className={statusStyle}></div>
                      </div>
                      <div className="flex-1 text-center">
                        {`${device["charging_vehicle_type"]} wheeler`}
                      </div>
                      <div className="flex-[2] text-center">
                        {`${device["address"]} ${device["pincode"]}`}
                      </div>
                      <div className="flex-1 text-center">
                        {deviceType[device["device_type"]]}
                      </div>
                      <div className="flex-1 text-center">
                        {device["category"] || "N/A"}
                      </div>
                      <div className="flex-1 text-center">{`${device["latitude"]}° N, ${device["longitude"]}° E`}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Devices;
