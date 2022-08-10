import React from "react";
import Components from "Components";

function LoadingPage() {
  return (
    <div className="h-screen  flex items-center justify-center">
      <Components.Loader />
    </div>
  );
}

export default LoadingPage;
