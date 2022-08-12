import React, { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import Assets from "Assets";

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCf50CAnGbGnhY4nuYin8PqQNbxysuNDgk",
  });

  const center = {
    lat: 28.6448,
    lng: 77.216721,
  };

  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    const config = {
      method: "get",
      url: "https://dev2.powerstrip.in/device/get-all",
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setMarkers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const loadMarker = (m) => {
    console.log(m);
  };

  return (
    <div className="bg-[color:var(--color-bg-primary)] neumorphism-outer mb-8 rounded-lg">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "500px",
            borderRadius: "10px",
          }}
          center={center}
          zoom={10}
          //   onLoad={onLoad}
          //   onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {markers &&
            markers.map((marker, idx) => (
              <MarkerF
                key={idx}
                icon={`data:image/svg+xml,${encodeURIComponent(
                  renderToStaticMarkup(<Assets.MapMarker />)
                )}`}
                animation={Animation.BOUNCE}
                position={{
                  lat: +marker["latitude"],
                  lng: +marker["longitude"],
                }}
                title={marker["device_name"]}
                onLoad={loadMarker}
              />
            ))}
        </GoogleMap>
      ) : (
        <>Loader</>
      )}
    </div>
  );
}

export default React.memo(MapComponent);
