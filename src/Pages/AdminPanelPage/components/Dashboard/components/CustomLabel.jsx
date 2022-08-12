import React from "react";
import { VictoryLabel, VictoryTooltip } from "victory";

function CustomLabel(props) {
  return (
    <g>
      <VictoryLabel {...this.props} />
      <VictoryTooltip
        {...this.props}
        x={200}
        y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: "black" }}
      />
    </g>
  );
}

export default CustomLabel;
