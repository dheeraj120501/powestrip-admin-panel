import React from "react";
import components from "Components";

function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <components.Loader />
    </div>
  );
}

export default LoadingPage;
