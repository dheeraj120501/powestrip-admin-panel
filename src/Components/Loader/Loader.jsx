import React from "react";
import * as styles from "./Loader.styles";

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <styles.Ball1 />
      <styles.Ball2 />
      <styles.Ball3 />
    </div>
  );
}

export default Loader;
