import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  VictoryPie,
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryScatter,
  VictoryGroup,
  VictoryVoronoiContainer,
} from "victory";
import Components from "Components";

function Dashboard() {
  const deviceType = ["Public", "Private", "Dealer", "Personal"];
  const vehicleCat = { ALL: 5, TWO: 2, FOUR: 4 };
  const timeFilter = { W: 7, M: 30, "3M": 90 };
  const colorScale = ["#FFB939", "#1FA7FE", "#B6F2cF", "#F2B6B6"];

  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });
  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);
  const [currentUseData, setCurrentUseData] = useState(null);
  const [timeSlotData, setTimeSlotData] = useState(null);
  const [sectorData, setSectorData] = useState(null);
  const [wheelerType, setWheelerType] = useState(vehicleCat.ALL);
  const [timeCat, setTimeCat] = useState(timeFilter.W);
  const [categoryUsageData, setCategoryUsageData] = useState(null);
  const [sectorPercent, setSectorPercent] = useState(null);
  const [sectorPercentMax, setSectorPercentMax] = useState({
    data: 0,
    color: 0,
  });
  const [timePercent, setTimePercent] = useState(null);
  const [timePercentMax, setTimePercentMax] = useState({
    data: 0,
    color: 0,
  });

  const fetchcategoryUsageData = async () => {
    try {
      // const data = { days: timeCat, type: wheelerType };
      const jwt = window.localStorage.getItem("jwt");
      console.log(
        `https://dev2.powerstrip.in/analytics/category-wise-usage?days=${timeCat}&type=5`
      );
      const config = {
        method: "get",
        url: `https://dev2.powerstrip.in/analytics/category-wise-usage?days=${timeCat}&type=5`,
        headers: {
          "Content-type": "application/json",
          userAuthToken: jwt,
        },
      };

      const response = await axios(config);
      console.log(response.data);
      setCategoryUsageData(response.data);
      console.log([
        ...response.data["4-wheeler"]
          .filter((cat) => cat["name"] && cat["total_hours"])
          .map((cat) => {
            return { x: cat["name"], y: +cat["total_hours"] };
          }),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Effect 1");
    const jwt = window.localStorage.getItem("jwt");
    const graph1Config = {
      method: "get",
      url: "https://dev2.powerstrip.in/analytics/current-in-use",
      headers: {
        userAuthToken: jwt,
      },
    };

    axios(graph1Config)
      .then((response) => {
        console.log(response.data);
        setCurrentUseData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    const graph2Config = {
      method: "get",
      url: "https://dev2.powerstrip.in/analytics/time-slot-wise-usage",
      headers: {
        userAuthToken: jwt,
      },
    };

    axios(graph2Config)
      .then((response) => {
        console.log(response.data);
        setTimeSlotData(response.data);
        const sum = response.data.reduce((acc, slot) => +acc + +slot["cnt"], 0);
        let max = -Infinity;
        let idx = -1;
        response.data.forEach((e, i) => {
          const curr = ((+e["cnt"] * 100) / sum).toFixed(1);
          if (curr > max) {
            idx = i;
            max = curr;
          }
        });
        setTimePercentMax({ data: max, color: idx });
      })
      .catch(function (error) {
        console.log(error);
      });

    const graph3Config = {
      method: "get",
      url: "https://dev2.powerstrip.in/analytics/device-type-count",
      headers: {
        userAuthToken: jwt,
      },
    };

    axios(graph3Config)
      .then((response) => {
        console.log(response.data);
        setSectorData(response.data);
        const sum = response.data.reduce(
          (acc, sector) => +acc + +sector["device_count"],
          0
        );
        let max = -Infinity;
        let idx = -1;
        response.data.forEach((e, i) => {
          const curr = ((+e["device_count"] * 100) / sum).toFixed(1);
          if (curr > max) {
            idx = i;
            max = curr;
          }
        });
        setSectorPercentMax({ data: max, color: idx });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setCategoryUsageData(null);
    console.log("Effect 2");
    fetchcategoryUsageData();
  }, [timeCat]);

  console.log(vehicleCat);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 text-xl font-bold">Overview</div>
      <div className="flex justify-between mb-8">
        <div className="neumorphism-outer bg-[color:var(--color-bg-primary)] px-12 py-6 rounded-md flex flex-col justify-center text-center text-xl font-bold">
          <div className="mb-4">Current in use</div>
          {currentUseData && (
            <div className="flex justify-between items-center">
              <div className="relative rounded-full p-2 bg-[image:var(--gradient-pie-chart)] mr-8">
                <VictoryPie
                  cornerRadius={20}
                  innerRadius={45}
                  height={105}
                  width={105}
                  padding={0}
                  labels={({ _ }) => ""}
                  data={[
                    {
                      x: "",
                      y:
                        (+currentUseData["current"] * 100) /
                        currentUseData["total"],
                    },
                    {
                      x: "",
                      y: currentUseData["total"],
                    },
                  ]}
                  colorScale={["var(--color-secondary)", "transparent"]}
                />
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-24 h-24  flex justify-center items-center rounded-full border-8 border-[color:#2C2F33]">
                  {(
                    (+currentUseData["current"] * 100) /
                    currentUseData["total"]
                  ).toFixed(1)}
                  %
                </div>
              </div>
              <div>
                <div>
                  {currentUseData["total"]}{" "}
                  <span className="font-light">Total</span>
                </div>
                <div>
                  {currentUseData["current"]}{" "}
                  <span className="font-light">In use</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="neumorphism-outer bg-[color:var(--color-bg-primary)] px-12 py-6 rounded-md flex flex-col justify-center text-center text-xl font-bold">
          <div className="mb-4">Prime utilization time-slots</div>
          {timeSlotData && (
            <div className="flex justify-between items-center">
              <div className="relative rounded-full p-2 bg-[image:var(--gradient-pie-chart)] mr-8">
                <VictoryPie
                  cornerRadius={20}
                  innerRadius={45}
                  height={105}
                  width={105}
                  padding={0}
                  labels={({ _ }) => ""}
                  data={timeSlotData.map((slot) => ({
                    x: slot["slot"],
                    y: slot["cnt"],
                  }))}
                  colorScale={colorScale}
                />
                <div
                  style={{
                    color: timePercent
                      ? colorScale[timePercent.color]
                      : colorScale[timePercentMax.color],
                  }}
                  className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-24 h-24  flex justify-center items-center rounded-full border-8 border-[color:#2C2F33]`}
                >
                  {timePercent
                    ? `${timePercent.data}%`
                    : `${timePercentMax.data}%`}
                </div>
              </div>
              <div className="text-sm font-base">
                {timeSlotData.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center mb-3"
                    onMouseEnter={() => {
                      setTimePercent({
                        data: (
                          (+timeSlotData[idx]["cnt"] * 100) /
                          timeSlotData.reduce(
                            (acc, slot) => +acc + +slot["cnt"],
                            0
                          )
                        ).toFixed(1),
                        color: idx,
                      });
                    }}
                    onMouseLeave={() => {
                      setTimePercent(null);
                    }}
                  >
                    <div
                      style={{ background: colorScale[idx] }}
                      className={`w-4 h-4 mr-4`}
                    ></div>{" "}
                    <span className="font-light">{timeSlotData[idx].slot}</span>
                  </div>
                ))}
                {/* <div
                  className="flex items-center mb-3"
                  onMouseEnter={() => {
                    setTimePercent(
                      (
                        (+timeSlotData[0]["cnt"] * 100) /
                        timeSlotData.reduce(
                          (acc, slot) => +acc + +slot["cnt"],
                          0
                        )
                      ).toFixed(1)
                    );
                  }}
                  onMouseLeave={() => {
                    setTimePercent(null);
                  }}
                >
                  <div className="w-4 h-4 bg-[#FFB939] mr-4"></div>{" "}
                  <span className="font-light">{timeSlotData[0].slot}</span>
                </div>
                <div
                  className="flex items-center mb-3"
                  onMouseEnter={() => {
                    setTimePercent(
                      (
                        (+timeSlotData[1]["cnt"] * 100) /
                        timeSlotData.reduce(
                          (acc, slot) => +acc + +slot["cnt"],
                          0
                        )
                      ).toFixed(1)
                    );
                  }}
                  onMouseLeave={() => {
                    setTimePercent(null);
                  }}
                >
                  <div className="w-4 h-4 bg-[#1FA3F8] mr-4"></div>{" "}
                  <span className="font-light">{timeSlotData[1].slot}</span>
                </div>
                <div
                  className="flex items-center mb-3"
                  onMouseEnter={() => {
                    setTimePercent(
                      (
                        (+timeSlotData[2]["cnt"] * 100) /
                        timeSlotData.reduce(
                          (acc, slot) => +acc + +slot["cnt"],
                          0
                        )
                      ).toFixed(1)
                    );
                  }}
                  onMouseLeave={() => {
                    setTimePercent(null);
                  }}
                >
                  <div className="w-4 h-4 bg-[#AAF9CB] mr-4"></div>{" "}
                  <span className="font-light">{timeSlotData[2].slot}</span>
                </div> */}
              </div>
            </div>
          )}
        </div>
        <div className="neumorphism-outer bg-[color:var(--color-bg-primary)] px-12 py-6 rounded-md flex flex-col justify-center text-center text-xl font-bold">
          <div className="mb-4">Sector wise devices</div>
          {sectorData && (
            <div className="flex justify-between items-center">
              <div className="relative rounded-full p-2 bg-[image:var(--gradient-pie-chart)] mr-8">
                <VictoryPie
                  cornerRadius={20}
                  innerRadius={45}
                  height={105}
                  width={105}
                  padding={0}
                  labels={({ _ }) => ""}
                  data={sectorData
                    .filter((sector) => sector["device_type"] !== null)
                    .map((sector) => ({
                      x: deviceType[sector["device_type"]],
                      y: sector["device_count"],
                    }))}
                  colorScale={colorScale}
                />
                <div
                  style={{
                    color: sectorPercent
                      ? colorScale[sectorPercent.color]
                      : colorScale[sectorPercentMax.color],
                  }}
                  className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-24 h-24  flex justify-center items-center rounded-full border-8 border-[color:#2C2F33]`}
                >
                  {sectorPercent
                    ? `${sectorPercent.data}%`
                    : `${sectorPercentMax.data}%`}
                </div>
              </div>
              <div className="text-sm font-base">
                {sectorData
                  .filter((sector) => sector["device_type"] !== null)
                  .map((sec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center mb-3"
                      onMouseEnter={() => {
                        setSectorPercent({
                          data: (
                            (+sectorData[idx]["device_count"] * 100) /
                            sectorData.reduce(
                              (acc, sector) => +acc + +sector["device_count"],
                              0
                            )
                          ).toFixed(1),
                          color: idx,
                        });
                      }}
                      onMouseLeave={() => {
                        setSectorPercent(null);
                      }}
                    >
                      <div
                        style={{ background: colorScale[idx] }}
                        className={`w-4 h-4 mr-4`}
                      ></div>
                      <span className="font-light">
                        {deviceType[sec["device_type"]]}
                      </span>
                    </div>
                  ))}
                {/* <div
                  className="flex items-center mb-3"
                  onMouseEnter={() => {
                    setSectorPercent({
                      data: (
                        (+sectorData[0]["device_count"] * 100) /
                        sectorData.reduce(
                          (acc, sector) => +acc + +sector["device_count"],
                          0
                        )
                      ).toFixed(1),
                      color: 0,
                    });
                  }}
                  onMouseLeave={() => {
                    setSectorPercent(null);
                  }}
                >
                  <div className="w-4 h-4 bg-[#FFB939] mr-4"></div>
                  <span className="font-light">Public</span>
                </div>
                <div
                  className="flex items-center mb-3"
                  onMouseEnter={() => {
                    setSectorPercent({
                      data: (
                        (+sectorData[1]["device_count"] * 100) /
                        sectorData.reduce(
                          (acc, sector) => +acc + +sector["device_count"],
                          0
                        )
                      ).toFixed(1),
                      color: 1,
                    });
                  }}
                  onMouseLeave={() => {
                    setSectorPercent(null);
                  }}
                >
                  <div className="w-4 h-4 bg-[#1FA3F8] mr-4"></div>
                  <span className="font-light">Private</span>
                </div>
                <div
                  className="flex items-center mb-3"
                  onMouseEnter={() => {
                    setSectorPercent({
                      data: (
                        (+sectorData[2]["device_count"] * 100) /
                        sectorData.reduce(
                          (acc, sector) => +acc + +sector["device_count"],
                          0
                        )
                      ).toFixed(1),
                      color: 2,
                    });
                  }}
                  onMouseLeave={() => {
                    setSectorPercent(null);
                  }}
                >
                  <div className="w-4 h-4 bg-[#B6F2CF] mr-4"></div>
                  <span className="font-light">Dealer</span>
                </div>
                <div
                  className="flex items-center mb-3"
                  onMouseEnter={() => {
                    setSectorPercent({
                      data: (
                        (+sectorData[3]["device_count"] * 100) /
                        sectorData.reduce(
                          (acc, sector) => +acc + +sector["device_count"],
                          0
                        )
                      ).toFixed(1),
                      color: 3,
                    });
                  }}
                  onMouseLeave={() => {
                    setSectorPercent(null);
                  }}
                >
                  <div className="w-4 h-4 bg-[#f2b6b6] mr-4"></div>
                  <span className="font-light">Personal</span>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[color:var(--color-bg-primary)] neumorphism-outer p-6 mb-8 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex font-bold text-sm items-center">
            <span className="text-xl mr-6">Public hourly utilization</span>
            <div className="flex rounded-md neumorphism-inner">
              <div
                className={`py-2 px-4 rounded-lg cursor-pointer ${
                  wheelerType === vehicleCat.ALL
                    ? "neumorphism-outer bg-[color:var(--color-bg-primary)]"
                    : 0
                }`}
                onClick={() => setWheelerType(vehicleCat.ALL)}
              >
                All
              </div>
              <div
                className={`py-2 px-4 rounded-lg cursor-pointer text-[#009CFF]  ${
                  wheelerType === vehicleCat.FOUR
                    ? "neumorphism-outer bg-[color:var(--color-bg-primary)]"
                    : 0
                }`}
                onClick={() => setWheelerType(vehicleCat.FOUR)}
              >
                4 wheeler
              </div>
              <div
                className={`py-2 px-4 rounded-lg cursor-pointer text-[#AAF9CB] ${
                  wheelerType === vehicleCat.TWO
                    ? "neumorphism-outer bg-[color:var(--color-bg-primary)]"
                    : 0
                }`}
                onClick={() => setWheelerType(vehicleCat.TWO)}
              >
                2 wheeler
              </div>
            </div>
          </div>
          <div className="flex rounded-md neumorphism-inner text-sm">
            <div
              className={`py-2 px-4 rounded-lg cursor-pointer ${
                timeCat === timeFilter.W
                  ? "neumorphism-outer bg-[color:var(--color-bg-primary)]"
                  : 0
              }`}
              onClick={() => {
                setTimeCat(timeFilter.W);
              }}
            >
              W
            </div>
            <div
              className={`py-2 px-4 rounded-lg cursor-pointer ${
                timeCat === timeFilter.M
                  ? "neumorphism-outer bg-[color:var(--color-bg-primary)]"
                  : 0
              }`}
              onClick={() => {
                setTimeCat(timeFilter.M);
              }}
            >
              M
            </div>
            <div
              className={`py-2 px-4 rounded-lg cursor-pointer ${
                timeCat === timeFilter["3M"]
                  ? "neumorphism-outer bg-[color:var(--color-bg-primary)]"
                  : 0
              }`}
              onClick={() => {
                setTimeCat(timeFilter["3M"]);
              }}
            >
              3M
            </div>
          </div>
        </div>
        {categoryUsageData && (
          <div>
            <div className="flex justify-center items-center h-[500px]">
              <div style={{ width: "100%", height: "100%" }} ref={graphRef}>
                {categoryUsageData === null ? (
                  <Components.Loader />
                ) : wheelerType === 5 &&
                  [
                    ...categoryUsageData["2-wheeler"]
                      .filter((cat) => cat["name"] && cat["total_hours"])
                      .map((cat) => {
                        return { x: cat["name"], y: +cat["total_hours"] };
                      }),
                  ].length === 0 &&
                  [
                    ...categoryUsageData["4-wheeler"]
                      .filter((cat) => cat["name"] && cat["total_hours"])
                      .map((cat) => {
                        return { x: cat["name"], y: +cat["total_hours"] };
                      }),
                  ].length === 0 ? (
                  <div className="flex justify-center items-center h-[500px]">
                    No data for any vehicle for last {timeCat} days
                  </div>
                ) : wheelerType === 2 &&
                  [
                    ...categoryUsageData["2-wheeler"]
                      .filter((cat) => cat["name"] && cat["total_hours"])
                      .map((cat) => {
                        return { x: cat["name"], y: +cat["total_hours"] };
                      }),
                  ].length === 0 ? (
                  <div className="flex justify-center items-center h-[500px]">
                    No data for 2 wheelers for last {timeCat} days
                  </div>
                ) : wheelerType === 4 &&
                  [
                    ...categoryUsageData["4-wheeler"]
                      .filter((cat) => cat["name"] && cat["total_hours"])
                      .map((cat) => {
                        return { x: cat["name"], y: +cat["total_hours"] };
                      }),
                  ].length === 0 ? (
                  <div className="flex justify-center items-center h-[500px]">
                    No data for 4 wheelers for last {timeCat} days
                  </div>
                ) : (
                  <VictoryChart
                    padding={50}
                    height={500}
                    width={boundingRect.width}
                    minDomain={{ y: 0 }}
                    containerComponent={<VictoryVoronoiContainer />}
                  >
                    <VictoryAxis
                      dependentAxis
                      style={{
                        axis: { stroke: "none" },
                        grid: { stroke: "#4D96BE", strokeWidth: "1" },
                        ticks: { stroke: "none", size: 5 },
                        tickLabels: {
                          fontSize: 14,
                          padding: 5,
                          fill: "white",
                        },
                      }}
                      crossAxis={false}
                    />
                    <VictoryAxis
                      style={{
                        axis: { stroke: "none" },
                        grid: { stroke: "none" },
                        ticks: { stroke: "none", size: 5 },
                        tickLabels: {
                          fontSize: 14,
                          padding: 5,
                          fill: "white",
                        },
                      }}
                    />
                    {(wheelerType === 5 || wheelerType === 4) && (
                      <VictoryGroup>
                        <VictoryLine
                          standalone={false}
                          style={{
                            data: { stroke: "#009CFF", strokeWidth: "2" },
                          }}
                          data={[
                            ...categoryUsageData["4-wheeler"]
                              .filter(
                                (cat) => cat["name"] && cat["total_hours"]
                              )
                              .map((cat) => {
                                return {
                                  x: cat["name"],
                                  y: +cat["total_hours"],
                                };
                              }),
                          ]}
                        />
                        <VictoryScatter
                          standalone={false}
                          style={{
                            data: { fill: "#009CFF" },
                            labels: { fill: "#009CFF" },
                          }}
                          size={({ active }) => (active ? 8 : 5)}
                          labels={({ datum }) => datum.y}
                          labelComponent={<VictoryTooltip />}
                          data={[
                            ...categoryUsageData["4-wheeler"]
                              .filter(
                                (cat) => cat["name"] && cat["total_hours"]
                              )
                              .map((cat) => {
                                return {
                                  x: cat["name"],
                                  y: +cat["total_hours"],
                                };
                              }),
                          ]}
                        />
                      </VictoryGroup>
                    )}
                    {(wheelerType === 5 || wheelerType === 2) && (
                      <VictoryGroup>
                        <VictoryLine
                          standalone={false}
                          style={{
                            data: { stroke: "#9FD4B5", strokeWidth: "2" },
                          }}
                          data={[
                            ...categoryUsageData["2-wheeler"]
                              .filter(
                                (cat) => cat["name"] && cat["total_hours"]
                              )
                              .map((cat) => {
                                return {
                                  x: cat["name"],
                                  y: +cat["total_hours"],
                                };
                              }),
                          ]}
                        />
                        <VictoryScatter
                          standalone={false}
                          style={{
                            data: { fill: "#9FD4B5" },
                            labels: { fill: "#9FD4B5" },
                          }}
                          size={({ active }) => (active ? 8 : 5)}
                          labels={({ datum }) => datum.y}
                          labelComponent={<VictoryTooltip />}
                          data={[
                            ...categoryUsageData["2-wheeler"]
                              .filter(
                                (cat) => cat["name"] && cat["total_hours"]
                              )
                              .map((cat) => {
                                return {
                                  x: cat["name"],
                                  y: +cat["total_hours"],
                                };
                              }),
                          ]}
                        />
                      </VictoryGroup>
                    )}
                  </VictoryChart>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
